require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const MySQLStore = require('express-mysql-session')(session);
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3001;

// JWT密钥
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // 添加cookie解析中间件

// CORS configuration
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Database connections
// MongoDB connection for user data
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  firstName: String,
  lastName: String,
  phone: String,
  avatar: String,
  bio: String
});

const User = mongoose.model('User', userSchema);

// MySQL session store configuration
const mysqlOptions = {
  host: process.env.DB_HOST || 'localhost',
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

const sessionStore = new MySQLStore(mysqlOptions);

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback_secret',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: { 
    secure: false, // Set to true in production with HTTPS
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// JWT utility functions
const generateToken = (user) => {
  return jwt.sign(
    { 
      userId: user._id, 
      username: user.username 
    }, 
    JWT_SECRET, 
    { expiresIn: '24h' }
  );
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

// Routes

// User registration
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, password, email, firstName, lastName, phone } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: '用户名已存在' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const newUser = new User({ 
      username, 
      password: hashedPassword, 
      email,
      firstName: firstName || '',
      lastName: lastName || '',
      phone: phone || ''
    });
    
    const savedUser = await newUser.save();
    
    // Generate JWT token
    const token = generateToken(savedUser);
    
    // Set token in cookie
    res.cookie('token', token, { 
      httpOnly: true, 
      secure: false, // Set to true in production with HTTPS
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });
    
    res.json({ 
      success: true, 
      userId: savedUser._id, 
      username: savedUser.username,
      message: '用户创建成功' 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: '服务器内部错误' });
  }
});

// User login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ success: false, message: '用户名或密码错误' });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: '用户名或密码错误' });
    }
    
    // Generate JWT token
    const token = generateToken(user);
    
    // Set token in cookie
    res.cookie('token', token, { 
      httpOnly: true, 
      secure: false, // Set to true in production with HTTPS
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });
    
    // Also create session for backward compatibility
    req.session.userId = user._id;
    req.session.username = user.username;
    
    res.json({ 
      success: true, 
      userId: user._id, 
      username: user.username,
      message: '登录成功' 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: '服务器内部错误' });
  }
});

// User logout
app.post('/api/auth/logout', (req, res) => {
  // Clear session
  req.session.destroy((err) => {
    if (err) {
      console.error('Session destruction error:', err);
    }
  });
  
  // Clear JWT token cookie
  res.clearCookie('token');
  
  res.json({ success: true, message: '登出成功' });
});

// Check authentication status
app.get('/api/auth/status', (req, res) => {
  // First check for JWT token
  const token = req.cookies.token;
  if (token) {
    const decoded = verifyToken(token);
    if (decoded) {
      return res.json({ 
        authenticated: true, 
        userId: decoded.userId, 
        username: decoded.username 
      });
    }
  }
  
  // Fallback to session
  if (req.session && req.session.userId) {
    return res.json({ 
      authenticated: true, 
      userId: req.session.userId, 
      username: req.session.username 
    });
  }
  
  res.json({ authenticated: false });
});

// Validate token
app.get('/api/auth/validate', (req, res) => {
  // Check for JWT token
  const token = req.cookies.token;
  if (token) {
    const decoded = verifyToken(token);
    if (decoded) {
      return res.json({ 
        valid: true, 
        userId: decoded.userId, 
        username: decoded.username 
      });
    }
  }
  
  // Fallback to session
  if (req.session && req.session.userId) {
    return res.json({ 
      valid: true, 
      userId: req.session.userId, 
      username: req.session.username 
    });
  }
  
  res.status(401).json({ valid: false, error: '无效的认证令牌' });
});

// Get user info by ID
app.get('/api/user/:id', async (req, res) => {
  try {
    // First check for JWT token
    const token = req.cookies.token;
    let userIdFromToken = null;
    
    if (token) {
      const decoded = verifyToken(token);
      if (decoded) {
        userIdFromToken = decoded.userId;
      }
    }
    
    // Fallback to session
    if (!userIdFromToken && req.session && req.session.userId) {
      userIdFromToken = req.session.userId;
    }
    
    // Check if user is requesting their own data
    if (userIdFromToken !== req.params.id) {
      return res.status(403).json({ error: '无权访问此用户数据' });
    }
    
    // Find user
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: '用户不存在' });
    }
    
    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      avatar: user.avatar,
      bio: user.bio,
      createdAt: user.createdAt
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

// Update user profile
app.put('/api/user/:id', async (req, res) => {
  try {
    // First check for JWT token
    const token = req.cookies.token;
    let userIdFromToken = null;
    
    if (token) {
      const decoded = verifyToken(token);
      if (decoded) {
        userIdFromToken = decoded.userId;
      }
    }
    
    // Fallback to session
    if (!userIdFromToken && req.session && req.session.userId) {
      userIdFromToken = req.session.userId;
    }
    
    // Check if user is updating their own data
    if (userIdFromToken !== req.params.id) {
      return res.status(403).json({ error: '无权更新此用户数据' });
    }
    
    // Update user
    const { firstName, lastName, email, phone, avatar, bio } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email, phone, avatar, bio },
      { new: true, select: '-password' }
    );
    
    if (!updatedUser) {
      return res.status(404).json({ error: '用户不存在' });
    }
    
    res.json(updatedUser);
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

// Change password
app.put('/api/user/:id/password', async (req, res) => {
  try {
    // First check for JWT token
    const token = req.cookies.token;
    let userIdFromToken = null;
    
    if (token) {
      const decoded = verifyToken(token);
      if (decoded) {
        userIdFromToken = decoded.userId;
      }
    }
    
    // Fallback to session
    if (!userIdFromToken && req.session && req.session.userId) {
      userIdFromToken = req.session.userId;
    }
    
    // Check if user is updating their own data
    if (userIdFromToken !== req.params.id) {
      return res.status(403).json({ error: '无权更新此用户密码' });
    }
    
    const { currentPassword, newPassword } = req.body;
    
    // Find user
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: '用户不存在' });
    }
    
    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: '当前密码错误' });
    }
    
    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update password
    await User.findByIdAndUpdate(req.params.id, { password: hashedPassword });
    
    res.json({ message: '密码更新成功' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

// Get all users (admin only)
app.get('/api/users', async (req, res) => {
  try {
    // In a real application, you would check if the user is an admin
    // For this demo, we'll allow anyone to access the user list
    const users = await User.find().select('-password'); // Exclude passwords
    res.json(users);
  } catch (error) {
    console.error('获取用户列表失败:', error);
    res.status(500).json({ error: '获取用户列表失败' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`SSO Server running on port ${PORT}`);
});
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// Session dependencies removed for JWT-only authentication
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3001;

// JWT密钥
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Refresh token storage
const refreshTokens = new Set();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // 添加cookie解析中间件

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000',  // System A
  'http://localhost:3002',  // 登录系统
  'http://localhost:3003'   // System B
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
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

// Session configuration removed for JWT-only authentication

// JWT utility functions
const generateToken = (user) => {
  return jwt.sign(
    { 
      userId: user._id, 
      username: user.username 
    }, 
    JWT_SECRET, 
    { expiresIn: '2h' } // 2 hours
  );
};

const generateAccessToken = (user) => {
  return jwt.sign(
    { 
      userId: user._id, 
      username: user.username 
    }, 
    JWT_SECRET, 
    { expiresIn: '2h' } // 2 hours
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { 
      userId: user._id, 
      username: user.username,
      type: 'refresh'
    }, 
    JWT_SECRET, 
    { expiresIn: '2h' } // 2 hours
  );
};

// Regenerate refresh token with extended expiration
class RefreshTokenManager {
  static regenerateRefreshToken(user) {
    return jwt.sign(
      { 
        userId: user._id, 
        username: user.username,
        type: 'refresh',
        iat: Math.floor(Date.now() / 1000) // issued at time
      }, 
      JWT_SECRET, 
      { expiresIn: '2h' } // 2 hours from now
    );
  }
}

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

// Middleware to refresh token on each API request
const refreshTokenOnRequest = (req, res, next) => {
  const token = req.cookies.token;
  
  if (token) {
    const decoded = verifyToken(token);
    if (decoded) {
      // Generate a new token with updated expiration time
      const user = { _id: decoded.userId, username: decoded.username };
      const newToken = generateAccessToken(user);
      
      // Update the token in the cookie
      res.cookie('token', newToken, { 
        httpOnly: true, 
        secure: false, // Set to true in production with HTTPS
        sameSite: 'strict', // Prevent CSRF attacks
        maxAge: 2 * 60 * 60 * 1000 // 2 hours
      });
    }
  }
  
  next();
};

// Apply the middleware to all API routes
app.use('/api/*', refreshTokenOnRequest);

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
    
    // Set token in cookie with enhanced security
    res.cookie('token', token, { 
      httpOnly: true, 
      secure: false, // Set to true in production with HTTPS
      sameSite: 'strict', // Prevent CSRF attacks
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
    
    // Generate access and refresh tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = RefreshTokenManager.regenerateRefreshToken(user);
    
    // Store refresh token
    refreshTokens.add(refreshToken);
    
    // Set tokens in cookies with enhanced security
    res.cookie('token', accessToken, { 
      httpOnly: true, 
      secure: false, // Set to true in production with HTTPS
      sameSite: 'strict', // Prevent CSRF attacks
      maxAge: 5 * 60 * 1000 // 5 minutes
    });
    
    res.cookie('refreshToken', refreshToken, { 
      httpOnly: true, 
      secure: false, // Set to true in production with HTTPS
      sameSite: 'strict', // Prevent CSRF attacks
      maxAge: 2 * 60 * 60 * 1000 // 2 hours
    });
    
    // Removed session creation for JWT-only authentication
    
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

// Token refresh endpoint
app.post('/api/auth/refresh', (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  
  if (!refreshToken) {
    return res.status(401).json({ success: false, message: '缺少刷新令牌' });
  }
  
  // Check if refresh token exists in our store
  if (!refreshTokens.has(refreshToken)) {
    return res.status(401).json({ success: false, message: '无效的刷新令牌' });
  }
  
  // Verify refresh token
  const decoded = verifyToken(refreshToken);
  
  if (!decoded || decoded.type !== 'refresh') {
    refreshTokens.delete(refreshToken);
    return res.status(401).json({ success: false, message: '无效的刷新令牌' });
  }
  
  // Create new access token
  const user = { _id: decoded.userId, username: decoded.username };
  const newAccessToken = generateAccessToken(user);
  
  // Generate new refresh token (sliding window)
  const newRefreshToken = RefreshTokenManager.regenerateRefreshToken(user);
  
  // Remove old refresh token and add new one
  refreshTokens.delete(refreshToken);
  refreshTokens.add(newRefreshToken);
  
  // Set new tokens in cookies
  res.cookie('token', newAccessToken, { 
    httpOnly: true, 
    secure: false, // Set to true in production with HTTPS
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 5 * 60 * 1000 // 5 minutes
  });
  
  res.cookie('refreshToken', newRefreshToken, { 
    httpOnly: true, 
    secure: false, // Set to true in production with HTTPS
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 2 * 60 * 60 * 1000 // 2 hours
  });
  
  res.json({ success: true, message: '令牌刷新成功' });
});

// User logout
app.post('/api/auth/logout', (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  
  // Remove refresh token from our store
  if (refreshToken) {
    refreshTokens.delete(refreshToken);
  }
  
  // Clear JWT token cookies
  res.clearCookie('token');
  res.clearCookie('refreshToken');
  
  res.json({ success: true, message: '登出成功' });
});

// Check authentication status
app.get('/api/auth/status', (req, res) => {
  // Check for JWT token
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
  
  res.status(401).json({ valid: false, error: '无效的认证令牌' });
});

// Get user info by ID
app.get('/api/user/:id', async (req, res) => {
  try {
    // Check for JWT token
    const token = req.cookies.token;
    let userIdFromToken = null;
    
    if (token) {
      const decoded = verifyToken(token);
      if (decoded) {
        userIdFromToken = decoded.userId;
      }
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
    // Check for JWT token
    const token = req.cookies.token;
    let userIdFromToken = null;
    
    if (token) {
      const decoded = verifyToken(token);
      if (decoded) {
        userIdFromToken = decoded.userId;
        
        // Generate a new token with updated expiration time
        const user = { _id: decoded.userId, username: decoded.username };
        const newToken = generateAccessToken(user);
        
        // Update the token in the cookie
        res.cookie('token', newToken, { 
          httpOnly: true, 
          secure: false, // Set to true in production with HTTPS
          sameSite: 'strict', // Prevent CSRF attacks
          maxAge: 2 * 60 * 60 * 1000 // 2 hours
        });
      }
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
    // Check for JWT token
    const token = req.cookies.token;
    let userIdFromToken = null;
    
    if (token) {
      const decoded = verifyToken(token);
      if (decoded) {
        userIdFromToken = decoded.userId;
      }
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

// No need for periodic cleanup with refresh tokens

// Start server
app.listen(PORT, () => {
  console.log(`SSO Server running on port ${PORT}`);
});
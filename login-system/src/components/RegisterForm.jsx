import React, { useState } from 'react';

const RegisterForm = ({ onRegister, onSwitchToLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    captcha: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [captchaImage, setCaptchaImage] = useState('');

  // Generate a new CAPTCHA
  const generateCaptcha = () => {
    // In a real application, this would call an API to generate a CAPTCHA
    // For now, we'll simulate it with a simple approach
    const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let captcha = '';
    for (let i = 0; i < 4; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaImage(captcha);
    return captcha;
  };

  // Initialize CAPTCHA on component mount
  useState(() => {
    generateCaptcha();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    // Validation
    if (!credentials.username || !credentials.password || !credentials.email || !credentials.captcha) {
      setMessage('请填写所有必填字段');
      setLoading(false);
      return;
    }
    
    if (credentials.password !== credentials.confirmPassword) {
      setMessage('密码和确认密码不匹配');
      setLoading(false);
      return;
    }
    
    if (credentials.captcha.toLowerCase() !== captchaImage.toLowerCase()) {
      setMessage('验证码不正确');
      generateCaptcha(); // Generate new CAPTCHA
      setLoading(false);
      return;
    }
    
    // Prepare registration data (excluding confirmPassword and captcha)
    const registrationData = {
      username: credentials.username,
      password: credentials.password,
      email: credentials.email
    };
    
    const result = await onRegister(registrationData);
    
    if (result.success) {
      setMessage('注册成功！正在跳转到System A...');
      // Auto-login and redirect to System A after successful registration
      setTimeout(() => {
        // Attempt to auto-login with the registered credentials
        // In a real application, you might want to directly authenticate the user
        // For now, we'll redirect to System A
        window.location.href = 'http://localhost:3000';
      }, 2000);
    } else {
      setMessage(result.message || '注册失败');
      generateCaptcha(); // Generate new CAPTCHA on failure
    }
    
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {message && (
        <div className={`message ${message.includes('成功') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}
      
      <div className="form-group">
        <label htmlFor="username">用户名 *</label>
        <input
          type="text"
          id="username"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          placeholder="请输入用户名"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="email">邮箱 *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          placeholder="请输入邮箱"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="password">密码 *</label>
        <input
          type="password"
          id="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="请输入密码"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="confirmPassword">确认密码 *</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={credentials.confirmPassword}
          onChange={handleChange}
          placeholder="请再次输入密码"
          required
        />
      </div>
      
      <div className="form-group captcha-group">
        <label htmlFor="captcha">验证码 *</label>
        <div className="captcha-container">
          <input
            type="text"
            id="captcha"
            name="captcha"
            value={credentials.captcha}
            onChange={handleChange}
            placeholder="请输入验证码"
            required
            className="captcha-input"
          />
          <div className="captcha-display" onClick={generateCaptcha}>
            {captchaImage}
          </div>
          <button type="button" onClick={generateCaptcha} className="captcha-refresh">
            刷新
          </button>
        </div>
      </div>
      
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? '注册中...' : '注册'}
      </button>
      
      <div className="form-footer">
        <p>已有账户？<button type="button" onClick={onSwitchToLogin} className="link-button">立即登录</button></p>
      </div>
    </form>
  );
};

export default RegisterForm;
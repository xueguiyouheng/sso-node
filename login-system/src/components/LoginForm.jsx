import React, { useState } from 'react';

const LoginForm = ({ onLogin, onSwitchToRegister }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

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
    
    if (!credentials.username || !credentials.password) {
      setMessage('请输入用户名和密码');
      setLoading(false);
      return;
    }
    
    const result = await onLogin(credentials);
    
    if (!result.success) {
      setMessage(result.message || '登录失败');
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
        <label htmlFor="username">用户名</label>
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
        <label htmlFor="password">密码</label>
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
      
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? '登录中...' : '登录'}
      </button>
      
      <div className="form-footer">
        <p>还没有账户？<button type="button" onClick={onSwitchToRegister} className="link-button">立即注册</button></p>
      </div>
    </form>
  );
};

export default LoginForm;
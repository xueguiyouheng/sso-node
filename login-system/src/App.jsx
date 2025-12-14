import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import AuthService from './services/authService';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'

  useEffect(() => {
    // Check authentication status on app load
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await AuthService.checkAuthStatus();
      if (response.authenticated) {
        setAuthenticated(true);
        setUser({
          id: response.userId,
          username: response.username
        });
        
        // If already authenticated, redirect to the return URL if provided
        const urlParams = new URLSearchParams(window.location.search);
        const returnUrl = urlParams.get('returnUrl');
        if (returnUrl) {
          window.location.href = returnUrl;
        }
      }
    } catch (error) {
      console.error('认证检查失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (credentials) => {
    try {
      const response = await AuthService.login(credentials);
      if (response.success) {
        setAuthenticated(true);
        setUser({
          id: response.userId,
          username: response.username
        });
        
        // Redirect to return URL if provided, otherwise to default page
        const urlParams = new URLSearchParams(window.location.search);
        const returnUrl = urlParams.get('returnUrl') || 'http://localhost:3000';
        window.location.href = returnUrl;
        
        return { success: true };
      } else {
        return { success: false, message: response.message || '登录失败' };
      }
    } catch (error) {
      console.error('登录错误:', error);
      return { success: false, message: '登录失败，请重试。' };
    }
  };

  const handleRegister = async (registrationData) => {
    try {
      const response = await AuthService.register(registrationData);
      if (response.success) {
        return { success: true, message: '注册成功！' };
      } else {
        return { success: false, message: response.message || '注册失败' };
      }
    } catch (error) {
      console.error('注册错误:', error);
      return { success: false, message: '注册失败，请重试。' };
    }
  };

  const switchToLogin = () => {
    setActiveTab('login');
  };

  const switchToRegister = () => {
    setActiveTab('register');
  };

  if (loading) {
    return <div className="login-container">加载中...</div>;
  }

  return (
    <div className="login-container">
      <div className="login-form">
        {authenticated ? (
          <div>
            <h2>SSO 登录</h2>
            <p>您已作为 {user?.username} 登录。</p>
            <p>重定向中...</p>
          </div>
        ) : (
          <>
            <h2>SSO 登录系统</h2>
            <div className="tab-container">
              <button 
                className={`tab ${activeTab === 'login' ? 'active' : ''}`} 
                onClick={switchToLogin}
              >
                登录
              </button>
              <button 
                className={`tab ${activeTab === 'register' ? 'active' : ''}`} 
                onClick={switchToRegister}
              >
                注册
              </button>
            </div>
            
            {activeTab === 'login' ? (
              <LoginForm onLogin={handleLogin} />
            ) : (
              <RegisterForm onRegister={handleRegister} onSwitchToLogin={switchToLogin} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
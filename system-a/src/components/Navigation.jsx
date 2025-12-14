import React from 'react';
import './Navigation.css';

const Navigation = ({ 
  authenticated, 
  user, 
  currentPage, 
  onNavigateToProfile, 
  onNavigateToHome, 
  onNavigateToHooks,
  onNavigateToPatterns,
  onNavigateToJavascript,
  onLogout,
  onLogin
}) => {
  const handleLogout = async () => {
    try {
      // 这里应该调用实际的登出逻辑
      if (onLogout) {
        onLogout();
      }
    } catch (error) {
      console.error('登出失败:', error);
    }
  };

  const handleLogin = () => {
    if (onLogin && typeof onLogin === 'function') {
      onLogin();
    } else {
      // Fallback: redirect to SSO login page with return URL
      const returnUrl = encodeURIComponent(window.location.origin);
      window.location.href = `http://localhost:3002?returnUrl=${returnUrl}`;
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>System A</h2>
      </div>
      
      <div className="navbar-nav">
        {authenticated && (
          <>
            <button 
              className={`nav-link ${currentPage === 'home' ? 'active' : ''}`} 
              onClick={onNavigateToHome}
            >
              首页
            </button>
            <button 
              className={`nav-link ${currentPage === 'hooks' ? 'active' : ''}`} 
              onClick={onNavigateToHooks}
            >
              React Hooks
            </button>
            <button 
              className={`nav-link ${currentPage === 'patterns' ? 'active' : ''}`} 
              onClick={onNavigateToPatterns}
            >
              设计模式
            </button>
            <button 
              className={`nav-link ${currentPage === 'javascript' ? 'active' : ''}`} 
              onClick={onNavigateToJavascript}
            >
              JavaScript
            </button>
          </>
        )}
        {(currentPage === 'profile' || currentPage === 'hooks' || currentPage === 'patterns' || currentPage === 'javascript' || currentPage === 'array' || currentPage === 'object') && (
          <button 
            className="nav-link" 
            onClick={onNavigateToHome}
          >
            返回首页
          </button>
        )}
      </div>
      
      <div className="navbar-user">
        {authenticated ? (
          <div className="user-info">
            <span className="username" onClick={onNavigateToProfile} style={{ cursor: 'pointer' }}>
              欢迎, {user?.username}!
            </span>
            <button className="btn btn-danger" onClick={handleLogout}>
              登出
            </button>
          </div>
        ) : (
          <button className="btn" onClick={handleLogin}>
            登录
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
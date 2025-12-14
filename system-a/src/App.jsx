import React, { useState, useEffect } from 'react';
import AuthService from './services/authService';
import ProtectedPage from './components/ProtectedPage';
import PublicPage from './components/PublicPage';
import ProfilePage from './components/Profile/ProfilePage';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'profile'

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
      }
    } catch (error) {
      console.error('认证检查失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      setAuthenticated(false);
      setUser(null);
      // Redirect to login page
      window.location.href = 'http://localhost:3002';
    } catch (error) {
      console.error('登出失败:', error);
    }
  };

  const handleLogin = () => {
    // Redirect to login page with return URL
    const returnUrl = encodeURIComponent(window.location.href);
    window.location.href = `http://localhost:3002?returnUrl=${returnUrl}`;
  };

  const navigateToProfile = () => {
    setCurrentPage('profile');
  };

  const navigateToHome = () => {
    setCurrentPage('home');
  };

  if (loading) {
    return <div className="container">加载中...</div>;
  }

  return (
    <div className="container">
      <header className="header">
        <div>
          <h1>System A</h1>
          {currentPage === 'profile' && (
            <button className="btn" onClick={navigateToHome} style={{ marginLeft: '10px' }}>
              返回主页
            </button>
          )}
        </div>
        <div>
          {authenticated ? (
            <div>
              <span>欢迎, {user?.username}!</span>
              {currentPage === 'home' && (
                <button className="btn" onClick={navigateToProfile} style={{ marginLeft: '10px' }}>
                  个人资料
                </button>
              )}
              <button className="btn btn-danger" onClick={handleLogout} style={{ marginLeft: '10px' }}>
                登出
              </button>
            </div>
          ) : (
            <button className="btn" onClick={handleLogin}>
              登录
            </button>
          )}
        </div>
      </header>

      <div className="content">
        {authenticated ? (
          currentPage === 'home' ? (
            <ProtectedPage user={user} />
          ) : (
            <ProfilePage />
          )
        ) : (
          <PublicPage onLogin={handleLogin} />
        )}
      </div>
    </div>
  );
}

export default App;
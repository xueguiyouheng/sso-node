import React, { useState, useEffect } from 'react';
import AuthService from '../../services/authService';
import Navigation from '../Navigation';
import './ProfilePage.css';

const ProfilePage = ({ 
  currentPage, 
  onNavigateToProfile, 
  onNavigateToHome, 
  onNavigateToHooks, 
  onNavigateToPatterns,
  onNavigateToJavascript,
  onLogout 
}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const authStatus = await AuthService.checkAuthStatus();
      if (!authStatus.authenticated) {
        window.location.href = 'http://localhost:3002';
        return;
      }

      const response = await AuthService.getUserInfo(authStatus.userId);
      setUser(response);
    } catch (error) {
      console.error('获取用户资料失败:', error);
      showMessage('获取用户资料失败', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      if (onLogout) {
        onLogout();
      }
      window.location.href = 'http://localhost:3002';
    } catch (error) {
      console.error('登出失败:', error);
    }
  };

  if (loading) {
    return <div className="page-container"><div className="loading">加载中...</div></div>;
  }

  return (
    <div className="page-container">
      <Navigation 
        authenticated={!!user}
        user={user}
        currentPage={currentPage}
        onNavigateToProfile={onNavigateToProfile}
        onNavigateToHome={onNavigateToHome}
        onNavigateToHooks={onNavigateToHooks}
        onNavigateToPatterns={onNavigateToPatterns}
        onNavigateToJavascript={onNavigateToJavascript}
        onLogout={handleLogout}
      />

      <div className="content-wrapper">
        <div className="profile-container">
          {message && (
            <div className={`message ${messageType}`}>
              {message}
            </div>
          )}

          <div className="profile-section">
            <h2>用户资料</h2>
            <div className="profile-info">
              <p><strong>用户名:</strong> {user?.username}</p>
              <p><strong>注册时间:</strong> {user?.createdAt ? new Date(user.createdAt).toLocaleString() : ''}</p>
            </div>
            
            <div className="profile-actions">
              <button className="btn" onClick={onNavigateToHome}>
                返回首页
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
import React, { useState, useEffect } from 'react';
import AuthService from '../../services/authService';
import ProfileForm from './ProfileForm';

const ProfilePage = () => {
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

  const handleProfileUpdate = async (profileData) => {
    try {
      const response = await AuthService.updateUserProfile(user.id, profileData);
      setUser(response);
      showMessage('个人资料更新成功', 'success');
    } catch (error) {
      console.error('更新个人资料失败:', error);
      showMessage('更新个人资料失败: ' + (error.response?.data?.error || '未知错误'), 'error');
    }
  };

  const handleChangePassword = async (passwordData) => {
    try {
      await AuthService.changePassword(user.id, passwordData);
      showMessage('密码修改成功', 'success');
    } catch (error) {
      console.error('修改密码失败:', error);
      showMessage('修改密码失败: ' + (error.response?.data?.error || '未知错误'), 'error');
    }
  };

  if (loading) {
    return <div className="container">加载中...</div>;
  }

  return (
    <div className="container">
      <header className="header">
        <h1>个人资料</h1>
        <button className="btn btn-danger" onClick={() => {
          AuthService.logout().then(() => {
            window.location.href = 'http://localhost:3002';
          });
        }}>
          登出
        </button>
      </header>

      <div className="content">
        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}

        <div className="profile-section">
          <h2>基本信息</h2>
          <p><strong>用户名:</strong> {user?.username}</p>
          <p><strong>注册时间:</strong> {user?.createdAt ? new Date(user.createdAt).toLocaleString() : ''}</p>
        </div>

        <div className="profile-section">
          <h2>编辑个人资料</h2>
          <ProfileForm 
            user={user} 
            onUpdateProfile={handleProfileUpdate} 
            onChangePassword={handleChangePassword} 
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
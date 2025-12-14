import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import AuthService from '../services/authService';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false); // New state for password form visibility
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    avatar: '',
    bio: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

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
      setProfileData({
        firstName: response.firstName || '',
        lastName: response.lastName || '',
        email: response.email || '',
        phone: response.phone || '',
        avatar: response.avatar || '',
        bio: response.bio || ''
      });
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

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthService.updateUserProfile(user.id, profileData);
      setUser(response);
      setProfileData({
        firstName: response.firstName || '',
        lastName: response.lastName || '',
        email: response.email || '',
        phone: response.phone || '',
        avatar: response.avatar || '',
        bio: response.bio || ''
      });
      setIsEditing(false); // Switch back to view mode after successful update
      showMessage('个人资料更新成功', 'success');
    } catch (error) {
      console.error('更新个人资料失败:', error);
      showMessage('更新个人资料失败: ' + (error.response?.data?.error || '未知错误'), 'error');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      showMessage('新密码和确认密码不匹配', 'error');
      return;
    }
    
    try {
      await AuthService.changePassword(user.id, passwordData);
      showMessage('密码修改成功', 'success');
      
      // Clear password fields
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      });
      
      // Hide the password form after successful submission
      setShowPasswordForm(false);
    } catch (error) {
      console.error('修改密码失败:', error);
      showMessage('修改密码失败: ' + (error.response?.data?.error || '未知错误'), 'error');
    }
  };

  const handleCancelEdit = () => {
    // Reset form data to original values
    setProfileData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      avatar: user?.avatar || '',
      bio: user?.bio || ''
    });
    setIsEditing(false);
  };

  if (loading) {
    return (
      <Layout activeMenu="profile">
        <div className="content">
          <h1>个人资料</h1>
          <div>加载中...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout activeMenu="profile">
      <div className="content">
        <h1>个人资料</h1>
        
        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}

        <div className="protected-content">
          <div className="profile-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2>基本信息</h2>
              {!isEditing && (
                <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                  编辑个人资料
                </button>
              )}
            </div>
            
            {!isEditing ? (
              // View mode
              <div className="profile-view">
                <div className="profile-field">
                  <strong>用户名:</strong>
                  <span>{user?.username}</span>
                </div>
                
                <div className="profile-field">
                  <strong>姓名:</strong>
                  <span>{profileData.firstName} {profileData.lastName}</span>
                </div>
                
                <div className="profile-field">
                  <strong>邮箱:</strong>
                  <span>{profileData.email}</span>
                </div>
                
                <div className="profile-field">
                  <strong>电话:</strong>
                  <span>{profileData.phone}</span>
                </div>
                
                <div className="profile-field">
                  <strong>头像:</strong>
                  {profileData.avatar ? (
                    <img src={profileData.avatar} alt="Avatar" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                  ) : (
                    <span>未设置</span>
                  )}
                </div>
                
                <div className="profile-field">
                  <strong>个人简介:</strong>
                  <span>{profileData.bio || '未设置'}</span>
                </div>
                
                <div className="profile-field">
                  <strong>注册时间:</strong>
                  <span>{user?.createdAt ? new Date(user.createdAt).toLocaleString() : ''}</span>
                </div>
              </div>
            ) : (
              // Edit mode
              <form onSubmit={handleProfileSubmit}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <label htmlFor="firstName">名字</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleProfileChange}
                      placeholder="请输入名字"
                      style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                    />
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <label htmlFor="lastName">姓氏</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleProfileChange}
                      placeholder="请输入姓氏"
                      style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                    />
                  </div>
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <label htmlFor="email">邮箱</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    placeholder="请输入邮箱"
                    style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                  />
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <label htmlFor="phone">电话</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                    placeholder="请输入电话号码"
                    style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                  />
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <label htmlFor="avatar">头像URL</label>
                  <input
                    type="text"
                    id="avatar"
                    name="avatar"
                    value={profileData.avatar}
                    onChange={handleProfileChange}
                    placeholder="请输入头像URL"
                    style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                  />
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <label htmlFor="bio">个人简介</label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={profileData.bio}
                    onChange={handleProfileChange}
                    placeholder="请输入个人简介"
                    rows="4"
                    style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                  />
                </div>
                
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="submit" className="btn btn-primary">
                    保存
                  </button>
                  <button type="button" className="btn" onClick={handleCancelEdit}>
                    取消
                  </button>
                </div>
              </form>
            )}
          </div>
          
          <div className="profile-section">
            <h2>更改密码</h2>
            {!showPasswordForm ? (
              // Show only button initially
              <button className="btn btn-primary" onClick={() => setShowPasswordForm(true)}>
                更改密码
              </button>
            ) : (
              // Show form when button is clicked
              <form onSubmit={handlePasswordSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                  <label htmlFor="currentPassword">当前密码</label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="请输入当前密码"
                    required
                    style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                  />
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <label htmlFor="newPassword">新密码</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="请输入新密码"
                    required
                    style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                  />
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <label htmlFor="confirmNewPassword">确认新密码</label>
                  <input
                    type="password"
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    value={passwordData.confirmNewPassword}
                    onChange={handlePasswordChange}
                    placeholder="请再次输入新密码"
                    required
                    style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                  />
                </div>
                
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="submit" className="btn btn-primary">
                    更改密码
                  </button>
                  <button type="button" className="btn" onClick={() => setShowPasswordForm(false)}>
                    取消
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
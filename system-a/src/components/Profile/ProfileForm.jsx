import React, { useState } from 'react';

const ProfileForm = ({ user, onUpdateProfile, onChangePassword }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    avatar: user?.avatar || '',
    bio: user?.bio || ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

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
      await onUpdateProfile(profileData);
      setIsEditing(false); // Switch back to view mode after successful update
    } catch (error) {
      console.error('更新个人资料失败:', error);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      alert('新密码和确认密码不匹配');
      return;
    }
    
    try {
      await onChangePassword(passwordData);
      // Clear password fields
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      });
    } catch (error) {
      console.error('修改密码失败:', error);
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

  return (
    <div className="profile-form-container">
      <div className="form-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>个人资料</h3>
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
              <label><strong>姓名:</strong></label>
              <span>{profileData.firstName} {profileData.lastName}</span>
            </div>
            
            <div className="profile-field">
              <label><strong>邮箱:</strong></label>
              <span>{profileData.email}</span>
            </div>
            
            <div className="profile-field">
              <label><strong>电话:</strong></label>
              <span>{profileData.phone}</span>
            </div>
            
            <div className="profile-field">
              <label><strong>头像:</strong></label>
              {profileData.avatar ? (
                <img src={profileData.avatar} alt="Avatar" style={{ maxWidth: '100px', maxHeight: '100px' }} />
              ) : (
                <span>未设置</span>
              )}
            </div>
            
            <div className="profile-field">
              <label><strong>个人简介:</strong></label>
              <span>{profileData.bio || '未设置'}</span>
            </div>
          </div>
        ) : (
          // Edit mode
          <form onSubmit={handleProfileSubmit}>
            <div className="form-row">
              <div className="form-group half-width">
                <label htmlFor="firstName">名字</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleProfileChange}
                  placeholder="请输入名字"
                />
              </div>
              
              <div className="form-group half-width">
                <label htmlFor="lastName">姓氏</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleProfileChange}
                  placeholder="请输入姓氏"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="email">邮箱</label>
              <input
                type="email"
                id="email"
                name="email"
                value={profileData.email}
                onChange={handleProfileChange}
                placeholder="请输入邮箱"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">电话</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={profileData.phone}
                onChange={handleProfileChange}
                placeholder="请输入电话号码"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="avatar">头像URL</label>
              <input
                type="text"
                id="avatar"
                name="avatar"
                value={profileData.avatar}
                onChange={handleProfileChange}
                placeholder="请输入头像URL"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="bio">个人简介</label>
              <textarea
                id="bio"
                name="bio"
                value={profileData.bio}
                onChange={handleProfileChange}
                placeholder="请输入个人简介"
                rows="4"
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
      
      <div className="form-section">
        <h3>更改密码</h3>
        <form onSubmit={handlePasswordSubmit}>
          <div className="form-group">
            <label htmlFor="currentPassword">当前密码</label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              placeholder="请输入当前密码"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="newPassword">新密码</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              placeholder="请输入新密码"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmNewPassword">确认新密码</label>
            <input
              type="password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              value={passwordData.confirmNewPassword}
              onChange={handlePasswordChange}
              placeholder="请再次输入新密码"
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary">
            更改密码
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
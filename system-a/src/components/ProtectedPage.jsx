import React from 'react';

const ProtectedPage = ({ user }) => {
  return (
    <div>
      <div className="user-info">
        <h3>用户信息</h3>
        <p><strong>ID:</strong> {user?.id}</p>
        <p><strong>用户名:</strong> {user?.username}</p>
      </div>
      
      <div className="protected-content">
        <h2>受保护内容</h2>
        <p>此内容仅对认证用户开放。</p>
        <p>欢迎来到 System A, {user?.username}！您已通过SSO系统成功认证。</p>
        
        <h3>功能特性</h3>
        <ul>
          <li>单点登录集成</li>
          <li>基于令牌的认证</li>
          <li>会话管理</li>
          <li>安全登出</li>
          <li>个人资料管理</li>
        </ul>
        
        <h3>个人资料管理</h3>
        <p>您可以通过点击顶部导航栏中的"个人资料"按钮来管理您的个人信息和更改密码。</p>
        
        <h3>工作原理</h3>
        <ol>
          <li>用户访问System A</li>
          <li>系统检查认证令牌</li>
          <li>如果没有令牌，重定向到SSO登录页面</li>
          <li>用户在SSO系统上登录</li>
          <li>SSO系统创建会话并重定向回来</li>
          <li>System A与SSO服务器验证令牌</li>
          <li>用户访问受保护内容</li>
        </ol>
      </div>
    </div>
  );
};

export default ProtectedPage;
import React from 'react';
import Link from 'next/link';

const ProtectedContent = ({ user }) => {
  return (
    <div>
      <div className="user-info">
        <h3>认证用户信息</h3>
        <p><strong>ID:</strong> {user?.id}</p>
        <p><strong>用户名:</strong> {user?.username}</p>
      </div>
      
      <div className="protected-content">
        <h2>受保护内容</h2>
        <p>这部分内容仅对认证用户开放。</p>
        <p>欢迎来到 System B, {user?.username}！您已通过SSO系统成功认证。</p>
        
        <h3>系统特性</h3>
        <ul>
          <li>与System A的单点登录集成</li>
          <li>基于令牌的认证</li>
          <li>会话管理</li>
          <li>安全的登出功能</li>
          <li>个人资料管理</li>
        </ul>
        
        <h3>个人资料管理</h3>
        <p>您可以通过以下链接管理您的个人资料：</p>
        <ul>
          <li><Link href="/profile">编辑个人资料</Link> - 更新您的个人信息</li>
          <li><Link href="/profile">更改密码</Link> - 修改您的登录密码</li>
        </ul>
        
        <h3>SSO工作流程</h3>
        <ol>
          <li>用户访问System B</li>
          <li>系统检查认证令牌</li>
          <li>如果无令牌，用户仍可查看公共内容</li>
          <li>用户点击登录按钮进行认证</li>
          <li>重定向到中央SSO登录页面</li>
          <li>登录成功后，重定向回System B</li>
          <li>系统与SSO服务器验证令牌</li>
          <li>用户访问受保护内容</li>
        </ol>
        
        <h3>访问其他系统</h3>
        <p>您可以通过以下链接访问其他已集成的系统：</p>
        <ul>
          <li><a href="http://localhost:3000">System A</a> - 完全受保护的应用程序</li>
          <li><a href="http://localhost:3002">登录系统</a> - 中央认证页面</li>
        </ul>
      </div>
    </div>
  );
};

export default ProtectedContent;
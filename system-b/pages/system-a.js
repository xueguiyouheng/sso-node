import React from 'react';
import Layout from '../components/Layout';

const SystemAPage = () => {
  return (
    <Layout activeMenu="system-a">
      <div className="content">
        <h1>System A 介绍</h1>
        
        <div className="protected-content">
          <h2>系统特点</h2>
          <ul>
            <li><strong>完全受保护</strong>：所有内容都需要用户认证后才能访问</li>
            <li><strong>单点登录集成</strong>：与SSO系统无缝集成，支持跨系统单点登录</li>
            <li><strong>自动重定向</strong>：未认证用户自动重定向到登录页面</li>
            <li><strong>安全登出</strong>：登出功能会清除会话并重定向到登录页面</li>
            <li><strong>响应式设计</strong>：适配各种设备屏幕尺寸</li>
          </ul>
          
          <h2>技术架构</h2>
          <ul>
            <li><strong>前端框架</strong>：React + Vite</li>
            <li><strong>状态管理</strong>：React Hooks</li>
            <li><strong>HTTP客户端</strong>：Axios</li>
            <li><strong>样式</strong>：CSS3模块化样式</li>
          </ul>
          
          <h2>SSO集成原理</h2>
          <ol>
            <li>用户访问System A时，系统首先检查认证状态</li>
            <li>如果未认证，重定向到SSO登录页面（http://localhost:3002）</li>
            <li>用户在登录页面输入凭据并提交</li>
            <li>登录系统向SSO服务器发送认证请求</li>
            <li>认证成功后，SSO服务器创建会话并重定向回System A</li>
            <li>System A验证令牌有效性并显示受保护内容</li>
            <li>用户在任意系统登出时，会清除SSO会话，实现统一登出</li>
          </ol>
          
          <h2>访问地址</h2>
          <p>System A运行在端口3000上，访问地址：<a href="http://localhost:3000" target="_blank" rel="noopener noreferrer">http://localhost:3000</a></p>
          
          <h2>核心功能</h2>
          <ul>
            <li><strong>认证检查</strong>：页面加载时自动检查用户认证状态</li>
            <li><strong>登录重定向</strong>：未认证用户自动重定向到登录页面</li>
            <li><strong>令牌验证</strong>：与SSO服务器通信验证令牌有效性</li>
            <li><strong>用户信息显示</strong>：显示当前认证用户的详细信息</li>
            <li><strong>安全登出</strong>：清除本地会话并通知SSO服务器</li>
            <li><strong>个人资料管理</strong>：允许用户更新个人信息和更改密码</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default SystemAPage;
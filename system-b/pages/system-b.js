import React from 'react';
import Layout from '../components/Layout';

const SystemBPage = () => {
  return (
    <Layout activeMenu="system-b">
      <div className="content">
        <h1>System B 介绍</h1>
        
        <div className="protected-content">
          <h2>系统特点</h2>
          <ul>
            <li><strong>混合内容模式</strong>：同时提供公共内容和受保护内容</li>
            <li><strong>灵活访问控制</strong>：未认证用户可浏览公共内容，认证用户可访问全部内容</li>
            <li><strong>单点登录集成</strong>：与SSO系统无缝集成，支持跨系统单点登录</li>
            <li><strong>用户体验优化</strong>：无需强制登录即可了解系统功能</li>
            <li><strong>响应式设计</strong>：适配各种设备屏幕尺寸</li>
          </ul>
          
          <h2>技术架构</h2>
          <ul>
            <li><strong>前端框架</strong>：Next.js (React)</li>
            <li><strong>路由系统</strong>：Next.js内置路由</li>
            <li><strong>状态管理</strong>：React Hooks</li>
            <li><strong>HTTP客户端</strong>：Axios</li>
            <li><strong>样式</strong>：CSS模块化样式</li>
          </ul>
          
          <h2>SSO集成原理</h2>
          <ol>
            <li>用户访问System B时，系统检查认证状态</li>
            <li>未认证用户可以浏览公共内容</li>
            <li>当用户需要访问受保护内容时，点击登录按钮</li>
            <li>重定向到SSO登录页面（http://localhost:3002）</li>
            <li>用户输入凭据并提交</li>
            <li>登录系统向SSO服务器发送认证请求</li>
            <li>认证成功后，重定向回System B</li>
            <li>System B验证令牌有效性并显示受保护内容</li>
            <li>用户在任意系统登出时，会清除SSO会话，实现统一登出</li>
          </ol>
          
          <h2>访问地址</h2>
          <p>System B运行在端口3003上，访问地址：<a href="http://localhost:3003" target="_blank" rel="noopener noreferrer">http://localhost:3003</a></p>
          
          <h2>核心功能</h2>
          <ul>
            <li><strong>内容分层</strong>：区分公共内容和受保护内容</li>
            <li><strong>动态UI</strong>：根据认证状态显示不同内容</li>
            <li><strong>认证检查</strong>：页面加载时自动检查用户认证状态</li>
            <li><strong>登录/登出</strong>：提供用户认证管理功能</li>
            <li><strong>令牌验证</strong>：与SSO服务器通信验证令牌有效性</li>
            <li><strong>个人资料管理</strong>：允许认证用户更新个人信息</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default SystemBPage;
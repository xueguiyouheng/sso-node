import React from 'react';
import Layout from '../components/Layout';

const LoginSystemPage = () => {
  return (
    <Layout activeMenu="login">
      <div className="content">
        <h1>登录系统 介绍</h1>
        
        <div className="protected-content">
          <h2>系统特点</h2>
          <ul>
            <li><strong>中央认证入口</strong>：为所有系统提供统一的登录界面</li>
            <li><strong>智能重定向</strong>：登录成功后自动重定向回原始系统</li>
            <li><strong>状态检查</strong>：自动检查用户是否已登录，避免重复登录</li>
            <li><strong>响应式设计</strong>：适配各种设备屏幕尺寸</li>
            <li><strong>用户体验优化</strong>：简洁直观的登录界面</li>
          </ul>
          
          <h2>技术架构</h2>
          <ul>
            <li><strong>前端框架</strong>：React + Vite</li>
            <li><strong>状态管理</strong>：React Hooks</li>
            <li><strong>HTTP客户端</strong>：Axios</li>
            <li><strong>样式</strong>：CSS3模块化样式</li>
          </ul>
          
          <h2>工作原理</h2>
          <ol>
            <li>用户从System A或System B访问需要认证的内容</li>
            <li>原始系统检测到未认证状态，重定向到登录系统</li>
            <li>登录系统接收redirectUrl参数，记录用户来源</li>
            <li>用户输入凭据并提交登录表单</li>
            <li>登录系统向SSO服务器发送认证请求</li>
            <li>认证成功后，重定向回原始系统指定的URL</li>
            <li>原始系统验证令牌有效性并显示受保护内容</li>
          </ol>
          
          <h2>访问地址</h2>
          <p>登录系统运行在端口3002上，访问地址：<a href="http://localhost:3002" target="_blank" rel="noopener noreferrer">http://localhost:3002</a></p>
          
          <h2>核心功能</h2>
          <ul>
            <li><strong>用户认证</strong>：验证用户凭据并与SSO服务器通信</li>
            <li><strong>会话管理</strong>：与SSO服务器协同管理用户会话</li>
            <li><strong>智能重定向</strong>：根据来源系统重定向回正确位置</li>
            <li><strong>状态检查</strong>：避免已登录用户重复登录</li>
            <li><strong>错误处理</strong>：友好的错误提示和处理机制</li>
            <li><strong>个人资料管理</strong>：支持用户注册时填写个人资料</li>
          </ul>
          
          <h2>安全特性</h2>
          <ul>
            <li><strong>HTTPS支持</strong>：生产环境中支持安全传输</li>
            <li><strong>CSRF保护</strong>：防止跨站请求伪造攻击</li>
            <li><strong>输入验证</strong>：严格的用户输入验证</li>
            <li><strong>会话安全</strong>：安全的会话管理和令牌处理</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default LoginSystemPage;
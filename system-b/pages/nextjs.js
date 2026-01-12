import React, { useState, useEffect } from 'react';
import AuthService from '../services/authService';
import Layout from '../components/Layout';

export default function NextJSPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      console.error('Authentication check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout activeMenu="nextjs">
        <div className="container">Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout activeMenu="nextjs">
      <div className="content">
        <h1>Next.js 特性展示</h1>
        <p>这是Next.js框架的核心功能展示页面。</p>
        
        <h2>主要特性：</h2>
        <ul>
          <li>服务器端渲染 (SSR)</li>
          <li>静态站点生成 (SSG)</li>
          <li>增量静态再生 (ISR)</li>
          <li>API路由支持</li>
          <li>内置CSS和Sass支持</li>
          <li>自动代码分割</li>
        </ul>
        
        <h2>与其他技术集成：</h2>
        <ul>
          <li>与Vite的开发工具链集成</li>
          <li>SSO单点登录系统</li>
          <li>JWT认证机制</li>
          <li>React生态系统</li>
        </ul>
        
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
          <h3>当前状态：</h3>
          <p>认证状态: {authenticated ? '已认证' : '未认证'}</p>
          {authenticated && user && <p>用户: {user.username}</p>}
        </div>
      </div>
      
      <style jsx>{`
        .content {
          max-width: 800px;
          margin: 0 auto;
        }
        
        h1 {
          color: #333;
          border-bottom: 2px solid #007acc;
          padding-bottom: 10px;
        }
        
        ul {
          margin: 15px 0;
          padding-left: 20px;
        }
        
        li {
          margin: 8px 0;
        }
      `}</style>
    </Layout>
  );
}
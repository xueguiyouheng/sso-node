import React, { useState, useEffect } from 'react';
import AuthService from '../services/authService';
import Layout from '../components/Layout';

export default function ViteNextJSPage() {
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
      <Layout activeMenu="vite">
        <div className="container">Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout activeMenu="vite">
      <div className="content">
        <h1>Vite + Next.js 集成示例</h1>
        <p>这是展示Vite和Next.js如何协同工作的示例页面。</p>
        
        <h2>主要特点：</h2>
        <ul>
          <li>基于Vite的快速开发体验</li>
          <li>Next.js的服务器端渲染能力</li>
          <li>SSO单点登录集成</li>
          <li>JWT令牌自动刷新机制</li>
        </ul>
        
        <h2>技术栈：</h2>
        <ul>
          <li>前端：React + Vite + Next.js</li>
          <li>后端：Node.js + Express</li>
          <li>数据库：MongoDB + MySQL</li>
          <li>认证：JWT + SSO</li>
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
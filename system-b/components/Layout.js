import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AuthService from '../services/authService';

const Layout = ({ children, activeMenu }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

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
    }
  };

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      setAuthenticated(false);
      setUser(null);
      // Redirect to login page
      window.location.href = 'http://localhost:3002';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleLogin = () => {
    // Redirect to login page with return URL
    const returnUrl = encodeURIComponent(window.location.href);
    window.location.href = `http://localhost:3002?returnUrl=${returnUrl}`;
  };

  return (
    <div className="layout">
      {/* Header */}
      <header className="header">
        <h1>System B</h1>
        <div>
          {authenticated ? (
            <div>
              <span>欢迎, {user?.username}!</span>
              <button className="btn btn-danger" onClick={handleLogout} style={{ marginLeft: '10px' }}>
                登出
              </button>
            </div>
          ) : (
            <button className="btn" onClick={handleLogin}>
              登录
            </button>
          )}
        </div>
      </header>

      <div className="main-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <nav>
            <ul>
              <li className={activeMenu === 'home' ? 'active' : ''}>
                <Link href="/">首页</Link>
              </li>
              <li className={activeMenu === 'system-overview' ? 'active' : ''}>
                <Link href="/system-overview">系统介绍</Link>
              </li>
              <li className={activeMenu === 'react-hooks' ? 'active' : ''}>
                <Link href="/react-hooks">React Hooks</Link>
              </li>
              <li className={activeMenu === 'zustand' ? 'active' : ''}>
                <Link href="/zustand">Zustand 状态管理</Link>
              </li>
              <li className={activeMenu === 'vite' ? 'active' : ''}>
                <Link href="/vite-nextjs">Vite</Link>
              </li>
              <li className={activeMenu === 'nextjs' ? 'active' : ''}>
                <Link href="/vite-nextjs">Next.js</Link>
              </li>
              <li className={activeMenu === 'product-showcase' ? 'active' : ''}>
                <Link href="/product-showcase">产品展示</Link>
              </li>
              <li className={activeMenu === 'iphone' ? 'active' : ''}>
                <Link href="/iphone">iPhone</Link>
              </li>
              <li className={activeMenu === 'iphone-ref' ? 'active' : ''}>
                <Link href="/iphone-ref">iPhone 参考</Link>
              </li>
              <li className={activeMenu === 'iphone-showcase' ? 'active' : ''}>
                <Link href="/iphone-showcase">iPhone 展示</Link>
              </li>
              <li className={activeMenu === 'browser' ? 'active' : ''}>
                <Link href="/browser">浏览器</Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {children}
        </main>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        .layout {
          min-height: 100vh;
        }
        
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background-color: #f8f9fa;
          border-bottom: 1px solid #dee2e6;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          height: 60px;
        }
        
        .main-container {
          display: flex;
          margin-top: 60px; /* Height of header */
          min-height: calc(100vh - 60px);
        }
        
        .sidebar {
          width: 150px; /* Fixed width of 150px */
          background-color: #fff;
          border-right: 1px solid #dee2e6;
          padding: 0.5rem; /* Reduced padding */
          position: fixed;
          top: 60px; /* Height of header */
          left: 0;
          bottom: 0;
          overflow-y: auto; /* Allow vertical scrolling if content exceeds height */
          z-index: 1100; /* Higher z-index than header */
        }
        
        .sidebar ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .sidebar li {
          margin-bottom: 0.25rem; /* Reduced margin */
        }
        
        .sidebar a {
          display: block;
          padding: 0.5rem 0.75rem; /* Reduced padding */
          color: #495057;
          text-decoration: none;
          border-radius: 4px;
          transition: all 0.2s;
          white-space: nowrap; /* Prevent text wrapping */
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 0.9rem; /* Slightly smaller font */
        }
        
        .sidebar a:hover {
          background-color: #e9ecef;
        }
        
        .sidebar .active a {
          background-color: #007bff;
          color: white;
        }
        
        .main-content {
          flex: 1;
          padding: 2rem;
          margin-left: 150px; /* Width of sidebar */
          overflow-x: auto; /* Allow horizontal scrolling only when necessary */
        }
      `}</style>
    </div>
  );
};

export default Layout;
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
              {authenticated && (
                <>
                  <li className={activeMenu === 'profile' ? 'active' : ''}>
                    <Link href="/profile">个人资料</Link>
                  </li>
                  <li className={activeMenu === 'users' ? 'active' : ''}>
                    <Link href="/users">用户列表</Link>
                  </li>
                  <li className={activeMenu === 'docker' ? 'active' : ''}>
                    <Link href="/docker-commands">Docker命令</Link>
                  </li>
                </>
              )}
              <li className={activeMenu === 'system-a' ? 'active' : ''}>
                <Link href="/system-a">System A</Link>
              </li>
              <li className={activeMenu === 'system-b' ? 'active' : ''}>
                <Link href="/system-b">System B</Link>
              </li>
              <li className={activeMenu === 'login' ? 'active' : ''}>
                <Link href="/login-system">登录系统</Link>
              </li>
              <li className={activeMenu === 'sso' ? 'active' : ''}>
                <Link href="/sso-server">SSO服务器</Link>
              </li>
              <li className={activeMenu === 'test-cases' ? 'active' : ''}>
                <Link href="/test-cases">测试用例文档</Link>
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
          padding: 1rem;
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
          margin-bottom: 0.5rem;
        }
        
        .sidebar a {
          display: block;
          padding: 0.75rem 1rem;
          color: #495057;
          text-decoration: none;
          border-radius: 4px;
          transition: all 0.2s;
          white-space: nowrap; /* Prevent text wrapping */
          overflow: hidden;
          text-overflow: ellipsis;
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
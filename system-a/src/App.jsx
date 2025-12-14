import React, { useState, useEffect } from 'react';
import AuthService from './services/authService';
import PublicPage from './components/PublicPage';
import ProtectedPage from './components/ProtectedPage';
import ProfilePage from './components/Profile/ProfilePage';
import HooksPage from './components/HooksPage';
import DesignPatternsPage from './components/DesignPatternsPage';
import JavascriptPage from './components/JavascriptPage';
import ArrayMethodsPage from './components/ArrayMethodsPage';
import ObjectMethodsPage from './components/ObjectMethodsPage';
import './App.css';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home'); // home, profile, hooks, patterns, javascript, array, object

  useEffect(() => {
    checkAuthStatus();
    
    // Periodically check auth status
    const interval = setInterval(() => {
      checkAuthStatus();
    }, 5000); // Check every 5 seconds
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  const checkAuthStatus = async () => {
    try {
      const authStatus = await AuthService.checkAuthStatus();
      setAuthenticated(authStatus.authenticated);
      setUser(authStatus.user);
    } catch (error) {
      console.error('检查认证状态失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      // Redirect to SSO login page with return URL
      const returnUrl = encodeURIComponent(window.location.origin);
      window.location.href = `http://localhost:3002?returnUrl=${returnUrl}`;
    } catch (error) {
      console.error('登录失败:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      setAuthenticated(false);
      setUser(null);
      setCurrentPage('home');
    } catch (error) {
      console.error('登出失败:', error);
    }
  };

  const navigateToProfile = () => {
    setCurrentPage('profile');
  };

  const navigateToHome = () => {
    setCurrentPage('home');
  };

  const navigateToHooks = () => {
    setCurrentPage('hooks');
  };

  const navigateToPatterns = () => {
    setCurrentPage('patterns');
  };

  const navigateToJavascript = () => {
    setCurrentPage('javascript');
  };

  const navigateToArray = () => {
    setCurrentPage('array');
  };

  const navigateToObject = () => {
    setCurrentPage('object');
  };

  if (loading) {
    return <div className="app-container">加载中...</div>;
  }

  return (
    <div className="app-container">
      {currentPage === 'home' && authenticated ? (
        <ProtectedPage 
          authenticated={authenticated}
          user={user} 
          currentPage={currentPage}
          onNavigateToProfile={navigateToProfile}
          onNavigateToHome={navigateToHome}
          onNavigateToHooks={navigateToHooks}
          onNavigateToPatterns={navigateToPatterns}
          onNavigateToJavascript={navigateToJavascript}
          onLogout={handleLogout}
        />
      ) : currentPage === 'home' && !authenticated ? (
        <PublicPage onLogin={handleLogin} />
      ) : currentPage === 'profile' ? (
        <ProfilePage 
          authenticated={authenticated}
          user={user}
          currentPage={currentPage}
          onNavigateToProfile={navigateToProfile}
          onNavigateToHome={navigateToHome}
          onNavigateToHooks={navigateToHooks}
          onNavigateToPatterns={navigateToPatterns}
          onNavigateToJavascript={navigateToJavascript}
          onLogout={handleLogout}
        />
      ) : currentPage === 'hooks' ? (
        <HooksPage 
          authenticated={authenticated}
          user={user}
          currentPage={currentPage}
          onNavigateToProfile={navigateToProfile}
          onNavigateToHome={navigateToHome}
          onNavigateToHooks={navigateToHooks}
          onNavigateToPatterns={navigateToPatterns}
          onNavigateToJavascript={navigateToJavascript}
          onLogout={handleLogout}
          onLogin={handleLogin}
        />
      ) : currentPage === 'patterns' ? (
        <DesignPatternsPage 
          authenticated={authenticated}
          user={user}
          currentPage={currentPage}
          onNavigateToProfile={navigateToProfile}
          onNavigateToHome={navigateToHome}
          onNavigateToHooks={navigateToHooks}
          onNavigateToPatterns={navigateToPatterns}
          onNavigateToJavascript={navigateToJavascript}
          onLogout={handleLogout}
          onLogin={handleLogin}
        />
      ) : currentPage === 'javascript' ? (
        <JavascriptPage 
          authenticated={authenticated}
          user={user}
          currentPage={currentPage}
          onNavigateToProfile={navigateToProfile}
          onNavigateToHome={navigateToHome}
          onNavigateToHooks={navigateToHooks}
          onNavigateToPatterns={navigateToPatterns}
          onNavigateToJavascript={navigateToJavascript}
          onNavigateToArray={navigateToArray}
          onNavigateToObject={navigateToObject}
          onLogout={handleLogout}
          onLogin={handleLogin}
        />
      ) : currentPage === 'array' ? (
        <ArrayMethodsPage 
          authenticated={authenticated}
          user={user}
          currentPage={currentPage}
          onNavigateToProfile={navigateToProfile}
          onNavigateToHome={navigateToHome}
          onNavigateToHooks={navigateToHooks}
          onNavigateToPatterns={navigateToPatterns}
          onNavigateToJavascript={navigateToJavascript}
          onNavigateToArray={navigateToArray}
          onNavigateToObject={navigateToObject}
          onLogout={handleLogout}
          onLogin={handleLogin}
        />
      ) : (
        <ObjectMethodsPage 
          authenticated={authenticated}
          user={user}
          currentPage={currentPage}
          onNavigateToProfile={navigateToProfile}
          onNavigateToHome={navigateToHome}
          onNavigateToHooks={navigateToHooks}
          onNavigateToPatterns={navigateToPatterns}
          onNavigateToJavascript={navigateToJavascript}
          onNavigateToArray={navigateToArray}
          onNavigateToObject={navigateToObject}
          onLogout={handleLogout}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
}

export default App;
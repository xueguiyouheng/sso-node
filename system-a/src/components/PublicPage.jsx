import React from 'react';
import Navigation from './Navigation';
import './PublicPage.css';

const PublicPage = ({ onLogin }) => {
  const handleLoginClick = () => {
    if (onLogin && typeof onLogin === 'function') {
      onLogin();
    } else {
      // Fallback: redirect to SSO login page with return URL
      const returnUrl = encodeURIComponent(window.location.origin);
      window.location.href = `http://localhost:3002?returnUrl=${returnUrl}`;
    }
  };

  return (
    <div className="page-container">
      <Navigation 
        authenticated={false}
        onLogin={onLogin}
      />
      
      <div className="content-wrapper">
        <div className="public-content">
          <h2>公共内容</h2>
          <p>此内容对所有人开放。</p>
          <p>要访问受保护内容，请登录。</p>
          <button className="btn" onClick={handleLoginClick}>
            登录以访问受保护内容
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublicPage;
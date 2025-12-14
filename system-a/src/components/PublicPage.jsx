import React from 'react';

const PublicPage = ({ onLogin }) => {
  return (
    <div>
      <h2>公共内容</h2>
      <p>此内容对所有人开放。</p>
      <p>要访问受保护内容，请登录。</p>
      <button className="btn" onClick={onLogin}>
        登录以访问受保护内容
      </button>
    </div>
  );
};

export default PublicPage;
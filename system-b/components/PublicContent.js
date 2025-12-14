import React from 'react';

const PublicContent = () => {
  return (
    <div>
      <h2>公共内容</h2>
      <p>这部分内容对所有用户开放，无论是否登录都可以访问。</p>
      <p>System B 展示了SSO集成的混合模式，既有公共内容也有受保护内容。</p>
      
      <div style={{ marginTop: '30px' }}>
        <h3>关于此系统</h3>
        <p>System B 是一个Next.js应用程序，与SSO系统集成，提供：</p>
        <ul>
          <li>对所有用户开放的公共内容</li>
          <li>仅对认证用户开放的受保护内容</li>
          <li>跨多个系统的单点登录</li>
          <li>集中的认证管理</li>
        </ul>
      </div>
      
      <div style={{ marginTop: '30px' }}>
        <h3>如何访问受保护内容</h3>
        <p>要访问受保护内容，请使用左侧菜单导航到不同的系统介绍页面，或者点击顶部的登录按钮进行认证。</p>
      </div>
    </div>
  );
};

export default PublicContent;
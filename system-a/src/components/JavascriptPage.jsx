import React from 'react';
import Navigation from './Navigation';
import './JavascriptPage.css';

const JavascriptPage = ({ 
  authenticated, 
  user, 
  currentPage, 
  onNavigateToProfile, 
  onNavigateToHome, 
  onNavigateToHooks,
  onNavigateToPatterns,
  onNavigateToJavascript,
  onNavigateToArray,
  onNavigateToObject,
  onLogout, 
  onLogin 
}) => {
  return (
    <div className="page-container">
      <Navigation 
        authenticated={authenticated}
        user={user}
        currentPage={currentPage}
        onNavigateToProfile={onNavigateToProfile}
        onNavigateToHome={onNavigateToHome}
        onNavigateToHooks={onNavigateToHooks}
        onNavigateToPatterns={onNavigateToPatterns}
        onNavigateToJavascript={onNavigateToJavascript}
        onLogout={onLogout}
        onLogin={onLogin}
      />
      
      <div className="content-wrapper">
        <div className="profile-container">
          <div className="profile-section">
            <h2>JavaScript 核心知识</h2>
            <p>JavaScript 是一种轻量级的编程语言，是世界上最流行的编程语言之一。它是一种可解释的、基于原型的、多范式的动态脚本语言，支持面向对象编程、命令式编程和函数式编程。</p>
            
            <div className="javascript-links">
              <button 
                className="javascript-link-btn" 
                onClick={onNavigateToArray}
              >
                Array 方法详解
              </button>
              <button 
                className="javascript-link-btn" 
                onClick={onNavigateToObject}
              >
                Object 方法详解
              </button>
            </div>
          </div>
          
          <div className="profile-section">
            <h3>JavaScript 简介</h3>
            
            <div className="javascript-intro">
              <h4>什么是 JavaScript？</h4>
              <p>JavaScript 是一种脚本语言，主要用于网页开发，使网页具有交互性。它可以在浏览器中运行，也可以在服务器端运行（如 Node.js）。</p>
              
              <h4>JavaScript 的特点</h4>
              <ul>
                <li><strong>轻量级：</strong>语法简洁，易于学习</li>
                <li><strong>解释型：</strong>不需要编译，直接由浏览器解释执行</li>
                <li><strong>基于对象：</strong>支持面向对象编程</li>
                <li><strong>动态性：</strong>变量类型在运行时确定</li>
                <li><strong>跨平台：</strong>可在多种操作系统上运行</li>
              </ul>
              
              <h4>JavaScript 的组成</h4>
              <ul>
                <li><strong>ECMAScript：</strong>JavaScript 的核心，定义了语言的基本语法和特性</li>
                <li><strong>文档对象模型 (DOM)：</strong>用于操作 HTML 文档的接口</li>
                <li><strong>浏览器对象模型 (BOM)：</strong>用于操作浏览器窗口的接口</li>
              </ul>
              
              <h4>JavaScript 的应用领域</h4>
              <ul>
                <li>网页交互效果</li>
                <li>前端框架开发 (React, Vue, Angular)</li>
                <li>服务端开发 (Node.js)</li>
                <li>移动应用开发</li>
                <li>桌面应用开发</li>
                <li>游戏开发</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JavascriptPage;
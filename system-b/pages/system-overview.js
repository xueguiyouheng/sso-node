import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import AuthService from '../services/authService';

const SystemOverviewPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // State for user list
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [userMessageType, setUserMessageType] = useState('');
  
  // State for profile
  const [user, setUser] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileMessage, setProfileMessage] = useState('');
  const [profileMessageType, setProfileMessageType] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    avatar: '',
    bio: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  // Fetch users when users tab is activated
  useEffect(() => {
    if (activeTab === 'users' && users.length === 0) {
      fetchUsers();
    }
    
    if (activeTab === 'profile' && !user) {
      fetchUserProfile();
    }
  }, [activeTab]);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const authStatus = await AuthService.checkAuthStatus();
      if (!authStatus.authenticated) {
        window.location.href = 'http://localhost:3002';
        return;
      }

      const usersData = await AuthService.getAllUsers();
      setUsers(usersData);
    } catch (error) {
      console.error('获取用户列表失败:', error);
      showUserMessage('获取用户列表失败: ' + (error.response?.data?.error || '未知错误'), 'error');
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const authStatus = await AuthService.checkAuthStatus();
      if (!authStatus.authenticated) {
        window.location.href = 'http://localhost:3002';
        return;
      }

      const response = await AuthService.getUserInfo(authStatus.userId);
      setUser(response);
      setProfileData({
        firstName: response.firstName || '',
        lastName: response.lastName || '',
        email: response.email || '',
        phone: response.phone || '',
        avatar: response.avatar || '',
        bio: response.bio || ''
      });
    } catch (error) {
      console.error('获取用户资料失败:', error);
      showProfileMessage('获取用户资料失败', 'error');
    } finally {
      setLoadingProfile(false);
    }
  };

  const showUserMessage = (msg, type) => {
    setUserMessage(msg);
    setUserMessageType(type);
    setTimeout(() => {
      setUserMessage('');
      setUserMessageType('');
    }, 3000);
  };

  const showProfileMessage = (msg, type) => {
    setProfileMessage(msg);
    setProfileMessageType(type);
    setTimeout(() => {
      setProfileMessage('');
      setProfileMessageType('');
    }, 3000);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthService.updateUserProfile(user.id, profileData);
      setUser(response);
      setProfileData({
        firstName: response.firstName || '',
        lastName: response.lastName || '',
        email: response.email || '',
        phone: response.phone || '',
        avatar: response.avatar || '',
        bio: response.bio || ''
      });
      setIsEditing(false);
      showProfileMessage('个人资料更新成功', 'success');
    } catch (error) {
      console.error('更新个人资料失败:', error);
      showProfileMessage('更新个人资料失败: ' + (error.response?.data?.error || '未知错误'), 'error');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      showProfileMessage('新密码和确认密码不匹配', 'error');
      return;
    }
    
    try {
      await AuthService.changePassword(user.id, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      showProfileMessage('密码更改成功', 'success');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      });
      setShowPasswordForm(false);
    } catch (error) {
      console.error('更改密码失败:', error);
      showProfileMessage('更改密码失败: ' + (error.response?.data?.error || '未知错误'), 'error');
    }
  };

  return (
    <Layout activeMenu="system-overview">
      <div className="content">
        <h1>系统介绍</h1>
        
        <div className="protected-content">
          {/* Tab Navigation */}
          <div className="tabs">
            <button 
              className={activeTab === 'overview' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('overview')}
            >
              系统概览
            </button>
            <button 
              className={activeTab === 'profile' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('profile')}
            >
              个人资料
            </button>
            <button 
              className={activeTab === 'users' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('users')}
            >
              用户列表
            </button>
            <button 
              className={activeTab === 'docker' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('docker')}
            >
              Docker命令
            </button>
            <button 
              className={activeTab === 'system-a' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('system-a')}
            >
              System A
            </button>
            <button 
              className={activeTab === 'system-b' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('system-b')}
            >
              System B
            </button>
            <button 
              className={activeTab === 'login' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('login')}
            >
              登录系统
            </button>
            <button 
              className={activeTab === 'sso' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('sso')}
            >
              SSO服务器
            </button>
            <button 
              className={activeTab === 'testcases' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('testcases')}
            >
              测试用例文档
            </button>
            <button 
              className={activeTab === 'vite' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('vite')}
            >
              Vite
            </button>
            <button 
              className={activeTab === 'nextjs' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('nextjs')}
            >
              Next.js
            </button>
          </div>
          
          {/* Tab Content */}
          {activeTab === 'overview' ? (
            <div className="tab-content">
              <h2>SSO单点登录系统概览</h2>
              <p>本项目实现了一个标准的单点登录(SSO)架构，包含四个主要组件：</p>
              
              <ol>
                <li><strong>SSO服务器</strong> (Node.js/Express) - 中央认证服务器</li>
                <li><strong>登录系统</strong> (React/Vite) - 中央登录页面</li>
                <li><strong>System A</strong> (React/Vite) - 需要认证的受保护应用</li>
                <li><strong>System B</strong> (Next.js) - 包含公共和受保护内容的应用</li>
              </ol>
              
              <h3>架构概览</h3>
              <pre>
                {`                   ┌────────────────────┐
                   │   System A (Vite)  │
                   │   Port: 3000       │
                   └─────────┬──────────┘
                             │
                   ┌─────────▼──────────┐
                   │                    │
                   │   SSO Server       ◄──────────┐
                   │   (Node.js)        │          │
                   │   Port: 3001       │          │
                   └─────────▲──────────┘          │
                             │                     │
                   ┌─────────┴──────────┐    ┌─────┴────────────┐
                   │  Login System      │    │   System B       │
                   │  (React/Vite)      │    │   (Next.js)      │
                   │  Port: 3002        │    │   Port: 3003     │
                   └────────────────────┘    └──────────────────┘`}
              </pre>
              
              <h3>核心特性</h3>
              <ul>
                <li><strong>单点登录</strong>: 一次登录，访问所有系统</li>
                <li><strong>会话管理</strong>: 集中式会话处理</li>
                <li><strong>基于令牌的认证</strong>: 安全的令牌交换</li>
                <li><strong>跨域支持</strong>: 正确的CORS配置</li>
                <li><strong>数据库集成</strong>: MongoDB存储用户数据，MySQL存储会话</li>
                <li><strong>响应式设计</strong>: 移动友好的界面</li>
              </ul>
              
              <h3>技术栈</h3>
              <ul>
                <li><strong>前端</strong>: React, Vite, Next.js</li>
                <li><strong>后端</strong>: Node.js, Express</li>
                <li><strong>数据库</strong>: MongoDB, MySQL</li>
                <li><strong>认证</strong>: JWT, Session</li>
                <li><strong>部署</strong>: Docker</li>
              </ul>
            </div>
          ) : activeTab === 'profile' ? (
            <div className="tab-content">
              <h2>个人资料</h2>
              
              {profileMessage && (
                <div className={`message ${profileMessageType}`}>
                  {profileMessage}
                </div>
              )}
              
              {loadingProfile ? (
                <div>加载中...</div>
              ) : (
                <div className="protected-content">
                  <div className="profile-section">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h2>基本信息</h2>
                      {!isEditing && (
                        <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                          编辑个人资料
                        </button>
                      )}
                    </div>
                    
                    {!isEditing ? (
                      // View mode
                      <div className="profile-view">
                        <div className="profile-field">
                          <strong>用户名:</strong>
                          <span>{user?.username}</span>
                        </div>
                        
                        <div className="profile-field">
                          <strong>姓名:</strong>
                          <span>{profileData.firstName} {profileData.lastName}</span>
                        </div>
                        
                        <div className="profile-field">
                          <strong>邮箱:</strong>
                          <span>{profileData.email}</span>
                        </div>
                        
                        <div className="profile-field">
                          <strong>电话:</strong>
                          <span>{profileData.phone || '未设置'}</span>
                        </div>
                        
                        <div className="profile-field">
                          <strong>头像:</strong>
                          {profileData.avatar ? (
                            <img src={profileData.avatar} alt="Avatar" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                          ) : (
                            <span>未设置</span>
                          )}
                        </div>
                        
                        <div className="profile-field">
                          <strong>个人简介:</strong>
                          <span>{profileData.bio || '未设置'}</span>
                        </div>
                        
                        <div style={{ marginTop: '1rem' }}>
                          <button className="btn btn-secondary" onClick={() => setShowPasswordForm(!showPasswordForm)}>
                            {showPasswordForm ? '取消更改密码' : '更改密码'}
                          </button>
                        </div>
                        
                        {showPasswordForm && (
                          <form onSubmit={handlePasswordSubmit} style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '4px' }}>
                            <h3>更改密码</h3>
                            
                            <div className="form-group">
                              <label>当前密码:</label>
                              <input
                                type="password"
                                name="currentPassword"
                                value={passwordData.currentPassword}
                                onChange={handlePasswordChange}
                                className="form-control"
                                required
                              />
                            </div>
                            
                            <div className="form-group">
                              <label>新密码:</label>
                              <input
                                type="password"
                                name="newPassword"
                                value={passwordData.newPassword}
                                onChange={handlePasswordChange}
                                className="form-control"
                                required
                              />
                            </div>
                            
                            <div className="form-group">
                              <label>确认新密码:</label>
                              <input
                                type="password"
                                name="confirmNewPassword"
                                value={passwordData.confirmNewPassword}
                                onChange={handlePasswordChange}
                                className="form-control"
                                required
                              />
                            </div>
                            
                            <button type="submit" className="btn btn-primary">更新密码</button>
                          </form>
                        )}
                      </div>
                    ) : (
                      // Edit mode
                      <form onSubmit={handleProfileSubmit}>
                        <div className="form-group">
                          <label>用户名:</label>
                          <input
                            type="text"
                            value={user?.username || ''}
                            className="form-control"
                            disabled
                          />
                        </div>
                        
                        <div className="form-group">
                          <label>名字:</label>
                          <input
                            type="text"
                            name="firstName"
                            value={profileData.firstName}
                            onChange={handleProfileChange}
                            className="form-control"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label>姓氏:</label>
                          <input
                            type="text"
                            name="lastName"
                            value={profileData.lastName}
                            onChange={handleProfileChange}
                            className="form-control"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label>邮箱:</label>
                          <input
                            type="email"
                            name="email"
                            value={profileData.email}
                            onChange={handleProfileChange}
                            className="form-control"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label>电话:</label>
                          <input
                            type="tel"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleProfileChange}
                            className="form-control"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label>头像URL:</label>
                          <input
                            type="text"
                            name="avatar"
                            value={profileData.avatar}
                            onChange={handleProfileChange}
                            className="form-control"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label>个人简介:</label>
                          <textarea
                            name="bio"
                            value={profileData.bio}
                            onChange={handleProfileChange}
                            className="form-control"
                            rows="4"
                          />
                        </div>
                        
                        <div style={{ marginTop: '1rem' }}>
                          <button type="submit" className="btn btn-primary">保存</button>
                          <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)} style={{ marginLeft: '0.5rem' }}>
                            取消
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : activeTab === 'users' ? (
            <div className="tab-content">
              <h2>用户列表</h2>
              
              {userMessage && (
                <div className={`message ${userMessageType}`}>
                  {userMessage}
                </div>
              )}
              
              {loadingUsers ? (
                <div>加载中...</div>
              ) : (
                <div className="protected-content">
                  <table className="users-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>用户名</th>
                        <th>邮箱</th>
                        <th>姓名</th>
                        <th>电话</th>
                        <th>注册时间</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(user => (
                        <tr key={user._id}>
                          <td>{user._id}</td>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>{user.firstName} {user.lastName}</td>
                          <td>{user.phone || '未设置'}</td>
                          <td>{user.createdAt ? new Date(user.createdAt).toLocaleString() : ''}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : activeTab === 'docker' ? (
            <div className="tab-content">
              <h2>Docker命令参考</h2>
              <p>本系统使用Docker容器化技术来管理数据库服务。</p>
              
              <h3>Docker服务</h3>
              <ul>
                <li><strong>MySQL</strong>: 用于存储会话数据</li>
                <li><strong>MongoDB</strong>: 用于存储用户数据</li>
              </ul>
              
              <h3>常用Docker命令</h3>
              <pre>
                {`# 启动所有服务
docker-compose up -d

# 查看运行中的容器
docker-compose ps

# 停止所有服务
docker-compose down

# 查看容器日志
docker-compose logs mysql
docker-compose logs mongodb

# 进入容器bash
docker-compose exec mysql bash
docker-compose exec mongodb bash

# 重启特定服务
docker-compose restart mysql
docker-compose restart mongodb`}
              </pre>
              
              <h3>数据库连接信息</h3>
              <ul>
                <li><strong>MySQL</strong>: 
                  <ul>
                    <li>端口: 3306</li>
                    <li>数据库: sso_system</li>
                    <li>用户: sso_user</li>
                  </ul>
                </li>
                <li><strong>MongoDB</strong>: 
                  <ul>
                    <li>端口: 27017</li>
                    <li>数据库: sso_db</li>
                  </ul>
                </li>
              </ul>
            </div>
          ) : activeTab === 'system-a' ? (
            <div className="tab-content">
              <h2>System A 介绍</h2>
              <p>System A 是一个基于 React 和 Vite 构建的完全受保护的应用程序。</p>
              
              <h3>技术栈</h3>
              <ul>
                <li><strong>前端框架</strong>: React + Vite</li>
                <li><strong>状态管理</strong>: React Hooks</li>
                <li><strong>HTTP客户端</strong>: Axios</li>
                <li><strong>样式</strong>: CSS3模块化样式</li>
              </ul>
              
              <h3>核心功能</h3>
              <ul>
                <li><strong>认证检查</strong>: 页面加载时自动检查用户认证状态</li>
                <li><strong>登录重定向</strong>: 未认证用户自动重定向到登录页面</li>
                <li><strong>令牌验证</strong>: 与SSO服务器通信验证令牌有效性</li>
                <li><strong>用户信息显示</strong>: 显示当前认证用户的详细信息</li>
                <li><strong>安全登出</strong>: 清除本地会话并通知SSO服务器</li>
                <li><strong>个人资料管理</strong>: 允许用户更新个人信息和更改密码</li>
              </ul>
              
              <h3>SSO集成原理</h3>
              <ol>
                <li>用户访问System A时，系统首先检查认证状态</li>
                <li>如果未认证，重定向到SSO登录页面（http://localhost:3002）</li>
                <li>用户在登录页面输入凭据并提交</li>
                <li>登录系统向SSO服务器发送认证请求</li>
                <li>认证成功后，SSO服务器创建会话并重定向回System A</li>
                <li>System A验证令牌有效性并显示受保护内容</li>
                <li>用户在任意系统登出时，会清除SSO会话，实现统一登出</li>
              </ol>
            </div>
          ) : activeTab === 'system-b' ? (
            <div className="tab-content">
              <h2>System B 介绍</h2>
              <p>System B 是一个基于 Next.js 构建的混合应用，包含公共和受保护内容。</p>
              
              <h3>技术栈</h3>
              <ul>
                <li><strong>前端框架</strong>: Next.js</li>
                <li><strong>状态管理</strong>: React Hooks</li>
                <li><strong>HTTP客户端</strong>: Axios</li>
                <li><strong>样式</strong>: CSS3模块化样式</li>
              </ul>
              
              <h3>核心功能</h3>
              <ul>
                <li><strong>内容分层</strong>: 区分公共内容和受保护内容</li>
                <li><strong>动态UI</strong>: 根据认证状态显示不同内容</li>
                <li><strong>认证检查</strong>: 页面加载时自动检查用户认证状态</li>
                <li><strong>登录/登出</strong>: 提供用户认证管理功能</li>
                <li><strong>令牌验证</strong>: 与SSO服务器通信验证令牌有效性</li>
                <li><strong>个人资料管理</strong>: 允许认证用户更新个人信息</li>
              </ul>
              
              <h3>SSO集成原理</h3>
              <ol>
                <li>用户访问System B时，系统检查认证状态</li>
                <li>未认证用户可以浏览公共内容</li>
                <li>当用户需要访问受保护内容时，点击登录按钮</li>
                <li>重定向到SSO登录页面（http://localhost:3002）</li>
                <li>用户输入凭据并提交</li>
                <li>登录系统向SSO服务器发送认证请求</li>
                <li>认证成功后，重定向回System B</li>
                <li>System B验证令牌有效性并显示受保护内容</li>
                <li>用户在任意系统登出时，会清除SSO会话，实现统一登出</li>
              </ol>
            </div>
          ) : activeTab === 'login' ? (
            <div className="tab-content">
              <h2>登录系统介绍</h2>
              <p>登录系统是所有系统的中央登录页面，基于 React 和 Vite 构建。</p>
              
              <h3>技术栈</h3>
              <ul>
                <li><strong>前端框架</strong>: React + Vite</li>
                <li><strong>状态管理</strong>: React Hooks</li>
                <li><strong>HTTP客户端</strong>: Axios</li>
                <li><strong>样式</strong>: CSS3模块化样式</li>
              </ul>
              
              <h3>核心功能</h3>
              <ul>
                <li><strong>用户认证</strong>: 验证用户凭据并与SSO服务器通信</li>
                <li><strong>会话管理</strong>: 与SSO服务器协同管理用户会话</li>
                <li><strong>智能重定向</strong>: 根据来源系统重定向回正确位置</li>
                <li><strong>状态检查</strong>: 避免已登录用户重复登录</li>
                <li><strong>错误处理</strong>: 友好的错误提示和处理机制</li>
                <li><strong>个人资料管理</strong>: 支持用户注册时填写个人资料</li>
              </ul>
              
              <h3>工作流程</h3>
              <ol>
                <li>用户访问受保护系统时，未认证则重定向到登录系统</li>
                <li>登录系统接收redirectUrl参数，记录用户来源</li>
                <li>用户输入凭据并提交登录表单</li>
                <li>登录系统向SSO服务器发送认证请求</li>
                <li>认证成功后，重定向回原始系统指定的URL</li>
                <li>原始系统验证令牌有效性并显示受保护内容</li>
              </ol>
            </div>
          ) : activeTab === 'sso' ? (
            <div className="tab-content">
              <h2>SSO服务器介绍</h2>
              <p>SSO服务器是中央认证服务器，使用 Node.js 和 Express 构建。</p>
              
              <h3>功能特点</h3>
              <ul>
                <li><strong>用户认证和会话管理</strong>: 创建、维护和销毁用户会话</li>
                <li><strong>令牌验证</strong>: 验证认证令牌的有效性</li>
                <li><strong>用户管理</strong>: 存储和检索用户信息</li>
                <li><strong>单点登出</strong>: 清除会话实现统一登出</li>
              </ul>
              
              <h3>技术实现</h3>
              <ul>
                <li><strong>后端框架</strong>: Node.js + Express</li>
                <li><strong>会话管理</strong>: express-session</li>
                <li><strong>MongoDB数据库</strong>: 存储用户数据</li>
                <li><strong>MySQL数据库</strong>: 存储会话数据</li>
                <li><strong>JWT支持</strong>: JSON Web Tokens</li>
                <li><strong>CORS中间件</strong>: 处理跨域请求</li>
              </ul>
              
              <h3>API接口</h3>
              <ul>
                <li><code>POST /api/auth/login</code> - 用户登录认证</li>
                <li><code>POST /api/auth/logout</code> - 用户登出</li>
                <li><code>GET /api/auth/status</code> - 检查认证状态</li>
                <li><code>GET /api/auth/validate</code> - 验证令牌</li>
                <li><code>GET /api/user/:id</code> - 获取用户信息</li>
                <li><code>PUT /api/user/:id</code> - 更新用户个人资料</li>
                <li><code>PUT /api/user/:id/password</code> - 更改用户密码</li>
              </ul>
            </div>
          ) : activeTab === 'testcases' ? (
            <div className="tab-content">
              <h2>测试用例文档</h2>
              <p>本系统包含完整的API测试用例文档，涵盖用户注册、登录、JWT认证、用户信息管理等功能。</p>
              
              <h3>测试环境</h3>
              <ul>
                <li>SSO服务器地址: http://localhost:3001</li>
                <li>测试工具: curl命令行工具</li>
                <li>数据库: MongoDB (用户数据), MySQL (会话数据)</li>
              </ul>
              
              <h3>核心测试用例</h3>
              <div className="test-case">
                <h4>1. 用户注册接口</h4>
                <p><strong>接口:</strong> POST /api/auth/register</p>
                <p><strong>描述:</strong> 创建新用户账户</p>
                <pre>
                  {`curl -X POST http://localhost:3001/api/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{"username": "testuser", "password": "testpass", "email": "test@example.com"}'`}
                </pre>
              </div>
              
              <div className="test-case">
                <h4>2. 用户登录接口</h4>
                <p><strong>接口:</strong> POST /api/auth/login</p>
                <p><strong>描述:</strong> 用户认证并创建会话</p>
                <pre>
                  {`curl -X POST http://localhost:3001/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"username": "testuser", "password": "testpass"}'`}
                </pre>
              </div>
              
              <div className="test-case">
                <h4>3. 用户登出接口</h4>
                <p><strong>接口:</strong> POST /api/auth/logout</p>
                <p><strong>描述:</strong> 用户登出，清除会话和JWT令牌</p>
                <pre>
                  {`curl -X POST http://localhost:3001/api/auth/logout -b cookie.txt`}
                </pre>
              </div>
              
              <div className="test-case">
                <h4>4. 认证状态检查</h4>
                <p><strong>接口:</strong> GET /api/auth/status</p>
                <p><strong>描述:</strong> 检查当前认证状态</p>
                <pre>
                  {`curl http://localhost:3001/api/auth/status -b cookie.txt`}
                </pre>
              </div>
              
              <h3>JWT令牌机制测试</h3>
              <p>JWT令牌通过HttpOnly Cookie自动传输，无需手动处理。</p>
              <p>令牌有效期: 24小时</p>
            </div>
          ) : activeTab === 'vite' ? (
            <div className="tab-content">
              <h2>Vite 简介</h2>
              <p>Vite 是由 Vue.js 作者尤雨溪开发的下一代前端构建工具，它利用浏览器原生的 ES 模块导入功能来提供极快的冷启动和热更新。</p>
              
              <h3>Vite 的核心特性</h3>
              <ul>
                <li><strong>极速的冷启动</strong>：基于 ES modules，无需打包即可启动</li>
                <li><strong>即时的热模块替换(HMR)</strong>：更新速度快到毫秒级</li>
                <li><strong>按需编译</strong>：只编译当前屏幕上使用的代码</li>
                <li><strong>丰富的内置功能</strong>：TypeScript、JSX、CSS 等开箱即用</li>
                <li><strong>通用插件机制</strong>：兼容 Rollup 插件生态系统</li>
              </ul>
              
              <h3>在本项目中的应用</h3>
              <p>System A 和 登录系统 使用 Vite 作为构建工具，具有以下特点：</p>
              <ul>
                <li>快速的开发体验</li>
                <li>轻量级的打包输出</li>
                <li>适合纯前端应用</li>
                <li>简单的配置和维护</li>
              </ul>
              
              <h3>Vite 最佳实践</h3>
              <ul>
                <li>合理使用插件，避免过度配置</li>
                <li>利用环境变量管理不同环境的配置</li>
                <li>使用 TypeScript 提升开发体验</li>
                <li>配置合适的代理解决开发环境跨域问题</li>
              </ul>
            </div>
          ) : (
            <div className="tab-content">
              <h2>Next.js 简介</h2>
              <p>Next.js 是 React 生态中最流行的全栈框架，提供了服务器端渲染(SSR)、静态站点生成(SSG)、API 路由等企业级功能。</p>
              
              <h3>Next.js 的核心特性</h3>
              <ul>
                <li><strong>服务器端渲染(SSR)</strong>：提升首屏加载速度和SEO</li>
                <li><strong>静态站点生成(SSG)</strong>：构建时预渲染页面</li>
                <li><strong>增量静态再生(ISR)</strong>：在后台更新静态页面</li>
                <li><strong>API 路由</strong>：在同一个项目中编写后端API</li>
                <li><strong>图像优化</strong>：自动优化图片大小和格式</li>
                <li><strong>国际化支持</strong>：多语言路由和内容翻译</li>
                <li><strong>中间件</strong>：在请求处理过程中执行代码</li>
              </ul>
              
              <h3>在本项目中的应用</h3>
              <p>System B 使用 Next.js 框架，具有以下特点：</p>
              <ul>
                <li>支持 SSR 和 SSG，提升SEO效果</li>
                <li>内置 API 路由功能</li>
                <li>丰富的优化功能（图片优化、字体优化等）</li>
                <li>适合需要服务端功能的全栈应用</li>
              </ul>
              
              <h3>Next.js 最佳实践</h3>
              <ul>
                <li>根据页面特性选择合适的渲染方式(SSR/SSG/CSR)</li>
                <li>合理使用 ISR 提升性能</li>
                <li>充分利用中间件处理鉴权和日志</li>
                <li>使用 Image 组件优化图片加载</li>
                <li>合理组织 API 路由结构</li>
              </ul>
            </div>
          )}
        </div>
      </div>
      
      {/* 添加样式 */}
      <style jsx>{`
        .tabs {
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 20px;
          border-bottom: 1px solid #ddd;
        }
        
        .tab {
          padding: 8px 16px;
          cursor: pointer;
          background-color: #f5f5f5;
          border: 1px solid #ddd;
          border-bottom: none;
          margin-right: 2px;
          margin-bottom: 2px;
          border-radius: 5px 5px 0 0;
          font-size: 0.9rem;
        }
        
        .tab.active {
          background-color: #007bff;
          color: white;
        }
        
        .tab-content {
          padding: 20px 0;
        }
        
        pre {
          background-color: #f8f9fa;
          border: 1px solid #dee2e6;
          border-radius: 4px;
          padding: 12px;
          overflow-x: auto;
        }
        
        ol, ul {
          margin-bottom: 1rem;
        }
        
        li {
          margin-bottom: 0.5rem;
        }
        
        .test-case {
          margin-bottom: 20px;
        }
        
        .message {
          padding: 1rem;
          margin-bottom: 1rem;
          border-radius: 4px;
        }
        
        .message.success {
          background-color: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }
        
        .message.error {
          background-color: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }
        
        .form-group {
          margin-bottom: 1rem;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: bold;
        }
        
        .form-control {
          width: 100%;
          padding: 0.375rem 0.75rem;
          font-size: 1rem;
          line-height: 1.5;
          color: #495057;
          background-color: #fff;
          background-clip: padding-box;
          border: 1px solid #ced4da;
          border-radius: 0.25rem;
          transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }
        
        .btn {
          display: inline-block;
          font-weight: 400;
          text-align: center;
          white-space: nowrap;
          vertical-align: middle;
          user-select: none;
          border: 1px solid transparent;
          padding: 0.375rem 0.75rem;
          font-size: 1rem;
          line-height: 1.5;
          border-radius: 0.25rem;
          transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }
        
        .btn-primary {
          color: #fff;
          background-color: #007bff;
          border-color: #007bff;
        }
        
        .btn-primary:hover {
          color: #fff;
          background-color: #0069d9;
          border-color: #0062cc;
        }
        
        .btn-secondary {
          color: #fff;
          background-color: #6c757d;
          border-color: #6c757d;
        }
        
        .btn-secondary:hover {
          color: #fff;
          background-color: #5a6268;
          border-color: #545b62;
        }
        
        .users-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 1rem;
        }
        
        .users-table th,
        .users-table td {
          border: 1px solid #dee2e6;
          padding: 0.75rem;
          text-align: left;
        }
        
        .users-table th {
          background-color: #f8f9fa;
          font-weight: bold;
        }
        
        .users-table tr:nth-child(even) {
          background-color: #f8f9fa;
        }
        
        .users-table tr:hover {
          background-color: #e9ecef;
        }
        
        .profile-field {
          display: flex;
          margin-bottom: 1rem;
        }
        
        .profile-field strong {
          width: 100px;
          margin-right: 1rem;
        }
        
        .profile-field span {
          flex: 1;
        }
      `}</style>
    </Layout>
  );
};

export default SystemOverviewPage;
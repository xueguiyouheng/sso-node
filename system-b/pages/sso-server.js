import React from 'react';
import Layout from '../components/Layout';

const SSOServerPage = () => {
  return (
    <Layout activeMenu="sso">
      <div className="content">
        <h1>SSO服务器 介绍</h1>
        
        <div className="protected-content">
          <h2>系统特点</h2>
          <ul>
            <li><strong>中央认证服务</strong>：为所有系统提供统一的认证服务</li>
            <li><strong>会话管理</strong>：集中管理所有用户的会话状态</li>
            <li><strong>多数据库支持</strong>：MongoDB存储用户数据，MySQL存储会话数据</li>
            <li><strong>RESTful API</strong>：提供标准化的认证API接口</li>
            <li><strong>跨域支持</strong>：支持多个不同域的系统集成</li>
          </ul>
          
          <h2>技术架构</h2>
          <ul>
            <li><strong>后端框架</strong>：Node.js + Express</li>
            <li><strong>会话管理</strong>：express-session</li>
            <li><strong>数据库</strong>：MongoDB (Mongoose) + MySQL</li>
            <li><strong>跨域支持</strong>：CORS中间件</li>
            <li><strong>环境配置</strong>：dotenv</li>
          </ul>
          
          <h2>核心功能</h2>
          <ul>
            <li><strong>用户认证</strong>：验证用户凭据并创建会话</li>
            <li><strong>会话管理</strong>：创建、维护和销毁用户会话</li>
            <li><strong>令牌验证</strong>：验证认证令牌的有效性</li>
            <li><strong>用户管理</strong>：存储和检索用户信息</li>
            <li><strong>单点登出</strong>：清除会话实现统一登出</li>
          </ul>
          
          <h2>API接口</h2>
          <ul>
            <li><code>POST /api/auth/login</code> - 用户登录认证</li>
            <li><code>POST /api/auth/logout</code> - 用户登出</li>
            <li><code>GET /api/auth/status</code> - 检查认证状态</li>
            <li><code>GET /api/auth/validate</code> - 验证令牌</li>
            <li><code>GET /api/user/:id</code> - 获取用户信息</li>
          </ul>
          
          <h2>数据库设计</h2>
          <h3>MongoDB (用户数据)</h3>
          <ul>
            <li><strong>集合名称</strong>：users</li>
            <li><strong>字段</strong>：username, password, email, createdAt</li>
            <li><strong>用途</strong>：存储用户基本信息</li>
          </ul>
          
          <h3>MySQL (会话数据)</h3>
          <ul>
            <li><strong>表名</strong>：sessions</li>
            <li><strong>字段</strong>：session_id, expires, data</li>
            <li><strong>用途</strong>：存储用户会话信息</li>
          </ul>
          
          <h2>访问地址</h2>
          <p>SSO服务器运行在端口3001上，API基础地址：<a href="http://localhost:3001/api" target="_blank" rel="noopener noreferrer">http://localhost:3001/api</a></p>
          
          <h2>安全特性</h2>
          <ul>
            <li><strong>会话安全</strong>：安全的会话管理和过期机制</li>
            <li><strong>CORS策略</strong>：限制允许访问的域名</li>
            <li><strong>HTTPS支持</strong>：生产环境中支持安全传输</li>
            <li><strong>输入验证</strong>：严格的API输入验证</li>
            <li><strong>错误处理</strong>：安全的错误信息返回机制</li>
          </ul>
          
          <h2>SSO服务实现过程和原理详解</h2>
          
          <h3>1. 整体架构概述</h3>
          <p>SSO（Single Sign-On）服务器是整个架构的核心认证服务，负责处理所有系统的用户认证请求。它采用基于会话的认证机制，通过集中管理用户会话来实现单点登录功能。</p>
          
          <h4>核心组件</h4>
          <ul>
            <li><strong>Express.js服务器</strong>：提供RESTful API接口</li>
            <li><strong>MongoDB数据库</strong>：存储用户基本信息</li>
            <li><strong>MySQL数据库</strong>：存储会话数据</li>
            <li><strong>express-session</strong>：会话管理中间件</li>
            <li><strong>CORS中间件</strong>：处理跨域请求</li>
          </ul>
          
          <h3>2. 技术实现细节</h3>
          
          <h4>会话管理机制</h4>
          <p>会话管理是SSO的核心机制，通过在服务器端存储会话数据，客户端只保存会话ID（通过cookie），实现了安全的认证状态管理。</p>
          
          <h4>数据库存储设计</h4>
          <ol>
            <li><strong>MongoDB (用户数据)</strong>：
              <ul>
                <li>集合：users</li>
                <li>字段：username, password, email, createdAt</li>
                <li>用途：持久化存储用户基本信息</li>
              </ul>
            </li>
            <li><strong>MySQL (会话数据)</strong>：
              <ul>
                <li>表：sessions</li>
                <li>字段：session_id, expires, data</li>
                <li>用途：存储临时会话信息</li>
              </ul>
            </li>
          </ol>
          
          <h4>跨域资源共享(CORS)</h4>
          <p>CORS配置允许指定的前端应用（System A, 登录系统, System B）访问SSO服务，并且允许携带凭证信息（cookies）。</p>
          
          <h3>3. 核心API接口实现</h3>
          
          <h4>登录接口 (/api/auth/login)</h4>
          <p>该接口验证用户凭据，如果验证成功则创建会话并返回用户信息。</p>
          
          <h4>认证状态检查接口 (/api/auth/status)</h4>
          <p>该接口检查当前用户的认证状态，如果已认证则返回用户信息。</p>
          
          <h4>登出接口 (/api/auth/logout)</h4>
          <p>该接口销毁用户的会话并清除相关cookie。</p>
          
          <h3>4. SSO工作原理</h3>
          
          <h4>单点登录流程</h4>
          <ol>
            <li><strong>用户访问受保护系统</strong>（如System A）</li>
            <li><strong>系统检查认证状态</strong>：通过<code>/api/auth/status</code>检查用户是否已登录</li>
            <li><strong>未认证用户重定向</strong>：重定向到登录系统（http://localhost:3002）</li>
            <li><strong>用户输入凭据</strong>：在登录页面输入用户名和密码</li>
            <li><strong>认证请求</strong>：登录系统向SSO服务器发送<code>/api/auth/login</code>请求</li>
            <li><strong>创建会话</strong>：SSO服务器验证凭据，创建会话并返回成功响应</li>
            <li><strong>重定向回原系统</strong>：登录系统将用户重定向回原始系统</li>
            <li><strong>验证令牌</strong>：原始系统再次调用<code>/api/auth/status</code>验证用户状态</li>
            <li><strong>显示受保护内容</strong>：认证成功后显示受保护内容</li>
          </ol>
          
          <h4>单点登出流程</h4>
          <ol>
            <li><strong>用户点击登出</strong>：在任一系统中点击登出按钮</li>
            <li><strong>发送登出请求</strong>：系统向SSO服务器发送<code>/api/auth/logout</code>请求</li>
            <li><strong>销毁会话</strong>：SSO服务器销毁用户会话并清除cookie</li>
            <li><strong>返回登录页面</strong>：系统重定向到登录页面</li>
            <li><strong>全局生效</strong>：用户在所有系统中都被视为已登出</li>
          </ol>
          
          <h3>5. 安全特性</h3>
          
          <h4>会话安全</h4>
          <ul>
            <li>使用加密的会话密钥保护会话数据</li>
            <li>设置合理的会话过期时间（24小时）</li>
            <li>登出时彻底销毁会话数据</li>
          </ul>
          
          <h4>跨域安全</h4>
          <ul>
            <li>严格限制允许访问的域名</li>
            <li>使用credentials: true确保cookie正确传递</li>
            <li>在生产环境中启用secure cookie</li>
          </ul>
          
          <h4>数据安全</h4>
          <ul>
            <li>密码在MongoDB中明文存储（演示用途，在生产环境中应使用哈希）</li>
            <li>敏感信息不会在错误响应中泄露</li>
            <li>输入验证防止恶意数据注入</li>
          </ul>
          
          <h3>6. 部署和运行</h3>
          
          <h4>环境配置</h4>
          <p>需要配置以下环境变量：</p>
          <ul>
            <li>PORT=3001</li>
            <li>SESSION_SECRET=sso_secret_key</li>
            <li>DB_HOST=localhost</li>
            <li>DB_USER=root</li>
            <li>DB_PASSWORD=</li>
            <li>DB_NAME=sso_db</li>
            <li>MONGO_URI=mongodb://localhost:27017/sso_db</li>
          </ul>
          
          <h4>启动命令</h4>
          <pre>
            cd sso-server
            npm install
            npm run dev
          </pre>
          <p>服务器将在端口3001上运行，提供API服务给所有集成的系统。</p>
          
          <h3>7. 扩展性考虑</h3>
          
          <h4>性能优化</h4>
          <ul>
            <li>可以使用Redis替代MySQL存储会话数据以提高性能</li>
            <li>可以添加缓存层减少数据库查询</li>
            <li>可以实现负载均衡支持高并发</li>
          </ul>
          
          <h4>安全增强</h4>
          <ul>
            <li>实现JWT令牌机制替代会话</li>
            <li>添加多因素认证支持</li>
            <li>实现OAuth2集成第三方登录</li>
          </ul>
          
          <h4>功能扩展</h4>
          <ul>
            <li>添加用户角色和权限管理</li>
            <li>实现密码重置功能</li>
            <li>添加用户个人资料管理</li>
          </ul>
          
          <h3>8. 用户个人资料管理</h3>
          <p>SSO服务器现在支持用户个人资料管理功能，允许用户更新他们的个人信息。</p>
          
          <h4>新增API接口</h4>
          <ul>
            <li><code>PUT /api/user/:id</code> - 更新用户个人资料</li>
            <li><code>PUT /api/user/:id/password</code> - 更改用户密码</li>
          </ul>
          
          <h4>个人资料字段</h4>
          <ul>
            <li><strong>firstName</strong>：名字</li>
            <li><strong>lastName</strong>：姓氏</li>
            <li><strong>email</strong>：电子邮件</li>
            <li><strong>phone</strong>：电话号码</li>
            <li><strong>avatar</strong>：头像URL</li>
            <li><strong>bio</strong>：个人简介</li>
          </ul>
          
          <h4>安全措施</h4>
          <ul>
            <li>用户只能更新自己的个人资料</li>
            <li>密码更改需要验证当前密码</li>
            <li>所有更新操作都需要有效的会话认证</li>
          </ul>
          
          <p>这就是SSO服务的完整实现过程和工作原理。通过这种架构，用户只需登录一次就可以访问所有集成的系统，大大提升了用户体验和安全性。</p>
        </div>
      </div>
    </Layout>
  );
};

export default SSOServerPage;
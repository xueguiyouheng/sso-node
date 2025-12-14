import React from 'react';
import Layout from '../components/Layout';

const TestCases = () => {
  return (
    <Layout activeMenu="test-cases">
      <div className="content">
        <h1>SSO系统API测试用例文档</h1>
        
        <div className="protected-content">
          <h2>概述</h2>
          <p>本文档包含了SSO系统的所有API接口测试用例，涵盖了用户注册、登录、JWT认证、用户信息管理等功能。</p>
          
          <h2>测试环境</h2>
          <ul>
            <li>SSO服务器地址: http://localhost:3001</li>
            <li>测试工具: curl命令行工具</li>
            <li>数据库: MongoDB (用户数据), MySQL (会话数据)</li>
          </ul>
          
          <h2>API测试用例</h2>
          
          <div className="test-case">
            <h3>1. 用户注册接口</h3>
            <p><strong>接口:</strong> POST /api/auth/register</p>
            <p><strong>描述:</strong> 创建新用户账户</p>
            <p><strong>测试命令:</strong></p>
            <pre>
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '&#123;"username": "testuser", "password": "testpass", "email": "test@example.com"&#125;'
            </pre>
            <p><strong>预期响应:</strong></p>
            <pre>
&#123;
  "success": true,
  "userId": "用户ID",
  "username": "testuser",
  "message": "用户创建成功"
&#125;
            </pre>
          </div>
          
          <div className="test-case">
            <h3>2. 用户登录接口</h3>
            <p><strong>接口:</strong> POST /api/auth/login</p>
            <p><strong>描述:</strong> 用户登录并生成JWT令牌</p>
            <p><strong>测试命令:</strong></p>
            <pre>
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '&#123;"username": "testuser", "password": "testpass"&#125;' \
  -c cookie.txt
            </pre>
            <p><strong>预期响应:</strong></p>
            <pre>
&#123;
  "success": true,
  "userId": "用户ID",
  "username": "testuser",
  "message": "登录成功"
&#125;
            </pre>
          </div>
          
          <div className="test-case">
            <h3>3. 认证状态检查接口</h3>
            <p><strong>接口:</strong> GET /api/auth/status</p>
            <p><strong>描述:</strong> 检查用户当前认证状态</p>
            <p><strong>测试命令:</strong></p>
            <pre>
curl -X GET http://localhost:3001/api/auth/status -b cookie.txt
            </pre>
            <p><strong>预期响应 (已认证):</strong></p>
            <pre>
&#123;
  "authenticated": true,
  "userId": "用户ID",
  "username": "testuser"
&#125;
            </pre>
            <p><strong>预期响应 (未认证):</strong></p>
            <pre>
&#123;
  "authenticated": false
&#125;
            </pre>
          </div>
          
          <div className="test-case">
            <h3>4. 获取用户信息接口</h3>
            <p><strong>接口:</strong> GET /api/user/:id</p>
            <p><strong>描述:</strong> 获取指定用户的信息</p>
            <p><strong>测试命令:</strong></p>
            <pre>
curl -X GET http://localhost:3001/api/user/用户ID -b cookie.txt
            </pre>
            <p><strong>预期响应:</strong></p>
            <pre>
&#123;
  "id": "用户ID",
  "username": "testuser",
  "email": "test@example.com",
  "firstName": "名字",
  "lastName": "姓氏",
  "phone": "电话号码",
  "createdAt": "创建时间"
&#125;
            </pre>
          </div>
          
          <div className="test-case">
            <h3>5. 更新用户资料接口</h3>
            <p><strong>接口:</strong> PUT /api/user/:id</p>
            <p><strong>描述:</strong> 更新用户个人资料</p>
            <p><strong>测试命令:</strong></p>
            <pre>
curl -X PUT http://localhost:3001/api/user/用户ID \
  -H "Content-Type: application/json" \
  -d '&#123;"firstName": "张", "lastName": "三", "email": "zhangsan@example.com", "phone": "12345678901"&#125;' \
  -b cookie.txt
            </pre>
            <p><strong>预期响应:</strong></p>
            <pre>
&#123;
  "id": "用户ID",
  "username": "testuser",
  "email": "zhangsan@example.com",
  "firstName": "张",
  "lastName": "三",
  "phone": "12345678901",
  "createdAt": "创建时间"
&#125;
            </pre>
          </div>
          
          <div className="test-case">
            <h3>6. 更改密码接口</h3>
            <p><strong>接口:</strong> PUT /api/user/:id/password</p>
            <p><strong>描述:</strong> 更改用户密码</p>
            <p><strong>测试命令:</strong></p>
            <pre>
curl -X PUT http://localhost:3001/api/user/用户ID/password \
  -H "Content-Type: application/json" \
  -d '&#123;"currentPassword": "testpass", "newPassword": "newpass"&#125;' \
  -b cookie.txt
            </pre>
            <p><strong>预期响应:</strong></p>
            <pre>
&#123;
  "message": "密码更新成功"
&#125;
            </pre>
          </div>
          
          <div className="test-case">
            <h3>7. 用户登出接口</h3>
            <p><strong>接口:</strong> POST /api/auth/logout</p>
            <p><strong>描述:</strong> 用户登出，清除会话和JWT令牌</p>
            <p><strong>测试命令:</strong></p>
            <pre>
curl -X POST http://localhost:3001/api/auth/logout -b cookie.txt
            </pre>
            <p><strong>预期响应:</strong></p>
            <pre>
&#123;
  "success": true,
  "message": "登出成功"
&#125;
            </pre>
          </div>
          
          <h2>JWT令牌机制测试</h2>
          <p>JWT令牌通过HttpOnly Cookie自动传输，无需手动处理。</p>
          <p>令牌有效期: 24小时</p>
          
          <h2>错误情况测试</h2>
          <div className="test-case">
            <h3>错误用户名或密码</h3>
            <p><strong>预期响应:</strong></p>
            <pre>
&#123;
  "success": false,
  "message": "用户名或密码错误"
&#125;
            </pre>
          </div>
          
          <div className="test-case">
            <h3>无权限访问用户数据</h3>
            <p><strong>预期响应:</strong></p>
            <pre>
&#123;
  "error": "无权访问此用户数据"
&#125;
            </pre>
          </div>
          
          <div className="test-case">
            <h3>用户不存在</h3>
            <p><strong>预期响应:</strong></p>
            <pre>
&#123;
  "error": "用户不存在"
&#125;
            </pre>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .test-case {
          background-color: #f8f9fa;
          padding: 1rem;
          border-radius: 4px;
          border: 1px solid #dee2e6;
          margin-bottom: 1rem;
        }
        
        pre {
          background-color: #e9ecef;
          padding: 1rem;
          border-radius: 4px;
          overflow-x: auto;
        }
      `}</style>
    </Layout>
  );
};

export default TestCases;
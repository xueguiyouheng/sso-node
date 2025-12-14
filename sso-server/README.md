# SSO服务器

这是SSO架构的中央认证服务器，使用Node.js和Express构建。

## 功能特点

- 用户认证和会话管理
- 用于登录、注销和令牌验证的RESTful API
- MongoDB集成用于用户数据存储
- MySQL集成用于会话存储
- 支持跨域请求的CORS
- 个人资料管理支持

## 使用技术

- Node.js
- Express.js
- express-session用于会话管理
- MongoDB与Mongoose
- MySQL2用于会话存储
- dotenv用于环境配置

## API端点

- `POST /api/auth/login` - 用户认证并创建会话
- `POST /api/auth/logout` - 销毁用户会话
- `GET /api/auth/status` - 检查认证状态
- `GET /api/auth/validate` - 验证认证令牌
- `GET /api/user/:id` - 根据ID获取用户信息
- `PUT /api/user/:id` - 更新用户个人资料
- `PUT /api/user/:id/password` - 更改用户密码

## 环境变量

在根目录下创建一个`.env`文件，包含以下变量：

```
PORT=3001
SESSION_SECRET=your_session_secret
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=sso_database
MONGO_URI=mongodb://localhost:27017/sso_db
```

## 启动服务器

```bash
npm install
npm run dev
```

服务器将在端口3001上运行。

## 个人资料管理

SSO服务器现在支持个人资料管理功能，包括：

### 个人资料字段
- **firstName**: 名字
- **lastName**: 姓氏
- **email**: 电子邮件
- **phone**: 电话号码
- **avatar**: 头像URL
- **bio**: 个人简介

### 安全措施
- 用户只能更新自己的个人资料
- 密码更改需要验证当前密码
- 所有更新操作都需要有效的会话认证
- 数据验证防止恶意输入

### 扩展功能
- 支持用户注册时填写基本资料
- 提供完整的个人资料管理API
- 支持密码安全更改机制




<!-- docker exec -it sso-mysql mysql -u sso_user -psso_password -e "USE sso_system; DESCRIBE sessions;" -->

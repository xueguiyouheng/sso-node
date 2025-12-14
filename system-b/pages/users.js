import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import AuthService from '../services/authService';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
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
      showMessage('获取用户列表失败: ' + (error.response?.data?.error || '未知错误'), 'error');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  if (loading) {
    return (
      <Layout activeMenu="users">
        <div className="content">
          <h1>用户列表</h1>
          <div>加载中...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout activeMenu="users">
      <div className="content">
        <h1>用户列表</h1>
        
        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}

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
      </div>
      
      <style jsx>{`
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
      `}</style>
    </Layout>
  );
};

export default UsersPage;
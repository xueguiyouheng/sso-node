import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import AuthService from '../services/authService';

const DockerCommandsPage = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await AuthService.checkAuthStatus();
      if (response.authenticated) {
        setAuthenticated(true);
      } else {
        // Redirect to login page
        window.location.href = 'http://localhost:3002';
      }
    } catch (error) {
      console.error('Authentication check failed:', error);
      // Redirect to login page on error
      window.location.href = 'http://localhost:3002';
    }
  };

  if (!authenticated) {
    return (
      <Layout activeMenu="docker">
        <div className="content">
          <h1>Docker命令</h1>
          <div>正在验证身份...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout activeMenu="docker">
      <div className="content">
        <h1>Docker命令</h1>
        
        <div className="protected-content">
          <p>以下是用于查看SSO系统数据库容器中数据的Docker命令：</p>
          
          <div className="command-section">
            <h2>MySQL容器操作命令 (sso-mysql)</h2>
            
            <div className="command-item">
              <h3>1. 查看MySQL容器中的表</h3>
              <pre>
                docker exec sso-mysql mysql -u root -prootpassword -e "SHOW TABLES;" sso_system
              </pre>
              <p>说明：列出sso_system数据库中的所有表</p>
            </div>
            
            <div className="command-item">
              <h3>2. 查看MySQL表字段</h3>
              <pre>
                docker exec sso-mysql mysql -u root -prootpassword -e "DESCRIBE sessions;" sso_system
              </pre>
              <p>说明：显示sessions表的字段结构</p>
            </div>
            
            <div className="command-item">
              <h3>3. 查看MySQL表数据</h3>
              <pre>
                docker exec sso-mysql mysql -u root -prootpassword -e "SELECT * FROM sessions LIMIT 10;" sso_system
              </pre>
              <p>说明：查询sessions表中的前10条数据</p>
            </div>
            
            <div className="command-item">
              <h3>4. 查看MySQL表数据统计</h3>
              <pre>
                docker exec sso-mysql mysql -u root -prootpassword -e "SELECT COUNT(*) FROM sessions;" sso_system
              </pre>
              <p>说明：统计sessions表中的记录数量</p>
            </div>
          </div>
          
          <div className="command-section">
            <h2>MongoDB容器操作命令 (sso-mongodb)</h2>
            
            <div className="command-item">
              <h3>5. 查看MongoDB中的集合(表)</h3>
              <pre>
                docker exec sso-mongodb mongosh sso-system --eval "db.getCollectionNames()"
              </pre>
              <p>说明：列出sso-system数据库中的所有集合</p>
            </div>
            
            <div className="command-item">
              <h3>6. 查看MongoDB集合字段</h3>
              <pre>
                docker exec sso-mongodb mongosh sso-system --eval "db.users.findOne()"
              </pre>
              <p>说明：显示users集合中第一个文档的字段结构</p>
            </div>
            
            <div className="command-item">
              <h3>7. 查看MongoDB集合数据</h3>
              <pre>
                docker exec sso-mongodb mongosh sso-system --eval "db.users.find().limit(10).pretty()"
              </pre>
              <p>说明：查询users集合中的前10条数据，并以美观格式显示</p>
            </div>
            
            <div className="command-item">
              <h3>8. 查看MongoDB集合数据统计</h3>
              <pre>
                docker exec sso-mongodb mongosh sso-system --eval "db.users.countDocuments()"
              </pre>
              <p>说明：统计users集合中的文档数量</p>
            </div>
          </div>
          
          <div className="command-section">
            <h2>数据导出脚本</h2>
            
            <div className="command-item">
              <h3>9. 导出MongoDB数据到JSON文件</h3>
              <pre>
                cd data-export/scripts
                ./export-mongo-data.sh
              </pre>
              <p>说明：执行脚本将MongoDB中的用户数据导出为JSON格式文件</p>
              <p>功能：</p>
              <ul>
                <li>每次执行创建带时间戳的新JSON文件</li>
                <li>文件保存在项目目录下的 data-export/exports/mongo_exports 文件夹中</li>
                <li>自动使用Docker容器中的mongoexport工具</li>
                <li>显示导出文件大小和数据预览</li>
              </ul>
            </div>
            
            <div className="command-item">
              <h3>10. 导出MySQL数据到JSON文件</h3>
              <pre>
                cd data-export/scripts
                ./export-mysql-data.sh
              </pre>
              <p>说明：执行脚本将MySQL中的会话数据导出为JSON格式文件</p>
              <p>功能：</p>
              <ul>
                <li>每次执行创建带时间戳的新JSON文件</li>
                <li>文件保存在项目目录下的 data-export/exports/mysql_exports 文件夹中</li>
                <li>自动使用Docker容器中的mysql工具</li>
                <li>包含会话ID、过期时间戳和会话数据</li>
                <li>显示导出文件大小和数据预览</li>
              </ul>
            </div>
            
            <div className="command-item">
              <h3>11. 快速查看MongoDB数据</h3>
              <pre>
                docker exec sso-mongodb mongosh sso-system --eval "db.users.find().limit(10).pretty()"
              </pre>
              <p>说明：直接在终端显示MongoDB中的用户数据，不保存到文件</p>
            </div>
          </div>
          
          <div className="command-section">
            <h2>通用Docker操作命令</h2>
            
            <div className="command-item">
              <h3>查看容器状态</h3>
              <pre>
                docker ps
              </pre>
              <p>说明：列出所有正在运行的容器</p>
            </div>
            
            <div className="command-item">
              <h3>查看容器日志</h3>
              <pre>
                # MySQL容器日志
                docker logs sso-mysql
                
                # MongoDB容器日志
                docker logs sso-mongodb
              </pre>
              <p>说明：查看指定容器的运行日志</p>
            </div>
            
            <div className="command-item">
              <h3>进入容器bash终端</h3>
              <pre>
                # 进入MySQL容器
                docker exec -it sso-mysql bash
                
                # 进入MongoDB容器
                docker exec -it sso-mongodb bash
              </pre>
              <p>说明：交互式进入容器内部bash终端</p>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .command-section {
          margin-bottom: 2rem;
          padding: 1rem;
          border: 1px solid #dee2e6;
          border-radius: 4px;
          background-color: #f8f9fa;
        }
        
        .command-item {
          margin-bottom: 1.5rem;
        }
        
        .command-item:last-child {
          margin-bottom: 0;
        }
        
        .command-item h3 {
          margin-top: 0;
          margin-bottom: 0.5rem;
          color: #495057;
        }
        
        pre {
          background-color: #e9ecef;
          padding: 1rem;
          border-radius: 4px;
          overflow-x: auto;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }
        
        p {
          margin-top: 0.25rem;
          margin-bottom: 0.25rem;
          color: #6c757d;
        }
        
        ul {
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
          padding-left: 1.5rem;
        }
        
        li {
          margin-bottom: 0.25rem;
        }
      `}</style>
    </Layout>
  );
};

export default DockerCommandsPage;
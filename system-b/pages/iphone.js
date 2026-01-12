import React, { useState, useEffect } from 'react';
import AuthService from '../services/authService';
import Layout from '../components/Layout';

export default function iPhonePage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await AuthService.checkAuthStatus();
      if (response.authenticated) {
        setAuthenticated(true);
        setUser({
          id: response.userId,
          username: response.username
        });
      }
    } catch (error) {
      console.error('Authentication check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout activeMenu="iphone">
        <div className="container">Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout activeMenu="iphone">
      <div className="iphone-page">
        <section className="hero-section">
          <div className="hero-content">
            <h1>Pro. Beyond.</h1>
            <p>超级强大的芯片。革命性的摄像头系统。令人难以置信的耐用性。iPhone Pro 改变一切。</p>
            <div className="cta-buttons">
              <button className="primary-button">立即购买</button>
              <button className="secondary-button">了解更多</button>
            </div>
          </div>
        </section>

        <section className="feature-section">
          <div className="feature-card">
            <h2>超瓷晶面板</h2>
            <p>正面是最坚固的智能手机玻璃，背面是抗跌落性能提升 4 倍的玻璃。</p>
          </div>
          <div className="feature-card">
            <h2>陶瓷屏蔽</h2>
            <p>创新的纳米晶体技术，让不锈钢拥有精钢般的强度。</p>
          </div>
          <div className="feature-card">
            <h2>全天候电池</h2>
            <p>最长可达 28 小时视频播放，满足一整天所需。</p>
          </div>
        </section>

        <section className="camera-section">
          <h2>专业级摄影系统</h2>
          <p>突破想象的专业级相机，让每一拍都达到专业水准。</p>
          <div className="camera-grid">
            <div className="camera-item">
              <h3>超广角</h3>
              <p>ƒ/1.8 光圈</p>
            </div>
            <div className="camera-item">
              <h3>广角</h3>
              <p>ƒ/1.5 光圈</p>
            </div>
            <div className="camera-item">
              <h3>长焦</h3>
              <p>3 倍光学变焦</p>
            </div>
          </div>
        </section>

        <section className="display-section">
          <h2>超视网膜 XDR 显示屏</h2>
          <p>6.7 英寸超视网膜 XDR 显示屏，带来惊艳视觉体验。</p>
          <div className="specifications">
            <div className="spec-item">
              <h3>分辨率</h3>
              <p>2796 x 1284 像素</p>
            </div>
            <div className="spec-item">
              <h3>亮度</h3>
              <p>最高 1000 尼特</p>
            </div>
            <div className="spec-item">
              <h3>对比度</h3>
              <p>2,000,000:1</p>
            </div>
          </div>
        </section>

        <section className="security-section">
          <h2>面容 ID</h2>
          <p>先进的面部识别技术，安全便捷的解锁方式。</p>
          <div className="security-features">
            <div className="security-item">
              <h3>安全性</h3>
              <p>1 万份 1 的误识概率</p>
            </div>
            <div className="security-item">
              <h3>便捷性</h3>
              <p>抬腕即可解锁</p>
            </div>
          </div>
        </section>

        <style jsx>{`
          .iphone-page {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 100%;
            margin: 0 auto;
            padding: 0;
          }
          
          .hero-section {
            background: linear-gradient(135deg, #000428, #004e92);
            color: white;
            padding: 100px 20px;
            text-align: center;
          }
          
          .hero-content h1 {
            font-size: 4rem;
            font-weight: 600;
            margin-bottom: 20px;
          }
          
          .hero-content p {
            font-size: 1.5rem;
            margin-bottom: 30px;
            opacity: 0.9;
          }
          
          .cta-buttons {
            display: flex;
            justify-content: center;
            gap: 20px;
            flex-wrap: wrap;
          }
          
          .primary-button, .secondary-button {
            padding: 15px 30px;
            border-radius: 30px;
            font-size: 1.2rem;
            cursor: pointer;
            border: none;
          }
          
          .primary-button {
            background: #0071e3;
            color: white;
          }
          
          .secondary-button {
            background: transparent;
            color: white;
            border: 1px solid white;
          }
          
          .feature-section {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            padding: 80px 20px;
            background: #f5f5f7;
          }
          
          .feature-card {
            background: white;
            padding: 40px 30px;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
            text-align: center;
          }
          
          .feature-card h2 {
            font-size: 1.8rem;
            margin-bottom: 15px;
            color: #1d1d1f;
          }
          
          .feature-card p {
            font-size: 1.1rem;
            color: #86868b;
            line-height: 1.6;
          }
          
          .camera-section, .display-section, .security-section {
            padding: 80px 20px;
            text-align: center;
            background: white;
          }
          
          .camera-section h2, .display-section h2, .security-section h2 {
            font-size: 2.5rem;
            margin-bottom: 20px;
            color: #1d1d1f;
          }
          
          .camera-section p, .display-section p, .security-section p {
            font-size: 1.3rem;
            color: #86868b;
            margin-bottom: 40px;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
          }
          
          .camera-grid, .specifications {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
            max-width: 900px;
            margin: 0 auto;
          }
          
          .camera-item, .spec-item {
            background: #f5f5f7;
            padding: 30px;
            border-radius: 20px;
          }
          
          .camera-item h3, .spec-item h3 {
            font-size: 1.4rem;
            margin-bottom: 10px;
            color: #1d1d1f;
          }
          
          .camera-item p, .spec-item p {
            font-size: 1.1rem;
            color: #86868b;
            margin: 0;
          }
          
          .security-features {
            display: flex;
            justify-content: center;
            gap: 50px;
            flex-wrap: wrap;
            max-width: 800px;
            margin: 0 auto;
          }
          
          .security-item {
            flex: 1;
            min-width: 250px;
            background: #f5f5f7;
            padding: 30px;
            border-radius: 20px;
          }
          
          @media (max-width: 768px) {
            .hero-content h1 {
              font-size: 2.5rem;
            }
            
            .hero-content p {
              font-size: 1.2rem;
            }
            
            .feature-section {
              padding: 50px 15px;
            }
            
            .camera-section h2, .display-section h2, .security-section h2 {
              font-size: 2rem;
            }
            
            .camera-section p, .display-section p, .security-section p {
              font-size: 1.1rem;
            }
          }
        `}</style>
      </div>
    </Layout>
  );
}
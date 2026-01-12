import React, { useState, useEffect } from 'react';
import AuthService from '../services/authService';
import Layout from '../components/Layout';

export default function ProductShowcase() {
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
      <Layout activeMenu="product-showcase">
        <div className="container">Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout activeMenu="product-showcase">
      <div className="showcase-page">
        <section className="hero-banner">
          <div className="hero-content">
            <h1>全新体验</h1>
            <p>创新科技，卓越设计，为您带来前所未有的体验</p>
            <div className="hero-actions">
              <button className="btn-primary">立即探索</button>
              <button className="btn-secondary">了解更多</button>
            </div>
          </div>
        </section>

        <section className="product-features">
          <div className="feature-row">
            <div className="feature-image">
              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMzMzIi8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIEZha2U8L3RleHQ+Cjwvc3ZnPgo=" alt="产品展示" />
            </div>
            <div className="feature-text">
              <h2>卓越性能</h2>
              <p>采用最新技术，提供无与伦比的性能表现。无论是日常使用还是高强度任务，都能轻松应对。</p>
              <ul>
                <li>高速处理器</li>
                <li>大容量内存</li>
                <li>持久续航能力</li>
                <li>智能散热系统</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="specs-section">
          <h2>详细规格</h2>
          <div className="specs-grid">
            <div className="spec-card">
              <h3>显示屏</h3>
              <p>高分辨率显示屏，色彩鲜艳逼真</p>
            </div>
            <div className="spec-card">
              <h3>摄像头</h3>
              <p>专业级拍摄系统，捕捉每一个精彩瞬间</p>
            </div>
            <div className="spec-card">
              <h3>电池</h3>
              <p>长效续航，支持快充技术</p>
            </div>
            <div className="spec-card">
              <h3>安全</h3>
              <p>先进生物识别技术，保障数据安全</p>
            </div>
          </div>
        </section>

        <section className="gallery-section">
          <h2>产品图库</h2>
          <div className="image-gallery">
            <div className="gallery-item">
              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjNDQ0Ii8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlByb2R1Y3QgSW1hZ2U8L3RleHQ+Cjwvc3ZnPgo=" alt="产品图片1" />
            </div>
            <div className="gallery-item">
              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjNTU1Ii8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlByb2R1Y3QgSW1hZ2U8L3RleHQ+Cjwvc3ZnPgo=" alt="产品图片2" />
            </div>
            <div className="gallery-item">
              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjNjY2Ii8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlByb2R1Y3QgSW1hZ2U8L3RleHQ+Cjwvc3ZnPgo=" alt="产品图片3" />
            </div>
          </div>
        </section>

        <style jsx>{`
          .showcase-page {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            max-width: 100%;
            margin: 0 auto;
          }
          
          .hero-banner {
            background: linear-gradient(135deg, #1a1a1a, #2c2c2c);
            color: white;
            padding: 120px 20px;
            text-align: center;
            position: relative;
          }
          
          .hero-content h1 {
            font-size: 4rem;
            font-weight: 700;
            margin-bottom: 20px;
            letter-spacing: -0.02em;
          }
          
          .hero-content p {
            font-size: 1.5rem;
            margin-bottom: 40px;
            opacity: 0.9;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
          }
          
          .hero-actions {
            display: flex;
            justify-content: center;
            gap: 20px;
            flex-wrap: wrap;
          }
          
          .btn-primary, .btn-secondary {
            padding: 15px 40px;
            border-radius: 30px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            border: none;
          }
          
          .btn-primary {
            background: #0071e3;
            color: white;
          }
          
          .btn-secondary {
            background: transparent;
            color: white;
            border: 1px solid white;
          }
          
          .product-features {
            padding: 100px 20px;
            max-width: 1200px;
            margin: 0 auto;
          }
          
          .feature-row {
            display: flex;
            align-items: center;
            gap: 50px;
            margin-bottom: 100px;
          }
          
          .feature-image img {
            width: 100%;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          }
          
          .feature-text {
            flex: 1;
          }
          
          .feature-text h2 {
            font-size: 2.5rem;
            margin-bottom: 20px;
            color: #1d1d1f;
          }
          
          .feature-text p {
            font-size: 1.2rem;
            line-height: 1.7;
            color: #86868b;
            margin-bottom: 30px;
          }
          
          .feature-text ul {
            list-style: none;
            padding: 0;
          }
          
          .feature-text li {
            font-size: 1.1rem;
            padding: 10px 0;
            border-bottom: 1px solid #eee;
            color: #333;
          }
          
          .feature-text li:last-child {
            border-bottom: none;
          }
          
          .specs-section {
            padding: 100px 20px;
            background: #f5f5f7;
            text-align: center;
          }
          
          .specs-section h2 {
            font-size: 2.5rem;
            margin-bottom: 60px;
            color: #1d1d1f;
          }
          
          .specs-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
            max-width: 1000px;
            margin: 0 auto;
          }
          
          .spec-card {
            background: white;
            padding: 40px 30px;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          }
          
          .spec-card h3 {
            font-size: 1.5rem;
            margin-bottom: 15px;
            color: #1d1d1f;
          }
          
          .spec-card p {
            font-size: 1.1rem;
            color: #86868b;
            line-height: 1.6;
          }
          
          .gallery-section {
            padding: 100px 20px;
            text-align: center;
          }
          
          .gallery-section h2 {
            font-size: 2.5rem;
            margin-bottom: 60px;
            color: #1d1d1f;
          }
          
          .image-gallery {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            max-width: 1100px;
            margin: 0 auto;
          }
          
          .gallery-item img {
            width: 100%;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          }
          
          @media (max-width: 768px) {
            .feature-row {
              flex-direction: column;
            }
            
            .hero-content h1 {
              font-size: 2.5rem;
            }
            
            .hero-content p {
              font-size: 1.2rem;
            }
            
            .btn-primary, .btn-secondary {
              width: 100%;
              max-width: 250px;
            }
            
            .specs-section h2, .gallery-section h2 {
              font-size: 2rem;
            }
          }
        `}</style>
      </div>
    </Layout>
  );
}
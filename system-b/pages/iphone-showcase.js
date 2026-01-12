import React, { useState, useEffect } from 'react';
import AuthService from '../services/authService';
import Layout from '../components/Layout';

export default function iPhoneShowcase() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeModel, setActiveModel] = useState('iphone15');
  const [activeColor, setActiveColor] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);

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

  const models = [
    {
      id: 'iphone15',
      name: 'iPhone 15',
      description: '超强性能，极致便携。',
      colors: [
        { name: '粉色', value: '#f4a7b9' },
        { name: '黄色', value: '#f5d05c' },
        { name: '绿色', value: '#a7d194' },
        { name: '蓝色', value: '#a5c8e1' },
        { name: '黑色', value: '#000000' }
      ],
      price: '¥5,999起',
      features: [
        { title: '超视网膜 XDR 显示屏', description: '6.1 英寸或 6.7 英寸，带来惊艳视觉体验。' },
        { title: '专业级摄影系统', description: '突破想象的专业级相机，让每一拍都达到专业水准。' },
        { title: '芯片性能', description: '强大性能，轻松应对各种任务和游戏。' },
        { title: '全天候电池', description: '最长可达 28 小时视频播放，满足一整天所需。' }
      ]
    },
    {
      id: 'iphone15pro',
      name: 'iPhone 15 Pro',
      description: '专业级性能，创新材质。',
      colors: [
        { name: '钛金属原色', value: '#d4af8b' },
        { name: '蓝色钛金属', value: '#5a7d9a' },
        { name: '白色钛金属', value: '#f5f5f5' },
        { name: '黑色钛金属', value: '#2d2d2d' }
      ],
      price: '¥7,999起',
      features: [
        { title: '超视网膜 XDR 显示屏', description: '6.1 英寸或 6.7 英寸 ProMotion 技术。' },
        { title: '专业级摄影系统', description: '三摄系统，支持 ProRAW 和 ProRes 录制。' },
        { title: 'A17 Pro 芯片', description: '为游戏和专业应用带来台式电脑级性能。' },
        { title: '钛金属设计', description: '更坚固，更轻盈，工艺更精湛。' }
      ]
    }
  ];

  if (loading) {
    return (
      <Layout activeMenu="iphone-showcase">
        <div className="container">Loading...</div>
      </Layout>
    );
  }

  const currentModel = models.find(m => m.id === activeModel);

  return (
    <Layout activeMenu="iphone-showcase">
      <div className="iphone-showcase-page">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1>{currentModel.name}</h1>
            <p>{currentModel.description}</p>
            <div className="hero-cta">
              <button className="cta-btn primary">选购</button>
              <button className="cta-btn secondary">了解更多 {'>'}</button>
            </div>
          </div>
        </section>

        {/* Model Selection */}
        <section className="model-selection">
          <div className="model-tabs">
            {models.map(model => (
              <button
                key={model.id}
                className={`tab-btn ${activeModel === model.id ? 'active' : ''}`}
                onClick={() => setActiveModel(model.id)}
              >
                {model.name}
              </button>
            ))}
          </div>
          <div className="model-info">
            <p className="price">{currentModel.price}</p>
          </div>
        </section>

        {/* Colors Section */}
        <section className="colors-section">
          <h2>颜色</h2>
          <div className="color-options">
            {currentModel.colors.map((color, index) => (
              <div 
                key={index} 
                className={`color-option ${activeColor === index ? 'active' : ''}`}
                onClick={() => setActiveColor(index)}
              >
                <div 
                  className="color-swatch" 
                  style={{ backgroundColor: color.value }}
                ></div>
                <span>{color.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="feature-nav">
            {currentModel.features.map((feature, index) => (
              <button
                key={index}
                className={`feature-nav-btn ${activeFeature === index ? 'active' : ''}`}
                onClick={() => setActiveFeature(index)}
              >
                {feature.title}
              </button>
            ))}
          </div>
          
          <div className="feature-display">
            <h3>{currentModel.features[activeFeature].title}</h3>
            <p>{currentModel.features[activeFeature].description}</p>
          </div>
        </section>

        {/* Tech Specs */}
        <section className="tech-specs">
          <h2>技术规格</h2>
          <div className="specs-grid">
            <div className="spec-item">
              <h4>显示屏</h4>
              <p>超视网膜 XDR 显示屏</p>
            </div>
            <div className="spec-item">
              <h4>摄像头</h4>
              <p>双摄系统或三摄系统</p>
            </div>
            <div className="spec-item">
              <h4>芯片</h4>
              <p>最新款高性能芯片</p>
            </div>
            <div className="spec-item">
              <h4>电池</h4>
              <p>全天候续航</p>
            </div>
            <div className="spec-item">
              <h4>存储</h4>
              <p>128GB / 256GB / 512GB / 1TB</p>
            </div>
            <div className="spec-item">
              <h4>防水</h4>
              <p>IP68 等级</p>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="footer-cta-section">
          <h2>准备好选购了吗？</h2>
          <p>前往商店选购或了解更多信息。</p>
          <div className="footer-cta-buttons">
            <button className="cta-btn primary">在线购买</button>
            <button className="cta-btn secondary">预约到店</button>
          </div>
        </section>

        <style jsx>{`
          .iphone-showcase-page {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            max-width: 100%;
            margin: 0 auto;
            background: #000;
            color: #fff;
          }
          
          .hero-section {
            background: linear-gradient(to bottom, #000 0%, #111 100%);
            padding: 100px 20px;
            text-align: center;
            position: relative;
            min-height: 70vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .hero-content h1 {
            font-size: 6rem;
            font-weight: 700;
            margin-bottom: 20px;
            letter-spacing: -0.03em;
          }
          
          .hero-content p {
            font-size: 2rem;
            margin-bottom: 40px;
            opacity: 0.8;
            font-weight: 300;
          }
          
          .hero-cta {
            display: flex;
            justify-content: center;
            gap: 20px;
            flex-wrap: wrap;
          }
          
          .cta-btn {
            padding: 12px 30px;
            border-radius: 30px;
            font-size: 1.2rem;
            font-weight: 600;
            cursor: pointer;
            border: none;
          }
          
          .cta-btn.primary {
            background: #0071e3;
            color: white;
          }
          
          .cta-btn.secondary {
            background: transparent;
            color: #0071e3;
            border: 1px solid #0071e3;
          }
          
          .model-selection {
            padding: 60px 20px;
            text-align: center;
            background: #f5f5f7;
            color: #000;
          }
          
          .model-tabs {
            display: flex;
            justify-content: center;
            gap: 30px;
            margin-bottom: 20px;
          }
          
          .tab-btn {
            padding: 10px 20px;
            background: transparent;
            border: none;
            font-size: 1.5rem;
            font-weight: 600;
            color: #86868b;
            cursor: pointer;
            border-bottom: 2px solid transparent;
            transition: all 0.3s ease;
          }
          
          .tab-btn.active {
            color: #000;
            border-bottom: 2px solid #000;
          }
          
          .price {
            font-size: 1.8rem;
            font-weight: 600;
            color: #000;
          }
          
          .colors-section {
            padding: 60px 20px;
            text-align: center;
            background: #fff;
            color: #000;
          }
          
          .colors-section h2 {
            font-size: 2.5rem;
            margin-bottom: 40px;
          }
          
          .color-options {
            display: flex;
            justify-content: center;
            gap: 30px;
            flex-wrap: wrap;
          }
          
          .color-option {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            cursor: pointer;
            padding: 15px;
            border-radius: 10px;
            transition: all 0.3s ease;
          }
          
          .color-option.active {
            background: #f5f5f7;
          }
          
          .color-swatch {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: 2px solid #ddd;
          }
          
          .features-section {
            padding: 80px 20px;
            background: #f5f5f7;
            color: #000;
          }
          
          .feature-nav {
            display: flex;
            justify-content: center;
            gap: 30px;
            flex-wrap: wrap;
            margin-bottom: 40px;
          }
          
          .feature-nav-btn {
            padding: 10px 20px;
            background: transparent;
            border: none;
            font-size: 1.2rem;
            font-weight: 600;
            color: #86868b;
            cursor: pointer;
            border-bottom: 2px solid transparent;
            transition: all 0.3s ease;
          }
          
          .feature-nav-btn.active {
            color: #000;
            border-bottom: 2px solid #000;
          }
          
          .feature-display {
            text-align: center;
            max-width: 800px;
            margin: 0 auto;
          }
          
          .feature-display h3 {
            font-size: 2rem;
            margin-bottom: 20px;
          }
          
          .feature-display p {
            font-size: 1.3rem;
            color: #86868b;
            line-height: 1.6;
          }
          
          .tech-specs {
            padding: 80px 20px;
            text-align: center;
            background: #fff;
            color: #000;
          }
          
          .tech-specs h2 {
            font-size: 2.5rem;
            margin-bottom: 50px;
          }
          
          .specs-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
            max-width: 1200px;
            margin: 0 auto;
          }
          
          .spec-item {
            background: #f5f5f7;
            padding: 30px;
            border-radius: 15px;
            text-align: center;
          }
          
          .spec-item h4 {
            font-size: 1.4rem;
            margin-bottom: 10px;
          }
          
          .spec-item p {
            font-size: 1.1rem;
            color: #86868b;
          }
          
          .footer-cta-section {
            padding: 100px 20px;
            text-align: center;
            background: #000;
            color: #fff;
          }
          
          .footer-cta-section h2 {
            font-size: 2.5rem;
            margin-bottom: 20px;
          }
          
          .footer-cta-section p {
            font-size: 1.3rem;
            margin-bottom: 40px;
            opacity: 0.8;
          }
          
          .footer-cta-buttons {
            display: flex;
            justify-content: center;
            gap: 20px;
            flex-wrap: wrap;
          }
          
          @media (max-width: 768px) {
            .hero-content h1 {
              font-size: 3rem;
            }
            
            .hero-content p {
              font-size: 1.5rem;
            }
            
            .model-tabs {
              flex-direction: column;
              align-items: center;
              gap: 15px;
            }
            
            .tab-btn {
              font-size: 1.2rem;
            }
            
            .colors-section h2,
            .tech-specs h2,
            .footer-cta-section h2 {
              font-size: 2rem;
            }
            
            .feature-nav {
              flex-direction: column;
              align-items: center;
            }
          }
        `}</style>
      </div>
    </Layout>
  );
}
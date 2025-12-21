import React, { useState } from 'react';
import Layout from '../components/Layout';

const BrowserPage = () => {
  const [activeTab, setActiveTab] = useState('loading');

  return (
    <Layout activeMenu="browser">
      <div className="content">
        <h1>浏览器加载原理</h1>
        
        <div className="protected-content">
          {/* Tab Navigation */}
          <div className="tabs">
            <button 
              className={activeTab === 'loading' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('loading')}
            >
              加载原理
            </button>
            <button 
              className={activeTab === 'rendering' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('rendering')}
            >
              渲染机制
            </button>
            <button 
              className={activeTab === 'performance' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('performance')}
            >
              性能优化
            </button>
            <button 
              className={activeTab === 'http' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('http')}
            >
              HTTP/HTTPS
            </button>
            <button 
              className={activeTab === 'caching' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('caching')}
            >
              浏览器缓存
            </button>
            <button 
              className={activeTab === 'eventloop' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('eventloop')}
            >
              事件环原理
            </button>
          </div>
          
          {/* Tab Content */}
          {activeTab === 'loading' ? (
            <div className="tab-content">
              <h2>浏览器加载原理详解</h2>
              <p>浏览器加载网页的过程是一个复杂而精密的过程，涉及多个阶段和组件的协作。</p>
              
              <h3>1. URL解析与DNS查询</h3>
              <p>当用户输入URL或点击链接时，浏览器首先需要解析URL并获取目标服务器的IP地址。</p>
              <ol>
                <li><strong>URL解析</strong>：浏览器解析URL的协议、主机名、端口和路径</li>
                <li><strong>DNS查询</strong>：通过DNS系统将域名解析为IP地址</li>
                <li><strong>DNS缓存</strong>：浏览器、操作系统和路由器都会缓存DNS记录以提高效率</li>
              </ol>
              
              <h3>2. TCP连接建立</h3>
              <p>获取IP地址后，浏览器需要与服务器建立TCP连接：</p>
              <ol>
                <li><strong>三次握手</strong>：
                  <ul>
                    <li>客户端发送SYN包到服务器</li>
                    <li>服务器回复SYN-ACK包</li>
                    <li>客户端发送ACK包确认连接</li>
                  </ul>
                </li>
                <li><strong>TLS/SSL握手</strong>（HTTPS）：
                  <ul>
                    <li>协商加密算法</li>
                    <li>交换和验证证书</li>
                    <li>生成会话密钥</li>
                  </ul>
                </li>
              </ol>
              
              <h3>3. HTTP请求发送</h3>
              <p>连接建立后，浏览器向服务器发送HTTP请求：</p>
              <pre>
                {`GET /index.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
Accept: text/html,application/xhtml+xml
Accept-Language: en-US,en;q=0.9
Accept-Encoding: gzip, deflate, br
Connection: keep-alive`}
              </pre>
              
              <h3>4. 服务器响应处理</h3>
              <p>服务器处理请求并返回响应：</p>
              <pre>
                {`HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
Content-Length: 1234
Server: Apache/2.4.41
Date: Mon, 20 Dec 2025 10:00:00 GMT

<!DOCTYPE html>
<html>
<head>
  <title>Example</title>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>`}
              </pre>
              
              <h3>5. HTML解析与DOM构建</h3>
              <p>浏览器开始解析HTML文档并构建DOM树：</p>
              <ol>
                <li><strong>字节流转换</strong>：将接收到的字节流转换为字符</li>
                <li><strong>Tokenization</strong>：词法分析，识别开始标签、结束标签和文本节点</li>
                <li><strong>Lexing</strong>：语法分析，将tokens转换为Nodes</li>
                <li><strong>DOM Tree Construction</strong>：构建DOM树结构</li>
              </ol>
              
              <h3>6. CSS解析与CSSOM构建</h3>
              <p>同时解析CSS并构建CSS对象模型(CSSOM)：</p>
              <ol>
                <li><strong>CSS资源加载</strong>：加载外部CSS文件和内联样式</li>
                <li><strong>CSS解析</strong>：解析CSS规则并构建样式表</li>
                <li><strong>CSSOM构建</strong>：创建CSS对象模型</li>
              </ol>
              
              <h3>7. JavaScript执行</h3>
              <p>JavaScript的执行会影响页面加载和渲染：</p>
              <ul>
                <li><strong>阻塞渲染</strong>：默认情况下，JavaScript会阻塞HTML解析</li>
                <li><strong>异步加载</strong>：async和defer属性改变脚本加载行为</li>
                <li><strong>DOM操作</strong>：JavaScript可以修改DOM和CSSOM</li>
              </ul>
            </div>
          ) : activeTab === 'rendering' ? (
            <div className="tab-content">
              <h2>浏览器渲染机制</h2>
              <p>浏览器渲染是将HTML、CSS和JavaScript转换为用户可见像素的过程。</p>
              
              <h3>1. 渲染引擎架构</h3>
              <p>主流浏览器使用不同的渲染引擎：</p>
              <ul>
                <li><strong>Blink</strong>：Chrome、Edge、Opera</li>
                <li><strong>Gecko</strong>：Firefox</li>
                <li><strong>WebKit</strong>：Safari</li>
              </ul>
              
              <h3>2. 关键渲染路径</h3>
              <p>浏览器渲染页面需要经历以下关键步骤：</p>
              <ol>
                <li><strong>DOM构建</strong>：解析HTML标记以构建DOM树</li>
                <li><strong>CSSOM构建</strong>：解析CSS标记以构建CSSOM树</li>
                <li><strong>渲染树构建</strong>：结合DOM和CSSOM构建渲染树</li>
                <li><strong>布局计算</strong>：计算每个元素的几何信息</li>
                <li><strong>绘制</strong>：将像素填充到屏幕上的图层</li>
              </ol>
              
              <h3>3. 渲染树构建</h3>
              <p>渲染树是DOM和CSSOM的结合体：</p>
              <ul>
                <li>只包含可见元素（display: none的元素不包含）</li>
                <li>每个节点包含内容和计算后的样式</li>
                <li>伪元素也会包含在渲染树中</li>
              </ul>
              
              <h3>4. 布局(Layout/Reflow)</h3>
              <p>计算元素在视口中的确切位置和大小：</p>
              <pre>
                {`// 触发布局的操作
element.style.width = '100px';  // 修改几何属性
var width = element.offsetWidth; // 查询几何属性
document.body.appendChild(node); // 添加DOM节点`}
              </pre>
              
              <h3>5. 绘制(Paint)</h3>
              <p>将渲染树的每个节点转换为屏幕上的实际像素：</p>
              <ul>
                <li>背景颜色绘制</li>
                <li>边框绘制</li>
                <li>文本绘制</li>
                <li>阴影绘制</li>
              </ul>
              
              <h3>6. 合成(Composite)</h3>
              <p>将页面的各个部分组合成最终图像：</p>
              <ul>
                <li>处理transform和opacity等属性</li>
                <li>利用GPU加速</li>
                <li>创建层叠上下文</li>
              </ul>
            </div>
          ) : activeTab === 'performance' ? (
            <div className="tab-content">
              <h2>浏览器性能优化</h2>
              <p>通过理解浏览器的工作原理，我们可以采取多种策略来优化页面性能。</p>
              
              <h3>1. 资源加载优化</h3>
              <ul>
                <li><strong>减少HTTP请求</strong>：合并CSS/JS文件，使用CSS Sprites</li>
                <li><strong>资源压缩</strong>：启用Gzip/Brotli压缩</li>
                <li><strong>缓存策略</strong>：合理设置HTTP缓存头</li>
                <li><strong>CDN使用</strong>：利用内容分发网络加速资源加载</li>
                <li><strong>预加载</strong>：使用link rel="preload"提前加载关键资源</li>
              </ul>
              
              <h3>2. 关键渲染路径优化</h3>
              <ul>
                <li><strong>内联关键CSS</strong>：将首屏所需CSS内联到HTML中</li>
                <li><strong>延迟非关键资源</strong>：使用async/defer加载JavaScript</li>
                <li><strong>媒体查询</strong>：为CSS资源添加media属性</li>
                <li><strong>字体优化</strong>：使用font-display属性控制字体加载</li>
              </ul>
              
              <h3>3. JavaScript优化</h3>
              <ul>
                <li><strong>代码分割</strong>：使用动态import()按需加载</li>
                <li><strong>Tree Shaking</strong>：移除未使用的代码</li>
                <li><strong>避免长任务</strong>：将大任务分解为小任务</li>
                <li><strong>Web Workers</strong>：将计算密集型任务移到后台线程</li>
              </ul>
              
              <h3>4. 渲染性能优化</h3>
              <ul>
                <li><strong>减少重排重绘</strong>：批量DOM操作，使用transform代替left/top</li>
                <li><strong>使用requestAnimationFrame</strong>：在合适的时机执行动画</li>
                <li><strong>启用硬件加速</strong>：使用will-change属性</li>
                <li><strong>虚拟滚动</strong>：对长列表使用虚拟化技术</li>
              </ul>
              
              <h3>5. 网络优化</h3>
              <ul>
                <li><strong>HTTP/2</strong>：启用多路复用和服务器推送</li>
                <li><strong>资源预加载</strong>：使用link rel="prefetch"/"preload"</li>
                <li><strong>Service Workers</strong>：实现离线功能和缓存策略</li>
                <li><strong>图片优化</strong>：使用现代图片格式(WebP/AVIF)和响应式图片</li>
              </ul>
              
              <h3>6. 性能指标监控</h3>
              <ul>
                <li><strong>FCP</strong>：首次内容绘制</li>
                <li><strong>LCP</strong>：最大内容绘制</li>
                <li><strong>FID</strong>：首次输入延迟</li>
                <li><strong>CLS</strong>：累积布局偏移</li>
                <li><strong>TTI</strong>：可交互时间</li>
              </ul>
            </div>
          ) : activeTab === 'http' ? (
            <div className="tab-content">
              <h2>HTTP 与 HTTPS 对比</h2>
              <p>HTTP和HTTPS是互联网上应用最为广泛的网络协议，它们在安全性方面有着本质的区别。</p>
              
              <h3>HTTP (HyperText Transfer Protocol)</h3>
              <p>HTTP是一种用于分布式、协作式和超媒体信息系统的应用层协议。</p>
              
              <h4>HTTP 工作原理</h4>
              <ol>
                <li>客户端发起请求到服务器</li>
                <li>服务器处理请求并返回响应</li>
                <li>客户端接收响应并显示内容</li>
              </ol>
              
              <h4>HTTP 优点</h4>
              <ul>
                <li><strong>简单快速</strong>：客户向服务器请求服务时，只需传送请求方法和路径</li>
                <li><strong>灵活</strong>：HTTP允许传输任意类型的数据对象</li>
                <li><strong>无连接</strong>：限制每次连接只处理一个请求</li>
                <li><strong>无状态</strong>：协议对于事务处理没有记忆能力</li>
              </ul>
              
              <h4>HTTP 缺点</h4>
              <ul>
                <li><strong>明文传输</strong>：数据以明文形式传输，容易被窃听</li>
                <li><strong>无法验证身份</strong>：无法确认通信方的身份</li>
                <li><strong>无法保证完整性</strong>：无法证明报文的完整性</li>
              </ul>
              
              <h3>HTTPS (HyperText Transfer Protocol Secure)</h3>
              <p>HTTPS是以安全为目标的HTTP通道，在HTTP的基础上通过传输加密和身份认证保证了传输过程的安全性。</p>
              
              <h4>HTTPS 工作原理</h4>
              <ol>
                <li>客户端发起HTTPS请求</li>
                <li>服务器返回数字证书</li>
                <li>客户端验证证书有效性</li>
                <li>双方协商加密算法和密钥</li>
                <li>使用对称加密传输数据</li>
              </ol>
              
              <h4>HTTPS 优点</h4>
              <ul>
                <li><strong>数据加密</strong>：所有数据都经过加密传输</li>
                <li><strong>身份验证</strong>：确认网站的真实性</li>
                <li><strong>数据完整性</strong>：防止内容被第三方篡改</li>
                <li><strong>SEO优势</strong>：搜索引擎对HTTPS网站给予优先排名</li>
              </ul>
              
              <h4>HTTPS 缺点</h4>
              <ul>
                <li><strong>性能损耗</strong>：加密解密过程消耗CPU资源</li>
                <li><strong>成本较高</strong>：需要购买SSL证书</li>
                <li><strong>缓存受限</strong>：代理服务器无法缓存加密内容</li>
              </ul>
              
              <h3>HTTP 与 HTTPS 对比总结</h3>
              <table>
                <thead>
                  <tr>
                    <th>特性</th>
                    <th>HTTP</th>
                    <th>HTTPS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>URL前缀</td>
                    <td>http://</td>
                    <td>https://</td>
                  </tr>
                  <tr>
                    <td>端口</td>
                    <td>80</td>
                    <td>443</td>
                  </tr>
                  <tr>
                    <td>安全性</td>
                    <td>低</td>
                    <td>高</td>
                  </tr>
                  <tr>
                    <td>加密</td>
                    <td>无</td>
                    <td>有（SSL/TLS）</td>
                  </tr>
                  <tr>
                    <td>证书</td>
                    <td>不需要</td>
                    <td>需要</td>
                  </tr>
                  <tr>
                    <td>SEO</td>
                    <td>一般</td>
                    <td>优先</td>
                  </tr>
                  <tr>
                    <td>性能</td>
                    <td>较快</td>
                    <td>稍慢（有优化空间）</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : activeTab === 'caching' ? (
            <div className="tab-content">
              <h2>浏览器缓存机制</h2>
              <p>浏览器缓存是提高网站性能的重要手段，通过缓存可以减少网络请求，加快页面加载速度。</p>
              
              <h3>浏览器缓存类型</h3>
              
              <h4>1. 强缓存</h4>
              <p>强缓存不会向服务器发送请求，直接从缓存中读取资源。</p>
              <ul>
                <li><strong>Expires</strong>：HTTP/1.0的缓存字段，表示资源过期时间</li>
                <li><strong>Cache-Control</strong>：HTTP/1.1的缓存字段，优先级高于Expires</li>
              </ul>
              <pre>
                {`// Expires 示例
Expires: Wed, 21 Oct 2025 07:28:00 GMT

// Cache-Control 示例
Cache-Control: max-age=3600  // 缓存1小时
Cache-Control: no-cache       // 需要验证
Cache-Control: no-store       // 禁止缓存
Cache-Control: public         // 可以被任何缓存存储
Cache-Control: private        // 只能被浏览器缓存`}
              </pre>
              
              <h4>2. 协商缓存</h4>
              <p>协商缓存会向服务器发送请求，由服务器判断资源是否更新。</p>
              <ul>
                <li><strong>Last-Modified/If-Modified-Since</strong>：基于文件修改时间</li>
                <li><strong>ETag/If-None-Match</strong>：基于文件内容</li>
              </ul>
              <pre>
                {`// Last-Modified 示例
Last-Modified: Wed, 21 Oct 2025 07:28:00 GMT
If-Modified-Since: Wed, 21 Oct 2025 07:28:00 GMT

// ETag 示例
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"
If-None-Match: "33a64df551425fcc55e4d42a148795d9f25f89d4"`}
              </pre>
              
              <h3>缓存优先级</h3>
              <ol>
                <li>Pragma &gt; Cache-Control &gt; Expires（HTTP头部字段优先级）</li>
                <li>Cache-Control: no-cache/no-store &gt; ETag &gt; Last-Modified</li>
              </ol>
              
              <h3>浏览器缓存位置</h3>
              <ul>
                <li><strong>Service Worker</strong>：最顶层，可编程缓存</li>
                <li><strong>Memory Cache</strong>：内存缓存，快速但容量有限</li>
                <li><strong>Disk Cache</strong>：磁盘缓存，容量大但速度较慢</li>
                <li><strong>Push Cache</strong>：HTTP/2推送缓存</li>
              </ul>
              
              <h3>缓存策略最佳实践</h3>
              <ul>
                <li><strong>静态资源</strong>：使用强缓存，设置较长的max-age</li>
                <li><strong>HTML文件</strong>：使用协商缓存，设置no-cache</li>
                <li><strong>API接口</strong>：根据数据更新频率设置合适的缓存策略</li>
                <li><strong>版本控制</strong>：通过文件名哈希实现缓存 busting</li>
              </ul>
              
              <h3>缓存验证流程</h3>
              <ol>
                <li>浏览器检查强缓存，如果命中则直接使用</li>
                <li>否则发送请求到服务器验证协商缓存</li>
                <li>服务器返回304表示未修改，浏览器使用缓存</li>
                <li>服务器返回200表示已修改，浏览器更新缓存</li>
              </ol>
              
              <h3>实际应用示例</h3>
              <p>以下是在不同场景下设置浏览器缓存的示例：</p>
              
              <h4>1. Nginx 配置示例</h4>
              <pre>
                {`# 静态资源强缓存（缓存1年）
location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# HTML文件协商缓存
location ~* \.html$ {
    expires 0;
    add_header Cache-Control "no-cache, must-revalidate";
}

# API接口短时间缓存
location /api/ {
    expires 5m;
    add_header Cache-Control "public, must-revalidate";
}`}
              </pre>
              
              <h4>2. Express.js 配置示例</h4>
              <pre>
                {`const express = require('express');
const app = express();

// 静态资源强缓存
app.use('/static', express.static('public', {
  maxAge: '1y',
  etag: false
}));

// HTML文件协商缓存
app.get('/', (req, res) => {
  res.set({
    'Cache-Control': 'no-cache',
    'Last-Modified': new Date().toUTCString()
  });
  res.sendFile(__dirname + '/index.html');
});

// API接口短时间缓存
app.get('/api/data', (req, res) => {
  res.set({
    'Cache-Control': 'public, max-age=300', // 5分钟
    'ETag': '"abc123"'
  });
  res.json({ data: 'example' });
});`}
              </pre>
              
              <h4>3. Webpack 构建时文件名哈希示例</h4>
              <pre>
                {`// webpack.config.js
module.exports = {
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].chunk.js'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ]
};

// 构建后生成的文件名示例：
// main.a1b2c3d4e5f6.js
// vendor.f6e5d4c3b2a1.js
// styles.1a2b3c4d.css`}
              </pre>
            </div>
          ) : (
            <div className="tab-content">
              <h2>浏览器事件环(Event Loop)原理</h2>
              <p>JavaScript是单线程语言，事件循环机制使得JavaScript能够处理异步操作。</p>
              
              <h3>JavaScript 运行环境</h3>
              <p>浏览器中的JavaScript运行在单线程环境中，但通过事件循环机制可以处理并发操作。</p>
              
              <h3>事件环核心概念</h3>
              <ul>
                <li><strong>调用栈(Call Stack)</strong>：执行JavaScript代码的栈结构</li>
                <li><strong>回调队列(Callback Queue)</strong>：存放待执行回调函数的队列</li>
                <li><strong>微任务队列(Microtask Queue)</strong>：存放微任务的队列，优先级高于宏任务</li>
                <li><strong>Web APIs</strong>：浏览器提供的异步API（setTimeout、DOM事件等）</li>
              </ul>
              
              <h3>事件环执行流程</h3>
              <ol>
                <li>执行调用栈中的同步代码</li>
                <li>执行完所有微任务（Microtasks）</li>
                <li>执行一个宏任务（Macrotask）</li>
                <li>重复上述过程</li>
              </ol>
              
              <h3>宏任务与微任务</h3>
              
              <h4>宏任务(Macrotasks)</h4>
              <ul>
                <li>setTimeout/setInterval</li>
                <li>I/O操作</li>
                <li>UI渲染</li>
                <li>script标签</li>
                <li>setImmediate(Node.js)</li>
              </ul>
              
              <h4>微任务(Microtasks)</h4>
              <ul>
                <li>Promise.then/catch/finally</li>
                <li>queueMicrotask</li>
                <li>MutationObserver</li>
                <li>process.nextTick(Node.js)</li>
              </ul>
              
              <h3>执行顺序示例</h3>
              <pre>
                {`console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => console.log('3'));

console.log('4');

// 输出顺序：1 4 3 2`}
              </pre>
              
              <h3>事件环可视化流程</h3>
              <pre>
                {`                   ┌─────────────┐
                   │   Browser   │
                   │   Process   │
                   └─────────────┘
                          │
                 ┌────────▼────────┐
                 │   Call Stack    │
                 └─────────────────┘
                          │
                 ┌────────▼────────┐
                 │   Web APIs      │
                 └─────────────────┘
                          │
        ┌─────────────────▼─────────────────┐
        │                                   │
┌───────▼────────┐               ┌──────────▼───────┐
│ Microtask      │               │ Macrotask        │
│ Queue          │               │ Queue            │
└────────────────┘               └──────────────────┘`}
              </pre>
              
              <h3>常见面试题解析</h3>
              <pre>
                {`// 题目1
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2');
}

console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

async1();

new Promise(function(resolve) {
  console.log('promise1');
  resolve();
}).then(function() {
  console.log('promise2');
});

console.log('script end');

/* 输出结果：
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
*/`}
              </pre>
              
              <h3>性能优化建议</h3>
              <ul>
                <li><strong>避免长时间运行的同步任务</strong>：会导致页面卡顿</li>
                <li><strong>合理使用Promise和async/await</strong>：避免回调地狱</li>
                <li><strong>使用requestIdleCallback</strong>：在浏览器空闲时执行低优先级任务</li>
                <li><strong>Web Workers</strong>：将计算密集型任务移到后台线程</li>
              </ul>
            </div>
          )}
        </div>
      </div>
      
      {/* 添加样式 */}
      <style jsx>{`
        .tabs {
          display: flex;
          flex-wrap: wrap; /* 允许换行 */
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
        
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        
        table, th, td {
          border: 1px solid #ddd;
        }
        
        th, td {
          padding: 12px;
          text-align: left;
        }
        
        th {
          background-color: #f2f2f2;
        }
        
        ol, ul {
          margin-bottom: 1rem;
        }
        
        li {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </Layout>
  );
};

export default BrowserPage;
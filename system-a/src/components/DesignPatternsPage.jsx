import React from 'react';
import Navigation from './Navigation';
import './DesignPatternsPage.css';

const DesignPatternsPage = ({ 
  authenticated, 
  user, 
  currentPage, 
  onNavigateToProfile, 
  onNavigateToHome, 
  onNavigateToHooks,
  onNavigateToPatterns,
  onNavigateToJavascript,
  onLogout, 
  onLogin 
}) => {
  return (
    <div className="page-container">
      <Navigation 
        authenticated={authenticated}
        user={user}
        currentPage={currentPage}
        onNavigateToProfile={onNavigateToProfile}
        onNavigateToHome={onNavigateToHome}
        onNavigateToHooks={onNavigateToHooks}
        onNavigateToPatterns={onNavigateToPatterns}
        onNavigateToJavascript={onNavigateToJavascript}
        onLogout={onLogout}
        onLogin={onLogin}
      />
      
      <div className="content-wrapper">
        <div className="profile-container">
          <div className="profile-section">
            <h2>设计模式解析</h2>
            <p>设计模式是在软件设计中常见问题的典型解决方案。它们是经过反复验证的、可重用的解决方案，可以帮助开发者编写更清晰、更易维护的代码。</p>
          </div>
          
          <div className="profile-section">
            <h3>发布-订阅模式 (Publish-Subscribe Pattern)</h3>
            
            <div className="pattern-description">
              <h4>模式说明</h4>
              <p>发布-订阅模式是一种消息范式，消息的发送者（发布者）不会将消息直接发送给特定的接收者（订阅者）。而是将发布的消息分为不同的类别，而不需要了解哪些订阅者（如果有的话）可能存在。同样的，订阅者可以表达对一个或多个类别的兴趣，只接收感兴趣的消息，而不需要了解哪些发布者（如果有的话）存在。</p>
              
              <h4>主要角色</h4>
              <ul>
                <li><strong>发布者(Publisher):</strong> 发送消息的对象</li>
                <li><strong>订阅者(Subscriber):</strong> 接收消息的对象</li>
                <li><strong>消息中心(Broker/Event Bus):</strong> 管理消息的分发</li>
              </ul>
              
              <h4>优点</h4>
              <ul>
                <li>松耦合：发布者和订阅者不需要知道彼此的存在</li>
                <li>可扩展性：可以轻松添加新的发布者或订阅者</li>
                <li>灵活性：可以动态地订阅或取消订阅</li>
              </ul>
              
              <h4>缺点</h4>
              <ul>
                <li>调试困难：由于解耦，很难跟踪消息流向</li>
                <li>性能开销：消息传递机制可能带来额外的性能开销</li>
                <li>内存泄漏：如果不正确地管理订阅，可能导致内存泄漏</li>
              </ul>
            </div>
            
            <div className="pattern-examples">
              <h4>实现示例</h4>
              
              <div className="example">
                <h5>1. 原生 JavaScript 实现</h5>
                <pre><code>{`// 创建事件总线
class EventBus {
  constructor() {
    this.events = {};
  }

  // 订阅事件
  subscribe(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  // 发布事件
  publish(eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(callback => callback(data));
    }
  }

  // 取消订阅
  unsubscribe(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
    }
  }
}

// 使用示例
const eventBus = new EventBus();

// 订阅者1
eventBus.subscribe('user-login', (data) => {
  console.log('Analytics模块收到用户登录信息:', data);
});

// 订阅者2
eventBus.subscribe('user-login', (data) => {
  console.log('Notification模块收到用户登录信息:', data);
});

// 发布者
eventBus.publish('user-login', { userId: 123, username: '张三' });`}</code></pre>
              </div>
              
              <div className="example">
                <h5>2. Vue.js 实现</h5>
                <pre><code>{`// Vue 2 中使用事件总线
// main.js
import Vue from 'vue';
export const EventBus = new Vue();

// 组件A (订阅者)
export default {
  mounted() {
    EventBus.$on('user-login', (data) => {
      console.log('组件A收到用户登录信息:', data);
    });
  },
  beforeDestroy() {
    EventBus.$off('user-login');
  }
}

// 组件B (发布者)
export default {
  methods: {
    handleLogin() {
      // 登录逻辑...
      EventBus.$emit('user-login', { userId: 123, username: '张三' });
    }
  }
}`}</code></pre>
              </div>
              
              <div className="example">
                <h5>3. Node.js EventEmitter 实现</h5>
                <pre><code>{`const EventEmitter = require('events');

// 创建事件发射器实例
class UserEventEmitter extends EventEmitter {}

const userEvents = new UserEventEmitter();

// 订阅者1
userEvents.on('user-login', (data) => {
  console.log('邮件服务收到用户登录信息:', data);
});

// 订阅者2
userEvents.on('user-login', (data) => {
  console.log('日志服务收到用户登录信息:', data);
});

// 发布者
userEvents.emit('user-login', { userId: 123, username: '张三' });

// 只执行一次的监听器
userEvents.once('user-logout', (data) => {
  console.log('清理用户会话:', data);
});

userEvents.emit('user-logout', { userId: 123 });
userEvents.emit('user-logout', { userId: 123 }); // 不会再次触发`}</code></pre>
              </div>
              
              <div className="example">
                <h5>4. React 中使用发布-订阅模式</h5>
                <pre><code>{`import React, { createContext, useContext, useEffect } from 'react';

// 创建事件总线
class EventBus {
  constructor() {
    this.events = {};
  }

  subscribe(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  publish(eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(callback => callback(data));
    }
  }

  unsubscribe(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
    }
  }
}

const EventBusInstance = new EventBus();
const EventBusContext = createContext(EventBusInstance);

// 自定义Hook
export const useEventBus = () => useContext(EventBusContext);

// 发布者组件
const PublisherComponent = () => {
  const eventBus = useEventBus();

  const handleLogin = () => {
    eventBus.publish('user-login', { userId: 123, username: '张三' });
  };

  return (
    <button onClick={handleLogin}>用户登录</button>
  );
};

// 订阅者组件
const SubscriberComponent = () => {
  const eventBus = useEventBus();

  useEffect(() => {
    const handleUserLogin = (data) => {
      console.log('收到用户登录信息:', data);
    };

    eventBus.subscribe('user-login', handleUserLogin);

    // 清理订阅
    return () => {
      eventBus.unsubscribe('user-login', handleUserLogin);
    };
  }, [eventBus]);

  return <div>订阅者组件</div>;
};

// 应用根组件
const App = () => {
  return (
    <EventBusContext.Provider value={EventBusInstance}>
      <PublisherComponent />
      <SubscriberComponent />
    </EventBusContext.Provider>
  );
};`}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignPatternsPage;
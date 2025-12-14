import React from 'react';
import Navigation from './Navigation';
import './HooksPage.css';

const HooksPage = ({ 
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
            <h2>React 官方 Hooks 详解</h2>
            
            {/* 状态管理 Hooks */}
            <section className="hook-category">
              <h3>状态管理 Hooks</h3>
              
              <div className="hook-cards">
                <section className="hook-card">
                  <h4>1. useState</h4>
                  <p><strong>用途：</strong>用于在函数组件中添加状态</p>
                  <pre><code>{`const [state, setState] = useState(initialState);`}</code></pre>
                  <div className="hook-details">
                    <div className="hook-properties">
                      <h5>特性：</h5>
                      <ul>
                        <li>返回一个状态值和更新该状态的函数</li>
                        <li>初始状态只在首次渲染时使用</li>
                        <li>setState函数用于更新状态并触发重新渲染</li>
                      </ul>
                    </div>
                    
                    <div className="hook-properties">
                      <h5>优点：</h5>
                      <ul>
                        <li>简化了状态管理</li>
                        <li>无需绑定this</li>
                        <li>可读性好</li>
                      </ul>
                    </div>
                    
                    <div className="hook-properties">
                      <h5>缺点：</h5>
                      <ul>
                        <li>只能在函数组件顶层调用</li>
                        <li>不能在条件语句中调用</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="hook-card">
                  <h4>2. useReducer</h4>
                  <p><strong>用途：</strong>复杂状态逻辑的状态管理</p>
                  <pre><code>{`const [state, dispatch] = useReducer(reducer, initialArg, init);`}</code></pre>
                  <div className="hook-details">
                    <div className="hook-properties">
                      <h5>特性：</h5>
                      <ul>
                        <li>适用于复杂的状态逻辑</li>
                        <li>类似于Redux的工作方式</li>
                        <li>dispatch用于触发状态变更</li>
                      </ul>
                    </div>
                    
                    <div className="hook-properties">
                      <h5>优点：</h5>
                      <ul>
                        <li>适合复杂状态逻辑</li>
                        <li>便于测试</li>
                        <li>性能优化</li>
                      </ul>
                    </div>
                    
                    <div className="hook-properties">
                      <h5>缺点：</h5>
                      <ul>
                        <li>样板代码较多</li>
                        <li>学习成本高</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="hook-card">
                  <h4>3. useContext</h4>
                  <p><strong>用途：</strong>订阅React context的变更</p>
                  <pre><code>{`const value = useContext(MyContext);`}</code></pre>
                  <div className="hook-details">
                    <div className="hook-properties">
                      <h5>特性：</h5>
                      <ul>
                        <li>接收一个context对象并返回其当前值</li>
                        <li>当Provider的value变化时会触发重新渲染</li>
                      </ul>
                    </div>
                    
                    <div className="hook-properties">
                      <h5>优点：</h5>
                      <ul>
                        <li>避免层层传递props</li>
                        <li>简化组件间通信</li>
                      </ul>
                    </div>
                    
                    <div className="hook-properties">
                      <h5>缺点：</h5>
                      <ul>
                        <li>可能导致不必要的重新渲染</li>
                        <li>调试困难</li>
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
            </section>

            {/* 副作用 Hooks */}
            <section className="hook-category">
              <h3>副作用 Hooks</h3>
              
              <div className="hook-cards">
                <section className="hook-card">
                  <h4>4. useEffect</h4>
                  <p><strong>用途：</strong>处理副作用操作（数据获取、订阅、手动DOM操作等）</p>
                  <pre><code>{`useEffect(() => {
  // 副作用操作
  return () => {
    // 清理操作
  };
}, [dependencies]);`}</code></pre>
                  <div className="hook-details">
                    <div className="hook-properties">
                      <h5>特性：</h5>
                      <ul>
                        <li>相当于类组件中的componentDidMount、componentDidUpdate和componentWillUnmount的组合</li>
                        <li>第二个参数为依赖数组，控制effect的执行时机</li>
                        <li>返回的函数用于清理副作用</li>
                      </ul>
                    </div>
                    
                    <div className="hook-properties">
                      <h5>优点：</h5>
                      <ul>
                        <li>统一了生命周期处理</li>
                        <li>自动处理清理工作</li>
                        <li>避免内存泄漏</li>
                      </ul>
                    </div>
                    
                    <div className="hook-properties">
                      <h5>缺点：</h5>
                      <ul>
                        <li>容易出现无限循环</li>
                        <li>依赖数组容易出错</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="hook-card">
                  <h4>5. useLayoutEffect</h4>
                  <p><strong>用途：</strong>在浏览器执行绘制之前同步执行副作用</p>
                  <pre><code>{`useLayoutEffect(() => {
  // 同步执行副作用
}, [deps]);`}</code></pre>
                  <div className="hook-details">
                    <div className="hook-properties">
                      <h5>特性：</h5>
                      <ul>
                        <li>与useEffect类似但执行时机不同</li>
                        <li>在DOM更新后，浏览器绘制前执行</li>
                      </ul>
                    </div>
                    
                    <div className="hook-properties">
                      <h5>优点：</h5>
                      <ul>
                        <li>读取布局信息</li>
                        <li>同步更新DOM</li>
                      </ul>
                    </div>
                    
                    <div className="hook-properties">
                      <h5>缺点：</h5>
                      <ul>
                        <li>阻塞浏览器绘制</li>
                        <li>可能导致性能问题</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="hook-card">
                  <h4>6. useInsertionEffect (React 18)</h4>
                  <p><strong>用途：</strong>在DOM变更前读取DOM布局</p>
                  <pre><code>{`useInsertionEffect(() => {
  // DOM变更前执行
});`}</code></pre>
                  <div className="hook-details">
                    <div className="hook-properties">
                      <h5>特性：</h5>
                      <ul>
                        <li>在useLayoutEffect之前执行</li>
                        <li>不能访问DOM节点</li>
                      </ul>
                    </div>
                    
                    <div className="hook-properties">
                      <h5>优点：</h5>
                      <ul>
                        <li>注入样式更安全</li>
                        <li>避免额外渲染</li>
                      </ul>
                    </div>
                    
                    <div className="hook-properties">
                      <h5>缺点：</h5>
                      <ul>
                        <li>使用场景有限</li>
                        <li>限制较多</li>
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
            </section>

            {/* 性能优化 Hooks */}
            <section className="hook-category">
              <h3>性能优化 Hooks</h3>
              
              <div className="hook-cards">
                <section className="hook-card">
                  <h4>7. useMemo</h4>
                  <p><strong>用途：</strong>缓存计算结果，避免重复计算</p>
                  <pre><code>{`const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);`}</code></pre>
                  <div className="hook-details">
                    <div className="hook-properties">
                      <h5>特性：</h5>
                      <ul>
                        <li>返回一个memoized值</li>
                        <li>仅在依赖项改变时重新计算</li>
                      </ul>
                    </div>
                    
                    <div className="hook-properties">
                      <h5>优点：</h5>
                      <ul>
                        <li>优化昂贵计算的性能</li>
                        <li>避免重复渲染</li>
                      </ul>
                    </div>
                    
                    <div className="hook-properties">
                      <h5>缺点：</h5>
                      <ul>
                        <li>过度使用可能影响性能</li>
                        <li>依赖数组管理复杂</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="hook-comparison">
                    <h5>与useCallback和React.memo结合使用的示例：</h5>
                    <pre><code>{`// 父组件
const ParentComponent = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // 使用useCallback缓存函数
  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []);

  // 使用useMemo缓存计算结果
  const expensiveValue = useMemo(() => {
    // 昂贵的计算
    return count * 2;
  }, [count]);

  return (
    <div>
      <ChildComponent 
        count={count} 
        onClick={handleClick} 
        expensiveValue={expensiveValue} 
      />
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
    </div>
  );
};

// 子组件使用React.memo优化
const ChildComponent = React.memo(({ count, onClick, expensiveValue }) => {
  console.log('ChildComponent rendered');
  
  return (
    <div>
      <p>Count: {count}</p>
      <p>Expensive Value: {expensiveValue}</p>
      <button onClick={onClick}>Click me</button>
    </div>
  );
});`}</code></pre>
                    
                    <div className="comparison-benefits">
                      <h5>结合使用的好处：</h5>
                      <ul>
                        <li><strong>性能优化：</strong>避免子组件不必要的重新渲染</li>
                        <li><strong>减少计算：</strong>只在依赖项变化时重新计算昂贵的值</li>
                        <li><strong>防止引用变化：</strong>稳定的函数引用避免子组件重新渲染</li>
                        <li><strong>提升用户体验：</strong>更流畅的界面交互</li>
                      </ul>
                    </div>
                    
                    <div className="comparison-scenarios">
                      <h5>使用场景：</h5>
                      <ul>
                        <li>传递给子组件的回调函数</li>
                        <li>复杂的计算结果</li>
                        <li>大型列表渲染</li>
                        <li>频繁渲染的组件</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="hook-card">
                  <h4>8. useCallback</h4>
                  <p><strong>用途：</strong>缓存函数，避免在每次渲染时创建新函数</p>
                  <pre><code>{`const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);`}</code></pre>
                  <div className="hook-details">
                    <div className="hook-properties">
                      <h5>特性：</h5>
                      <ul>
                        <li>返回一个memoized回调函数</li>
                        <li>依赖数组变化时才会返回新函数</li>
                      </ul>
                    </div>
                    
                    <div className="hook-properties">
                      <h5>优点：</h5>
                      <ul>
                        <li>优化子组件渲染性能</li>
                        <li>避免不必要的函数重建</li>
                      </ul>
                    </div>
                    
                    <div className="hook-properties">
                      <h5>缺点：</h5>
                      <ul>
                        <li>过度使用可能影响性能</li>
                        <li>依赖数组管理复杂</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="hook-comparison">
                    <h5>与useMemo和React.memo结合使用的示例：</h5>
                    <pre><code>{`// 父组件
const ParentComponent = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // 使用useCallback缓存函数
  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []);

  // 使用useMemo缓存计算结果
  const expensiveValue = useMemo(() => {
    // 昂贵的计算
    return count * 2;
  }, [count]);

  return (
    <div>
      <ChildComponent 
        count={count} 
        onClick={handleClick} 
        expensiveValue={expensiveValue} 
      />
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
    </div>
  );
};

// 子组件使用React.memo优化
const ChildComponent = React.memo(({ count, onClick, expensiveValue }) => {
  console.log('ChildComponent rendered');
  
  return (
    <div>
      <p>Count: {count}</p>
      <p>Expensive Value: {expensiveValue}</p>
      <button onClick={onClick}>Click me</button>
    </div>
  );
});`}</code></pre>
                    
                    <div className="comparison-benefits">
                      <h5>结合使用的好处：</h5>
                      <ul>
                        <li><strong>防止子组件不必要的重新渲染：</strong>稳定的函数引用避免子组件因props变化而重新渲染</li>
                        <li><strong>提升性能：</strong>与React.memo配合使用效果更佳</li>
                        <li><strong>优化用户体验：</strong>减少界面卡顿</li>
                      </ul>
                    </div>
                    
                    <div className="comparison-scenarios">
                      <h5>使用场景：</h5>
                      <ul>
                        <li>传递给子组件的事件处理函数</li>
                        <li>作为effect依赖的函数</li>
                        <li>传递给依赖浅比较的hooks的函数</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="hook-card">
                  <h4>9. React.memo</h4>
                  <p><strong>用途：</strong>高阶组件，用于优化函数组件的渲染性能</p>
                  <pre><code>{`const MyComponent = React.memo(function MyComponent(props) {
  /* 使用 props 渲染 */
});`}</code></pre>
                  <div className="hook-details">
                    <div className="hook-properties">
                      <h5>特性：</h5>
                      <ul>
                        <li>默认情况下只会对复杂对象做浅层对比</li>
                        <li>可以通过第二个参数自定义比较函数</li>
                        <li>仅检查props变更，不会阻止state或context的变更引起的重新渲染</li>
                      </ul>
                    </div>
                    
                    <div className="hook-properties">
                      <h5>优点：</h5>
                      <ul>
                        <li>避免组件不必要的重新渲染</li>
                        <li>提升应用性能</li>
                        <li>减少重复计算</li>
                      </ul>
                    </div>
                    
                    <div className="hook-properties">
                      <h5>缺点：</h5>
                      <ul>
                        <li>可能增加内存消耗</li>
                        <li>不当使用可能导致组件不更新</li>
                        <li>浅比较对于复杂对象可能不够用</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="hook-comparison">
                    <h5>与useCallback和useMemo结合使用的示例：</h5>
                    <pre><code>{`// 父组件
const ParentComponent = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // 使用useCallback缓存函数
  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []);

  // 使用useMemo缓存计算结果
  const expensiveValue = useMemo(() => {
    // 昂贵的计算
    return count * 2;
  }, [count]);

  return (
    <div>
      <ChildComponent 
        count={count} 
        onClick={handleClick} 
        expensiveValue={expensiveValue} 
      />
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
    </div>
  );
};

// 子组件使用React.memo优化
const ChildComponent = React.memo(({ count, onClick, expensiveValue }) => {
  console.log('ChildComponent rendered');
  
  return (
    <div>
      <p>Count: {count}</p>
      <p>Expensive Value: {expensiveValue}</p>
      <button onClick={onClick}>Click me</button>
    </div>
  );
});`}</code></pre>
                    
                    <div className="comparison-benefits">
                      <h5>结合使用的好处：</h5>
                      <ul>
                        <li><strong>最大化性能优化：</strong>三者结合使用可以最大程度减少不必要的重新渲染</li>
                        <li><strong>稳定引用：</strong>useCallback提供稳定的函数引用，避免子组件因函数引用变化而重新渲染</li>
                        <li><strong>缓存计算：</strong>useMemo缓存昂贵计算结果，避免重复计算</li>
                        <li><strong>精准控制：</strong>React.memo控制组件级别的重新渲染</li>
                      </ul>
                    </div>
                    
                    <div className="comparison-scenarios">
                      <h5>使用场景：</h5>
                      <ul>
                        <li>频繁渲染的组件</li>
                        <li>大型列表项组件</li>
                        <li>接收复杂对象作为props的组件</li>
                        <li>计算密集型组件</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="hook-card">
                  <h4>10. useTransition (React 18)</h4>
                  <p><strong>用途：</strong>标记状态更新为transition，表示它们是可中断的</p>
                  <pre><code>{`const [isPending, startTransition] = useTransition();`}</code></pre>
                  <div className="hook-details">
                    <div className="hook-properties">
                      <h5>特性：</h5>
                      <ul>
                        <li>允许UI在重新渲染期间保持响应</li>
                        <li>区分紧急更新和非紧急更新</li>
                      </ul>
                    </div>
                    
                    <div className="hook-properties">
                      <h5>优点：</h5>
                      <ul>
                        <li>改善用户体验</li>
                        <li>防止界面卡顿</li>
                      </ul>
                    </div>
                    
                    <div className="hook-properties">
                      <h5>缺点：</h5>
                      <ul>
                        <li>需要理解概念</li>
                        <li>可能增加复杂性</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="hook-card">
                  <h4>11. useDeferredValue (React 18)</h4>
                  <p><strong>用途：</strong>延迟更新树的部分内容</p>
                  <pre><code>{`const deferredValue = useDeferredValue(value);`}</code></pre>
                  <div className="hook-details">
                    <div className="hook-properties">
                      <h5>特性：</h5>
                      <ul>
                        <li>推迟重新渲染不紧急的部分</li>
                        <li>与防抖相似但由React内部实现</li>
                      </ul>
                    </div>
                    
                    <div className="hook-properties">
                      <h5>优点：</h5>
                      <ul>
                        <li>提高响应性</li>
                        <li>减少不必要的渲染</li>
                      </ul>
                    </div>
                    
                    <div className="hook-properties">
                      <h5>缺点：</h5>
                      <ul>
                        <li>可能导致内容陈旧</li>
                        <li>需要合理使用</li>
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
            </section>

            {/* 其他 Hooks */}
            <section className="hook-category">
              <h3>其他 Hooks</h3>
              
              <div className="hook-cards">
                <section className="hook-card">
                  <h4>12. useRef</h4>
                  <p><strong>用途：</strong>获取DOM元素引用或存储可变值</p>
                  <pre><code>{`const refContainer = useRef(initialValue);`}</code></pre>
                  <div className="hook-details">
                    <div className="hook-properties">
                      <h5>特性：</h5>
                      <ul>
                        <li>返回一个可变的ref对象</li>
                        <li>.current属性保存着当前值</li>
                        <li>修改.current不会触发重新渲染</li>
                      </ul>
                    </div>
                    
                    <div className="hook-properties">
                      <h5>优点：</h5>
                      <ul>
                        <li>直接访问DOM元素</li>
                        <li>保持值在重新渲染之间</li>
                      </ul>
                    </div>
                    
                    <div className="hook-properties">
                      <h5>缺点：</h5>
                      <ul>
                        <li>过度使用违背React理念</li>
                        <li>难以追踪变化</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="hook-card">
                  <h4>13. useImperativeHandle</h4>
                  <p><strong>用途：</strong>自定义暴露给父组件的实例值</p>
                  <pre><code>{`useImperativeHandle(ref, createHandle, [deps]);`}</code></pre>
                  <div className="hook-details">
                    <div className="hook-properties">
                      <h5>特性：</h5>
                      <ul>
                        <li>配合forwardRef使用</li>
                        <li>自定义暴露给父组件的实例值</li>
                      </ul>
                    </div>
                    
                    <div className="hook-properties">
                      <h5>优点：</h5>
                      <ul>
                        <li>精确控制暴露给父组件的功能</li>
                      </ul>
                    </div>
                    
                    <div className="hook-properties">
                      <h5>缺点：</h5>
                      <ul>
                        <li>违背React数据流原则</li>
                        <li>增加组件复杂度</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="hook-card">
                  <h4>14. useDebugValue</h4>
                  <p><strong>用途：</strong>在React DevTools中显示自定义hook的标签</p>
                  <pre><code>{`useDebugValue(value);`}</code></pre>
                  <div className="hook-details">
                    <div className="hook-properties">
                      <h5>特性：</h5>
                      <ul>
                        <li>仅用于自定义Hook开发</li>
                        <li>在React DevTools中显示标签</li>
                      </ul>
                    </div>
                    
                    <div className="hook-properties">
                      <h5>优点：</h5>
                      <ul>
                        <li>提升调试体验</li>
                      </ul>
                    </div>
                    
                    <div className="hook-properties">
                      <h5>缺点：</h5>
                      <ul>
                        <li>仅用于开发环境</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="hook-card">
                  <h4>15. useId (React 18)</h4>
                  <p><strong>用途：</strong>生成唯一ID，用于无障碍属性</p>
                  <pre><code>{`const id = useId();`}</code></pre>
                  <div className="hook-details">
                    <div className="hook-properties">
                      <h5>特性：</h5>
                      <ul>
                        <li>在客户端和服务端生成一致的ID</li>
                        <li>避免hydration不匹配</li>
                      </ul>
                    </div>
                    
                    <div className="hook-properties">
                      <h5>优点：</h5>
                      <ul>
                        <li>解决服务端渲染ID冲突</li>
                        <li>简化无障碍实现</li>
                      </ul>
                    </div>
                    
                    <div className="hook-properties">
                      <h5>缺点：</h5>
                      <ul>
                        <li>仅用于React组件内</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="hook-card">
                  <h4>16. useSyncExternalStore (React 18)</h4>
                  <p><strong>用途：</strong>订阅外部store</p>
                  <pre><code>{`const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);`}</code></pre>
                  <div className="hook-details">
                    <div className="hook-properties">
                      <h5>特性：</h5>
                      <ul>
                        <li>替代useMutableSource</li>
                        <li>支持并发渲染</li>
                      </ul>
                    </div>
                    
                    <div className="hook-properties">
                      <h5>优点：</h5>
                      <ul>
                        <li>安全地读取外部数据源</li>
                        <li>防止撕裂</li>
                      </ul>
                    </div>
                    
                    <div className="hook-properties">
                      <h5>缺点：</h5>
                      <ul>
                        <li>主要用于库开发者</li>
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
            </section>

            <section className="hook-category">
              <div className="profile-section">
                <h3>Hooks 使用规则</h3>
                <div className="rules-card">
                  <ul>
                    <li>只在最顶层调用Hooks，不要在循环、条件或嵌套函数中调用</li>
                    <li>只在React函数组件或自定义Hooks中调用Hooks</li>
                    <li>自定义Hooks必须以"use"开头</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HooksPage;
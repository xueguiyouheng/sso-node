import React from 'react';
import Layout from '../components/Layout';

const ZustandPage = () => {
  return (
    <Layout activeMenu="zustand">
      <div className="content">
        <h1>Zustand 状态管理</h1>
        
        <div className="protected-content">
          <h2>什么是 Zustand?</h2>
          <p>Zustand 是一个小型、快速且可扩展的状态管理解决方案，使用简化的 flux 原理。它是 React 生态系统中新兴的状态管理库，提供了比 Redux 更简单的 API。</p>
          
          <h2>Zustand 的优势</h2>
          <ul>
            <li>轻量级：包体积小，无外部依赖</li>
            <li>简单易用：API 设计简洁直观</li>
            <li>灵活：可在组件内外使用</li>
            <li>支持 TypeScript</li>
            <li>支持中间件</li>
            <li>React Native 兼容</li>
          </ul>
          
          <h2>基本用法</h2>
          
          <h3>1. 创建 Store</h3>
          <pre>
            {`import { create } from 'zustand'

const useStore = create((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}))`}
          </pre>
          
          <h3>2. 在组件中使用</h3>
          <pre>
            {`import React from 'react'
import { useStore } from './store'

const Counter = () => {
  const { count, increase, decrease, reset } = useStore()
  
  return (
    <div>
      <span>{count}</span>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
      <button onClick={reset}>reset</button>
    </div>
  )
}`}
          </pre>
          
          <h2>高级用法</h2>
          
          <h3>1. 选择性订阅</h3>
          <p>只在特定状态变化时重新渲染组件：</p>
          <pre>
            {`const useCount = () => useStore((state) => state.count)

const Component = () => {
  const count = useCount()
  return <div>{count}</div>
}`}
          </pre>
          
          <h3>2. 异步操作</h3>
          <pre>
            {`const useStore = create((set) => ({
  count: 0,
  loading: false,
  fetchCount: async () => {
    set({ loading: true })
    const response = await fetch('/api/count')
    const count = await response.json()
    set({ count, loading: false })
  },
}))`}
          </pre>
          
          <h3>3. 中间件</h3>
          <pre>
            {`import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set, get) => ({
      count: 0,
      increase: () => set((state) => ({ count: state.count + 1 })),
      decrease: () => set((state) => ({ count: state.count - 1 })),
    }),
    {
      name: 'counter-storage', // unique name
    }
  )
)`}
          </pre>
          
          <h3>4. immer 中间件（用于不可变更新）</h3>
          <pre>
            {`import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

const useStore = create(
  immer((set) => ({
    users: [],
    addUser: (user) =>
      set((state) => {
        state.users.push(user)
      }),
  }))
)`}
          </pre>
          
          <h2>与其他状态管理方案的比较</h2>
          
          <h3>vs Redux</h3>
          <ul>
            <li>更少的样板代码</li>
            <li>无需 action/reducer 拆分</li>
            <li>更直观的 API</li>
            <li>更好的 TypeScript 支持</li>
          </ul>
          
          <h3>vs Context API</h3>
          <ul>
            <li>避免深层嵌套</li>
            <li>更好的性能（精确更新）</li>
            <li>更强大的中间件支持</li>
            <li>更好的开发工具支持</li>
          </ul>
          
          <h2>最佳实践</h2>
          <ul>
            <li>将相关的状态和操作组织在一个 store 中</li>
            <li>使用选择器避免不必要的重新渲染</li>
            <li>合理使用中间件（如持久化、日志等）</li>
            <li>在大型应用中拆分多个 store</li>
            <li>充分利用 TypeScript 类型推断</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ZustandPage;
import React, { useState } from 'react';
import Layout from '../components/Layout';

const ReactHooksPage = () => {
  const [activeTab, setActiveTab] = useState('principle');

  return (
    <Layout activeMenu="react-hooks">
      <div className="content">
        <h1>React Hooks</h1>
        
        <div className="protected-content">
          {/* Tab Navigation */}
          <div className="tabs">
            <button 
              className={activeTab === 'principle' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('principle')}
            >
              原理说明
            </button>
            <button 
              className={activeTab === 'source' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('source')}
            >
              源码分析
            </button>
          </div>
          
          {/* Tab Content */}
          {activeTab === 'principle' ? (
            <div className="tab-content">
              <h2>什么是 React Hooks?</h2>
              <p>React Hooks 是 React 16.8 引入的新特性，它允许你在不编写 class 的情况下使用 state 以及其他的 React 特性。</p>
              
              <h2>Hooks 规则</h2>
              <ul>
                <li>只能在函数最外层调用 Hook，不要在循环、条件判断或者子函数中调用</li>
                <li>只能在 React 函数式组件中调用 Hook，不要在普通的 JavaScript 函数中调用</li>
              </ul>
              
              <h2>常用内置 Hooks</h2>
              
              <h3>1. useState</h3>
              <p>useState 是一个让你在函数组件中添加 state 的 Hook。</p>
              <pre>
                {`const [count, setCount] = useState(0);

// 使用示例
<button onClick={() => setCount(count + 1)}>
  Count: {count}
</button>`}
              </pre>
              
              <h3>2. useEffect</h3>
              <p>useEffect Hook 看做 componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合。</p>
              <pre>
                {`useEffect(() => {
  // 组件挂载和更新时执行
  document.title = \`You clicked $\{count} times\`;
  
  // 清理函数（可选）
  return () => {
    // 组件卸载时执行
  };
}, [count]); // 依赖数组`}
              </pre>
              
              <h3>3. useContext</h3>
              <p>useContext 用于在组件之间共享状态，避免逐层传递 props。</p>
              <pre>
                {`const MyContext = createContext();

function App() {
  return (
    <MyContext.Provider value="Hello World">
      <Toolbar />
    </MyContext.Provider>
  );
}

function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const value = useContext(MyContext);
  return <Button theme={value} />;
}`}
              </pre>
              
              <h3>4. useReducer</h3>
              <p>useReducer 是 useState 的替代方案，适用于复杂的状态逻辑。</p>
              <pre>
                {`const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}`}
              </pre>
              
              <h3>5. useMemo</h3>
              <p>useMemo 返回一个 memoized 值，用于优化性能。</p>
              <pre>
                {`const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);`}
              </pre>
              
              <h3>6. useCallback</h3>
              <p>useCallback 返回一个 memoized 回调函数。</p>
              <pre>
                {`const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);`}
              </pre>
              
              <h3>7. useRef</h3>
              <p>useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数。</p>
              <pre>
                {`const inputEl = useRef(null);
const onButtonClick = () => {
  // \`current\` 指向已挂载到 DOM 上的文本输入元素
  inputEl.current.focus();
};`}
              </pre>
              
              <h2>Hooks 原理</h2>
              <p>React Hooks 的核心原理是通过链表来维护组件的状态。每次调用 Hook 时，React 会在内部创建一个 Hook 对象，并将其添加到链表中。</p>
              
              <h3>Hook 对象结构</h3>
              <pre>
                {`{
  memoizedState: null, // 用于存放对应 Hook 的状态
  next: null,          // 指向下一个 Hook 对象
}`}
              </pre>
              
              <h3>Hook 调用顺序</h3>
              <p>React 通过调用顺序来确定每个 Hook 对应的状态，这就是为什么 Hook 不能在条件语句中调用的原因。</p>
              
              <h2>自定义 Hooks</h2>
              <p>自定义 Hook 是一个函数，其名称以 "use" 开头，函数内部可以调用其他的 Hook。</p>
              <pre>
                {`function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}`}
              </pre>
            </div>
          ) : (
            <div className="tab-content">
              <h2>React Hooks 源码分析</h2>
              <p>React Hooks 的实现涉及 React 的内部机制，主要包括以下几个核心部分：</p>
              
              <h3>1. Hook 对象的数据结构</h3>
              <p>在 React 内部，每个 Hook 都是一个对象，包含以下属性：</p>
              <pre>
                {`export type Hook = {
  memoizedState: any, // Hook自身状态值
  baseState: any,     // 初始状态值
  baseQueue: Update<any, any> | null, // 更新队列
  queue: UpdateQueue<any, any> | null, // 待更新队列
  next: Hook | null,  // 指向下一个Hook
};`}
              </pre>
              
              <h3>2. Fiber 节点与 Hooks</h3>
              <p>Fiber 节点中有一个 memorizedState 字段，用来存储第一个 Hook 对象：</p>
              <pre>
                {`// Fiber节点结构简化版
export type Fiber = {
  tag: WorkTag,
  key: null | string,
  elementType: any,
  type: any,
  stateNode: any,
  // ...
  memoizedState: any, // 指向第一个Hook对象
  // ...
};`}
              </pre>
              
              <h3>3. useState 的实现原理</h3>
              <p>useState 是基于 useReducer 实现的，其核心代码如下：</p>
              <pre>
                {`function basicStateReducer<S>(state: S, action: BasicStateAction<S>): S {
  return typeof action === 'function' ? action(state) : action;
}

function mountState<S>(
  initialState: (() => S) | S,
): [S, Dispatch<BasicStateAction<S>>] {
  const hook = mountWorkInProgressHook();
  if (typeof initialState === 'function') {
    initialState = initialState();
  }
  hook.memoizedState = hook.baseState = initialState;
  const queue = (hook.queue = {
    pending: null,
    interleaved: null,
    lanes: NoLanes,
    dispatch: null,
    lastRenderedReducer: basicStateReducer,
    lastRenderedState: (initialState: any),
  });
  const dispatch: Dispatch<BasicStateAction<S>> = (queue.dispatch = (dispatchAction.bind(
    null,
    currentlyRenderingFiber,
    queue,
  ): any));
  return [hook.memoizedState, dispatch];
}`}
              </pre>
              
              <h3>4. useEffect 的实现原理</h3>
              <p>useEffect 的实现涉及到调度器和副作用处理：</p>
              <pre>
                {`function mountEffect(
  create: () => (() => void) | void,
  deps: Array<mixed> | void,
): void {
  return mountEffectImpl(
    PassiveEffect | PassiveStaticEffect,
    HookPassive,
    create,
    deps,
  );
}

function mountEffectImpl(fiberFlags, hookFlags, create, deps): void {
  const hook = mountWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  currentlyRenderingFiber.flags |= fiberFlags;
  hook.memoizedState = pushEffect(
    HookHasEffect | hookFlags,
    create,
    undefined,
    nextDeps,
  );
}`}
              </pre>
              
              <h3>5. Hook 链表的维护</h3>
              <p>React 使用链表来维护一个函数组件中的所有 Hooks：</p>
              <pre>
                {`// 当前正在渲染的Fiber节点
let currentlyRenderingFiber: Fiber = (null: any);

// 当前正在处理的Hook
let workInProgressHook: Hook | null = (null: any);

// 老的Hook链表
let currentHook: Hook | null = (null: any);

// 创建一个新的Hook并添加到链表中
function mountWorkInProgressHook(): Hook {
  const hook: Hook = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };

  if (workInProgressHook === null) {
    // 第一个Hook
    currentlyRenderingFiber.memoizedState = workInProgressHook = hook;
  } else {
    // 后续Hook
    workInProgressHook = workInProgressHook.next = hook;
  }
  return workInProgressHook;
}`}
              </pre>
              
              <h2>React Hooks 加载机制详解</h2>
              
              <h3>1. 初始化阶段</h3>
              <p>当 React 首次渲染一个使用了 Hooks 的函数组件时，会进入挂载(mount)阶段：</p>
              <pre>
                {`// ReactFiberHooks.js 中的关键函数
export function renderWithHooks(
  current: Fiber | null,
  workInProgress: Fiber,
  Component: Function,
  props: any,
  secondArg: any,
  nextRenderLanes: Lanes,
): any {
  // 初始化当前渲染的 Fiber
  currentlyRenderingFiber = workInProgress;
  
  // 清空 memoizedState
  workInProgress.memoizedState = null;
  workInProgress.updateQueue = null;
  workInProgress.lanes = NoLanes;
  
  // 根据不同的 React 环境设置 dispatcher
  ReactCurrentDispatcher.current =
    current === null || current.memoizedState === null
      ? HooksDispatcherOnMount
      : HooksDispatcherOnUpdate;
      
  // 执行函数组件
  let children = Component(props, secondArg);
  
  // 渲染完成后重置 dispatcher
  ReactCurrentDispatcher.current = ContextOnlyDispatcher;
  
  return children;
}`}
              </pre>
              
              <h3>2. Dispatcher 机制</h3>
              <p>React 使用不同的 dispatcher 来区分挂载和更新阶段：</p>
              <pre>
                {`// 挂载阶段的 dispatcher
const HooksDispatcherOnMount = {
  readContext,
  useCallback: mountCallback,
  useContext: readContext,
  useEffect: mountEffect,
  useImperativeHandle: mountImperativeHandle,
  useLayoutEffect: mountLayoutEffect,
  useMemo: mountMemo,
  useReducer: mountReducer,
  useRef: mountRef,
  useState: mountState,
  // ... 其他 Hooks
};

// 更新阶段的 dispatcher
const HooksDispatcherOnUpdate = {
  readContext,
  useCallback: updateCallback,
  useContext: readContext,
  useEffect: updateEffect,
  useImperativeHandle: updateImperativeHandle,
  useLayoutEffect: updateLayoutEffect,
  useMemo: updateMemo,
  useReducer: updateReducer,
  useRef: updateRef,
  useState: updateState,
  // ... 其他 Hooks
};`}
              </pre>
              
              <h3>3. Hook 状态管理</h3>
              <p>React 通过闭包和链表来管理 Hook 的状态：</p>
              <pre>
                {`// 每次渲染时都会创建新的 Hook 链表
function mountWorkInProgressHook(): Hook {
  const hook: Hook = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };

  if (workInProgressHook === null) {
    // 这是第一个 Hook
    currentlyRenderingFiber.memoizedState = workInProgressHook = hook;
  } else {
    // 将 Hook 添加到链表末尾
    workInProgressHook = workInProgressHook.next = hook;
  }
  return workInProgressHook;
}

// 更新时复用之前的 Hook
function updateWorkInProgressHook(): Hook {
  // 获取当前 Fiber 对应的 Hook 链表
  let nextCurrentHook: null | Hook;
  if (currentHook === null) {
    const current = currentlyRenderingFiber.alternate;
    if (current !== null) {
      nextCurrentHook = current.memoizedState;
    } else {
      nextCurrentHook = null;
    }
  } else {
    nextCurrentHook = currentHook.next;
  }

  // 复用或创建新的 Hook
  let nextWorkInProgressHook: null | Hook;
  if (workInProgressHook === null) {
    nextWorkInProgressHook = currentlyRenderingFiber.memoizedState;
  } else {
    nextWorkInProgressHook = workInProgressHook.next;
  }

  if (nextWorkInProgressHook !== null) {
    // 复用已有的 Hook
    workInProgressHook = nextWorkInProgressHook;
    currentHook = nextCurrentHook;
  } else {
    // 创建新的 Hook
    currentHook = nextCurrentHook;
    const newHook: Hook = {
      memoizedState: currentHook.memoizedState,
      baseState: currentHook.baseState,
      baseQueue: currentHook.baseQueue,
      queue: currentHook.queue,
      next: null,
    };
    
    if (workInProgressHook === null) {
      currentlyRenderingFiber.memoizedState = workInProgressHook = newHook;
    } else {
      workInProgressHook = workInProgressHook.next = newHook;
    }
  }
  return workInProgressHook;
}`}
              </pre>
              
              <h3>4. 依赖项比较机制</h3>
              <p>useEffect 和 useMemo 等 Hook 通过依赖项数组来决定是否需要重新执行：</p>
              <pre>
                {`// 依赖项比较函数
function areHookInputsEqual(
  nextDeps: Array<mixed>,
  prevDeps: Array<mixed> | null,
): boolean {
  if (prevDeps === null) {
    return false;
  }
  
  for (let i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
    if (is(nextDeps[i], prevDeps[i])) {
      continue;
    }
    return false;
  }
  return true;
}

// 在 useEffect 中使用依赖项比较
function updateEffect(create, deps): void {
  const hook = updateWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  let destroy = undefined;
  
  if (currentHook !== null) {
    const prevEffect = currentHook.memoizedState;
    destroy = prevEffect.destroy;
    if (nextDeps !== null) {
      const prevDeps = prevEffect.deps;
      if (areHookInputsEqual(nextDeps, prevDeps)) {
        hook.memoizedState = pushEffect(hookFlags, create, destroy, nextDeps);
        return;
      }
    }
  }
  
  currentlyRenderingFiber.flags |= fiberFlags;
  hook.memoizedState = pushEffect(
    HookHasEffect | hookFlags,
    create,
    destroy,
    nextDeps,
  );
}`}
              </pre>
              
              <h3>5. 调度与执行机制</h3>
              <p>React Hooks 与 React 的调度系统紧密集成：</p>
              <pre>
                {`// 调度更新
function dispatchAction<S, A>(
  fiber: Fiber,
  queue: UpdateQueue<S, A>,
  action: A,
): void {
  // 创建更新对象
  const eventTime = requestEventTime();
  const lane = requestUpdateLane(fiber);
  
  const update: Update<S, A> = {
    lane,
    action,
    eagerReducer: null,
    eagerState: null,
    next: (null: any),
  };
  
  // 将更新添加到队列
  const pending = queue.pending;
  if (pending === null) {
    update.next = update;
  } else {
    update.next = pending.next;
    pending.next = update;
  }
  queue.pending = update;
  
  // 调度更新
  const alternate = fiber.alternate;
  if (
    fiber === currentlyRenderingFiber ||
    (alternate !== null && alternate === currentlyRenderingFiber)
  ) {
    // 在渲染过程中触发的更新
    didScheduleRenderPhaseUpdateDuringThisPass = didScheduleRenderPhaseUpdate = true;
  } else {
    if (
      fiber.lanes === NoLanes &&
      (alternate === null || alternate.lanes === NoLanes)
    ) {
      // 尝试优化： eagerly 计算新状态
      const lastRenderedReducer = queue.lastRenderedReducer;
      if (lastRenderedReducer !== null) {
        let prevDispatcher;
        // ... 优化逻辑
      }
    }
    scheduleUpdateOnFiber(fiber, lane, eventTime);
  }
}`}
              </pre>
              
              <h2>性能优化技巧</h2>
              <ul>
                <li>合理使用 useMemo 和 useCallback 避免不必要的重新计算</li>
                <li>避免在 Hook 中创建大对象或复杂计算</li>
                <li>使用 useTransition 处理耗时更新</li>
                <li>合理拆分组件以优化渲染性能</li>
              </ul>
            </div>
          )}
        </div>
      </div>
      
      {/* 添加样式 */}
      <style jsx>{`
        .tabs {
          display: flex;
          margin-bottom: 20px;
          border-bottom: 1px solid #ddd;
        }
        
        .tab {
          padding: 10px 20px;
          cursor: pointer;
          background-color: #f5f5f5;
          border: 1px solid #ddd;
          border-bottom: none;
          margin-right: 5px;
          border-radius: 5px 5px 0 0;
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
      `}</style>
    </Layout>
  );
};

export default ReactHooksPage;
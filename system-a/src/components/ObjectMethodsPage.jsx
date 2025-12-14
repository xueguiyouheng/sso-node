import React, { useState } from 'react';
import Navigation from './Navigation';
import './ObjectMethodsPage.css';

const ObjectMethodsPage = ({ 
  authenticated, 
  user, 
  currentPage, 
  onNavigateToProfile, 
  onNavigateToHome, 
  onNavigateToHooks,
  onNavigateToPatterns,
  onNavigateToJavascript,
  onNavigateToArray,
  onNavigateToObject,
  onLogout, 
  onLogin 
}) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const objectMethods = [
    {
      name: "Object.assign()",
      description: "用于将所有可枚举属性的值从一个或多个源对象分配到目标对象，返回目标对象",
      syntax: "Object.assign(target, ...sources)",
      example: `const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };
const returnedTarget = Object.assign(target, source);
console.log(returnedTarget); // { a: 1, b: 4, c: 5 }`,
      useCases: [
        "对象合并",
        "浅拷贝对象"
      ]
    },
    {
      name: "Object.create()",
      description: "创建一个新对象，使用现有的对象来提供新创建的对象的__proto__",
      syntax: "Object.create(proto, propertiesObject)",
      example: `const person = {
  isHuman: false,
  printIntroduction: function() {
    console.log(\`My name is \${this.name}. Am I human? \${this.isHuman}\`);
  }
};

const me = Object.create(person);
me.name = 'Matthew';
me.isHuman = true;
me.printIntroduction(); // My name is Matthew. Am I human? true`,
      useCases: [
        "基于现有对象创建新对象",
        "实现继承"
      ]
    },
    {
      name: "Object.defineProperties()",
      description: "直接在一个对象上定义新的属性或修改现有属性，并返回该对象",
      syntax: "Object.defineProperties(obj, props)",
      example: `const obj = {};
Object.defineProperties(obj, {
  property1: {
    value: true,
    writable: true
  },
  property2: {
    value: 'Hello',
    writable: false
  }
});
console.log(obj.property1); // true`,
      useCases: [
        "批量定义对象属性",
        "精确控制属性特性"
      ]
    },
    {
      name: "Object.defineProperty()",
      description: "直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象",
      syntax: "Object.defineProperty(obj, prop, descriptor)",
      example: `const obj = {};
Object.defineProperty(obj, 'property1', {
  value: 42,
  writable: false
});
obj.property1 = 77; // 无效，因为 writable 是 false
console.log(obj.property1); // 42`,
      useCases: [
        "定义单个对象属性",
        "控制属性的可写性、可枚举性等"
      ]
    },
    {
      name: "Object.entries()",
      description: "返回一个给定对象自身可枚举属性的键值对数组",
      syntax: "Object.entries(obj)",
      example: `const obj = { foo: 'bar', baz: 42 };
console.log(Object.entries(obj)); // [ ['foo', 'bar'], ['baz', 42] ]`,
      useCases: [
        "将对象转换为键值对数组",
        "遍历对象属性"
      ]
    },
    {
      name: "Object.freeze()",
      description: "冻结一个对象，不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性",
      syntax: "Object.freeze(obj)",
      example: `const obj = { prop: 42 };
Object.freeze(obj);
obj.prop = 33; // 无效，严格模式下会报错
console.log(obj.prop); // 42`,
      useCases: [
        "创建不可变对象",
        "防止对象被意外修改"
      ]
    },
    {
      name: "Object.fromEntries()",
      description: "把键值对列表转换为一个对象",
      syntax: "Object.fromEntries(iterable)",
      example: `const entries = new Map([
  ['foo', 'bar'],
  ['baz', 42]
]);
const obj = Object.fromEntries(entries);
console.log(obj); // { foo: 'bar', baz: 42 }`,
      useCases: [
        "将键值对数组转换为对象",
        "Map转对象"
      ]
    },
    {
      name: "Object.getOwnPropertyDescriptor()",
      description: "返回指定对象上一个自有属性对应的属性描述符",
      syntax: "Object.getOwnPropertyDescriptor(obj, prop)",
      example: `const obj = { bar: 42 };
const descriptor = Object.getOwnPropertyDescriptor(obj, 'bar');
console.log(descriptor); // { value: 42, writable: true, enumerable: true, configurable: true }`,
      useCases: [
        "获取对象属性的描述符",
        "检查属性特性"
      ]
    },
    {
      name: "Object.getOwnPropertyDescriptors()",
      description: "获取一个对象的所有自身属性的描述符",
      syntax: "Object.getOwnPropertyDescriptors(obj)",
      example: `const obj = { foo: 'bar', baz: 42 };
const descriptors = Object.getOwnPropertyDescriptors(obj);
console.log(descriptors);
// {
//   foo: { value: 'bar', writable: true, enumerable: true, configurable: true },
//   baz: { value: 42, writable: true, enumerable: true, configurable: true }
// }`,
      useCases: [
        "获取对象所有属性的描述符",
        "深拷贝对象属性特性"
      ]
    },
    {
      name: "Object.getOwnPropertyNames()",
      description: "返回一个由指定对象的所有自身属性的属性名组成的数组",
      syntax: "Object.getOwnPropertyNames(obj)",
      example: `const obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.getOwnPropertyNames(obj)); // ['0', '1', '2']`,
      useCases: [
        "获取对象所有属性名（包括不可枚举属性）",
        "遍历对象所有属性"
      ]
    },
    {
      name: "Object.getOwnPropertySymbols()",
      description: "返回一个给定对象自身的所有 Symbol 属性的数组",
      syntax: "Object.getOwnPropertySymbols(obj)",
      example: `const obj = {};
const a = Symbol('a');
const b = Symbol.for('b');
obj[a] = 'localSymbol';
obj[b] = 'globalSymbol';
const objectSymbols = Object.getOwnPropertySymbols(obj);
console.log(objectSymbols); // [Symbol(a), Symbol(b)]`,
      useCases: [
        "获取对象的所有Symbol属性",
        "处理Symbol类型的属性"
      ]
    },
    {
      name: "Object.getPrototypeOf()",
      description: "返回指定对象的原型（内部[[Prototype]]属性的值）",
      syntax: "Object.getPrototypeOf(obj)",
      example: `const prototype1 = {};
const object1 = Object.create(prototype1);
console.log(Object.getPrototypeOf(object1) === prototype1); // true`,
      useCases: [
        "获取对象的原型",
        "检查继承关系"
      ]
    },
    {
      name: "Object.hasOwn()",
      description: "如果指定的对象自身有指定的属性，则返回 true，否则返回 false",
      syntax: "Object.hasOwn(obj, prop)",
      example: `const object1 = { prop: 'exists' };
console.log(Object.hasOwn(object1, 'prop')); // true
console.log(Object.hasOwn(object1, 'toString')); // false`,
      useCases: [
        "检查对象是否有指定属性（不包括继承的属性）",
        "替代 hasOwnProperty"
      ]
    },
    {
      name: "Object.hasOwnProperty()",
      description: "返回一个布尔值，指示对象自身属性中是否具有指定的属性",
      syntax: "obj.hasOwnProperty(prop)",
      example: `const obj = { prop: 'exists' };
console.log(obj.hasOwnProperty('prop')); // true
console.log(obj.hasOwnProperty('toString')); // false`,
      useCases: [
        "检查对象是否有指定属性",
        "区分自有属性和继承属性"
      ]
    },
    {
      name: "Object.is()",
      description: "判断两个值是否为同一个值",
      syntax: "Object.is(value1, value2)",
      example: `console.log(Object.is('foo', 'foo')); // true
console.log(Object.is(0, -0)); // false
console.log(Object.is(NaN, NaN)); // true`,
      useCases: [
        "比较两个值是否相等",
        "处理特殊情况（如NaN、0和-0）"
      ]
    },
    {
      name: "Object.isExtensible()",
      description: "判断一个对象是否是可扩展的（是否可以在它上面添加新的属性）",
      syntax: "Object.isExtensible(obj)",
      example: `const obj = {};
console.log(Object.isExtensible(obj)); // true
Object.preventExtensions(obj);
console.log(Object.isExtensible(obj)); // false`,
      useCases: [
        "检查对象是否可扩展",
        "验证对象的可扩展性"
      ]
    },
    {
      name: "Object.isFrozen()",
      description: "判断一个对象是否被冻结",
      syntax: "Object.isFrozen(obj)",
      example: `const obj = { prop: 42 };
console.log(Object.isFrozen(obj)); // false
Object.freeze(obj);
console.log(Object.isFrozen(obj)); // true`,
      useCases: [
        "检查对象是否被冻结",
        "验证对象的冻结状态"
      ]
    },
    {
      name: "Object.isSealed()",
      description: "判断一个对象是否被密封",
      syntax: "Object.isSealed(obj)",
      example: `const obj = { prop: 42 };
console.log(Object.isSealed(obj)); // false
Object.seal(obj);
console.log(Object.isSealed(obj)); // true`,
      useCases: [
        "检查对象是否被密封",
        "验证对象的密封状态"
      ]
    },
    {
      name: "Object.keys()",
      description: "返回一个由一个给定对象的自身可枚举属性组成的数组",
      syntax: "Object.keys(obj)",
      example: `const obj = { a: 'somestring', b: 42, c: false };
console.log(Object.keys(obj)); // ['a', 'b', 'c']`,
      useCases: [
        "获取对象的所有可枚举属性名",
        "遍历对象属性"
      ]
    },
    {
      name: "Object.preventExtensions()",
      description: "让一个对象变的不可扩展，也就是永远不能再添加新的属性",
      syntax: "Object.preventExtensions(obj)",
      example: `const obj = {};
Object.preventExtensions(obj);
obj.property1 = 42; // 无效，严格模式下会报错
console.log(obj.property1); // undefined`,
      useCases: [
        "防止对象被扩展",
        "锁定对象结构"
      ]
    },
    {
      name: "Object.propertyIsEnumerable()",
      description: "返回一个布尔值，表示指定的属性是否可枚举",
      syntax: "obj.propertyIsEnumerable(prop)",
      example: `const obj = {};
obj.property1 = 42;
console.log(obj.propertyIsEnumerable('property1')); // true
console.log(obj.propertyIsEnumerable('toString')); // false`,
      useCases: [
        "检查属性是否可枚举",
        "区分可枚举和不可枚举属性"
      ]
    },
    {
      name: "Object.seal()",
      description: "封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置",
      syntax: "Object.seal(obj)",
      example: `const obj = { prop: 42 };
Object.seal(obj);
obj.prop = 33; // 有效
obj.newProp = 'new'; // 无效，严格模式下会报错
console.log(obj.prop); // 33`,
      useCases: [
        "封闭对象，防止添加或删除属性",
        "保护对象结构"
      ]
    },
    {
      name: "Object.setPrototypeOf()",
      description: "设置一个指定的对象的原型（即内部[[Prototype]]属性）",
      syntax: "Object.setPrototypeOf(obj, prototype)",
      example: `const obj = {};
const prototypeObj = { foo: 'bar' };
Object.setPrototypeOf(obj, prototypeObj);
console.log(obj.foo); // 'bar'`,
      useCases: [
        "设置对象的原型",
        "动态修改继承关系"
      ]
    },
    {
      name: "Object.toLocaleString()",
      description: "返回一个表示该对象的字符串，此方法被派生对象覆盖",
      syntax: "obj.toLocaleString()",
      example: `const date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));
console.log(date.toLocaleString('zh-CN')); // 2012/12/20 上午3:00:00`,
      useCases: [
        "根据本地化格式转换对象为字符串",
        "日期和数字的本地化显示"
      ]
    },
    {
      name: "Object.toString()",
      description: "返回一个表示该对象的字符串",
      syntax: "obj.toString()",
      example: `const obj = { prop: 'value' };
console.log(obj.toString()); // '[object Object]'`,
      useCases: [
        "将对象转换为字符串表示",
        "调试和日志记录"
      ]
    },
    {
      name: "Object.valueOf()",
      description: "返回指定对象的原始值",
      syntax: "obj.valueOf()",
      example: `const obj = { prop: 'value' };
console.log(obj.valueOf()); // { prop: 'value' }`,
      useCases: [
        "获取对象的原始值",
        "类型转换"
      ]
    },
    {
      name: "Object.values()",
      description: "返回一个给定对象自身的所有可枚举属性值的数组",
      syntax: "Object.values(obj)",
      example: `const obj = { a: 'somestring', b: 42, c: false };
console.log(Object.values(obj)); // ['somestring', 42, false]`,
      useCases: [
        "获取对象的所有可枚举属性值",
        "数据提取和转换"
      ]
    }
  ];

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
            <h2>JavaScript Object 方法详解</h2>
            <p>Object 构造函数创建一个对象包装器。Object 对象提供了许多静态方法来操作对象。</p>
          </div>
          
          <div className="profile-section">
            <h3>Object 方法列表</h3>
            <div className="accordion-container">
              {objectMethods.map((method, index) => (
                <div key={index} className="accordion-item">
                  <button 
                    className={`accordion-header ${openIndex === index ? 'active' : ''}`}
                    onClick={() => toggleAccordion(index)}
                  >
                    <span className="method-name">{method.name}</span>
                    <span className="method-description">{method.description}</span>
                    <span className="accordion-icon">{openIndex === index ? '−' : '+'}</span>
                  </button>
                  
                  {openIndex === index && (
                    <div className="accordion-content">
                      <div className="method-details">
                        <h4>语法</h4>
                        <pre><code>{method.syntax}</code></pre>
                        
                        <h4>示例</h4>
                        <pre><code>{method.example}</code></pre>
                        
                        <h4>使用场景</h4>
                        <ul>
                          {method.useCases.map((useCase, i) => (
                            <li key={i}>{useCase}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObjectMethodsPage;
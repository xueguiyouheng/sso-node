import React, { useState } from 'react';
import Navigation from './Navigation';
import './ArrayMethodsPage.css';

const ArrayMethodsPage = ({ 
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

  const arrayMethods = [
    {
      name: "concat()",
      description: "用于合并两个或多个数组，返回一个新数组",
      syntax: "array1.concat(array2, array3, ..., arrayX)",
      example: `const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const newArr = arr1.concat(arr2);
console.log(newArr); // [1, 2, 3, 4, 5, 6]`,
      useCases: [
        "合并多个数组",
        "向数组末尾添加元素"
      ]
    },
    {
      name: "copyWithin()",
      description: "浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度",
      syntax: "arr.copyWithin(target, start, end)",
      example: `const arr = [1, 2, 3, 4, 5];
arr.copyWithin(0, 3, 4);
console.log(arr); // [4, 2, 3, 4, 5]`,
      useCases: [
        "在数组内部复制元素",
        "移动数组中的元素"
      ]
    },
    {
      name: "entries()",
      description: "返回一个新的Array Iterator对象，该对象包含数组中每个索引的键值对",
      syntax: "arr.entries()",
      example: `const arr = ['a', 'b', 'c'];
const iterator = arr.entries();
console.log(iterator.next().value); // [0, 'a']
console.log(iterator.next().value); // [1, 'b']`,
      useCases: [
        "遍历数组的键值对",
        "获取数组索引和值的映射"
      ]
    },
    {
      name: "every()",
      description: "测试一个数组内的所有元素是否都能通过某个指定函数的测试，返回布尔值",
      syntax: "arr.every(callback(element, index, array), thisArg)",
      example: `const arr = [1, 2, 3, 4, 5];
const isAllPositive = arr.every(num => num > 0);
console.log(isAllPositive); // true`,
      useCases: [
        "验证数组中所有元素是否满足条件",
        "表单验证"
      ]
    },
    {
      name: "fill()",
      description: "用一个固定值填充一个数组中从起始索引到终止索引内的全部元素",
      syntax: "arr.fill(value, start, end)",
      example: `const arr = [1, 2, 3, 4];
arr.fill(0, 2, 4);
console.log(arr); // [1, 2, 0, 0]`,
      useCases: [
        "初始化数组",
        "重置数组中的某些元素"
      ]
    },
    {
      name: "filter()",
      description: "创建一个新数组，其包含通过所提供函数实现的测试的所有元素",
      syntax: "arr.filter(callback(element, index, array), thisArg)",
      example: `const arr = [1, 2, 3, 4, 5];
const evenNumbers = arr.filter(num => num % 2 === 0);
console.log(evenNumbers); // [2, 4]`,
      useCases: [
        "筛选符合条件的元素",
        "数据过滤"
      ]
    },
    {
      name: "find()",
      description: "返回数组中满足提供的测试函数的第一个元素的值，否则返回undefined",
      syntax: "arr.find(callback(element, index, array), thisArg)",
      example: `const arr = [1, 2, 3, 4, 5];
const found = arr.find(num => num > 3);
console.log(found); // 4`,
      useCases: [
        "查找第一个符合条件的元素",
        "搜索特定对象"
      ]
    },
    {
      name: "findIndex()",
      description: "返回数组中满足提供的测试函数的第一个元素的索引，否则返回-1",
      syntax: "arr.findIndex(callback(element, index, array), thisArg)",
      example: `const arr = [1, 2, 3, 4, 5];
const index = arr.findIndex(num => num > 3);
console.log(index); // 3`,
      useCases: [
        "查找元素的位置",
        "定位特定对象的索引"
      ]
    },
    {
      name: "flat()",
      description: "会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回",
      syntax: "arr.flat(depth)",
      example: `const arr = [1, 2, [3, 4, [5, 6]]];
const flatArr = arr.flat(2);
console.log(flatArr); // [1, 2, 3, 4, 5, 6]`,
      useCases: [
        "扁平化嵌套数组",
        "处理多维数组"
      ]
    },
    {
      name: "flatMap()",
      description: "首先使用映射函数映射每个元素，然后将结果压缩成一个新数组",
      syntax: "arr.flatMap(callback(currentValue, index, array), thisArg)",
      example: `const arr = [1, 2, 3];
const result = arr.flatMap(num => [num, num * 2]);
console.log(result); // [1, 2, 2, 4, 3, 6]`,
      useCases: [
        "映射并扁平化数组",
        "处理复杂的数据转换"
      ]
    },
    {
      name: "forEach()",
      description: "对数组的每个元素执行一次给定的函数",
      syntax: "arr.forEach(callback(currentValue, index, array), thisArg)",
      example: `const arr = [1, 2, 3];
arr.forEach(num => console.log(num * 2)); // 2, 4, 6`,
      useCases: [
        "遍历数组元素",
        "执行副作用操作"
      ]
    },
    {
      name: "includes()",
      description: "用来判断一个数组是否包含一个指定的值，根据情况返回true或false",
      syntax: "arr.includes(valueToFind, fromIndex)",
      example: `const arr = [1, 2, 3];
console.log(arr.includes(2)); // true`,
      useCases: [
        "检查数组中是否存在某个值",
        "条件判断"
      ]
    },
    {
      name: "indexOf()",
      description: "返回在数组中可以找到一个给定元素的第一个索引，如果不存在则返回-1",
      syntax: "arr.indexOf(searchElement, fromIndex)",
      example: `const arr = [1, 2, 3, 2];
console.log(arr.indexOf(2)); // 1`,
      useCases: [
        "查找元素第一次出现的位置",
        "检测元素是否存在"
      ]
    },
    {
      name: "join()",
      description: "将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串",
      syntax: "arr.join(separator)",
      example: `const arr = ['a', 'b', 'c'];
console.log(arr.join('-')); // 'a-b-c'`,
      useCases: [
        "将数组转换为字符串",
        "创建CSV格式数据"
      ]
    },
    {
      name: "keys()",
      description: "返回一个包含数组中每个索引键的Array Iterator对象",
      syntax: "arr.keys()",
      example: `const arr = ['a', 'b', 'c'];
const iterator = arr.keys();
for (const key of iterator) {
  console.log(key); // 0, 1, 2
}`,
      useCases: [
        "获取数组的所有索引",
        "遍历数组键"
      ]
    },
    {
      name: "lastIndexOf()",
      description: "返回指定元素在数组中的最后一个索引，如果不存在则返回-1",
      syntax: "arr.lastIndexOf(searchElement, fromIndex)",
      example: `const arr = [1, 2, 3, 2];
console.log(arr.lastIndexOf(2)); // 3`,
      useCases: [
        "查找元素最后一次出现的位置",
        "从后往前搜索元素"
      ]
    },
    {
      name: "map()",
      description: "创建一个新数组，其结果是该数组中的每个元素都调用一次提供的函数后的返回值",
      syntax: "arr.map(callback(currentValue, index, array), thisArg)",
      example: `const arr = [1, 2, 3];
const doubled = arr.map(num => num * 2);
console.log(doubled); // [2, 4, 6]`,
      useCases: [
        "转换数组元素",
        "数据映射"
      ]
    },
    {
      name: "pop()",
      description: "从数组中删除最后一个元素，并返回该元素的值",
      syntax: "arr.pop()",
      example: `const arr = [1, 2, 3];
const lastElement = arr.pop();
console.log(lastElement); // 3
console.log(arr); // [1, 2]`,
      useCases: [
        "移除数组末尾元素",
        "栈操作"
      ]
    },
    {
      name: "push()",
      description: "将一个或多个元素添加到数组的末尾，并返回该数组的新长度",
      syntax: "arr.push(element1, ..., elementN)",
      example: `const arr = [1, 2, 3];
const newLength = arr.push(4, 5);
console.log(newLength); // 5
console.log(arr); // [1, 2, 3, 4, 5]`,
      useCases: [
        "向数组末尾添加元素",
        "栈操作"
      ]
    },
    {
      name: "reduce()",
      description: "对数组中的每个元素执行一个由您提供的reducer函数，将其结果汇总为单个返回值",
      syntax: "arr.reduce(callback(accumulator, currentValue, currentIndex, array), initialValue)",
      example: `const arr = [1, 2, 3, 4];
const sum = arr.reduce((acc, num) => acc + num, 0);
console.log(sum); // 10`,
      useCases: [
        "累加数组元素",
        "数据聚合"
      ]
    },
    {
      name: "reduceRight()",
      description: "接受一个函数作为累加器和数组的每个值从右到左将其减少为单个值",
      syntax: "arr.reduceRight(callback(accumulator, currentValue, currentIndex, array), initialValue)",
      example: `const arr = ['1', '2', '3', '4'];
const rightConcat = arr.reduceRight((acc, val) => acc + val);
console.log(rightConcat); // '4321'`,
      useCases: [
        "从右到左累加数组元素",
        "反向数据聚合"
      ]
    },
    {
      name: "reverse()",
      description: "将数组中元素的位置颠倒，并返回该数组",
      syntax: "arr.reverse()",
      example: `const arr = [1, 2, 3];
arr.reverse();
console.log(arr); // [3, 2, 1]`,
      useCases: [
        "反转数组顺序",
        "逆序处理数据"
      ]
    },
    {
      name: "shift()",
      description: "从数组中删除第一个元素，并返回该元素的值",
      syntax: "arr.shift()",
      example: `const arr = [1, 2, 3];
const firstElement = arr.shift();
console.log(firstElement); // 1
console.log(arr); // [2, 3]`,
      useCases: [
        "移除数组首元素",
        "队列操作"
      ]
    },
    {
      name: "slice()",
      description: "返回一个新的数组对象，这一对象是一个由begin和end决定的原数组的浅拷贝",
      syntax: "arr.slice(start, end)",
      example: `const arr = [1, 2, 3, 4, 5];
const sliced = arr.slice(1, 4);
console.log(sliced); // [2, 3, 4]`,
      useCases: [
        "提取数组片段",
        "复制数组部分元素"
      ]
    },
    {
      name: "some()",
      description: "测试数组中是不是至少有一个元素通过了被提供的函数测试，返回布尔值",
      syntax: "arr.some(callback(element, index, array), thisArg)",
      example: `const arr = [1, 2, 3, 4, 5];
const hasEven = arr.some(num => num % 2 === 0);
console.log(hasEven); // true`,
      useCases: [
        "检查是否有元素满足条件",
        "快速验证"
      ]
    },
    {
      name: "sort()",
      description: "用原地算法对数组的元素进行排序，并返回数组",
      syntax: "arr.sort(compareFunction)",
      example: `const arr = [3, 1, 4, 1, 5];
arr.sort((a, b) => a - b);
console.log(arr); // [1, 1, 3, 4, 5]`,
      useCases: [
        "对数组元素排序",
        "自定义排序规则"
      ]
    },
    {
      name: "splice()",
      description: "通过删除或替换现有元素或者原地添加新的元素来修改数组，并以数组形式返回被修改的内容",
      syntax: "arr.splice(start, deleteCount, item1, item2, ...)",
      example: `const arr = [1, 2, 3, 4, 5];
const removed = arr.splice(2, 1, 6, 7);
console.log(removed); // [3]
console.log(arr); // [1, 2, 6, 7, 4, 5]`,
      useCases: [
        "插入、删除或替换数组元素",
        "动态修改数组"
      ]
    },
    {
      name: "toString()",
      description: "返回一个字符串，表示指定的数组及其元素",
      syntax: "arr.toString()",
      example: `const arr = [1, 2, 3];
console.log(arr.toString()); // '1,2,3'`,
      useCases: [
        "将数组转换为字符串",
        "显示数组内容"
      ]
    },
    {
      name: "unshift()",
      description: "将一个或多个元素添加到数组的开头，并返回该数组的新长度",
      syntax: "arr.unshift(element1, ..., elementN)",
      example: `const arr = [1, 2, 3];
const newLength = arr.unshift(4, 5);
console.log(newLength); // 5
console.log(arr); // [4, 5, 1, 2, 3]`,
      useCases: [
        "向数组开头添加元素",
        "队列操作"
      ]
    },
    {
      name: "values()",
      description: "返回一个新的Array Iterator对象，该对象包含数组每个索引的值",
      syntax: "arr.values()",
      example: `const arr = ['a', 'b', 'c'];
const iterator = arr.values();
for (const value of iterator) {
  console.log(value); // 'a', 'b', 'c'
}`,
      useCases: [
        "遍历数组值",
        "获取数组元素迭代器"
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
            <h2>JavaScript Array 方法详解</h2>
            <p>Array 对象是用于构造数组的全局对象，数组是类似于列表的高阶对象。JavaScript 提供了许多内置方法来操作数组。</p>
          </div>
          
          <div className="profile-section">
            <h3>Array 方法列表</h3>
            <div className="accordion-container">
              {arrayMethods.map((method, index) => (
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

export default ArrayMethodsPage;
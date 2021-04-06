手写一个redux，实现页面状态管理
- [0.业务代码](#0业务代码)
- [1.redux三原则](#1redux三原则)
- [2. `store`](#2-store)
- [3.reducer](#3reducer)
- [4.渲染页面](#4渲染页面)
- [redux优缺点分析](#redux优缺点分析)
- [源码](#源码)


[参照上一篇文章的例子，我们使用redux+react实现一个购物页面](https://blog.csdn.net/w440149517/article/details/115076403)
![图片](https://img-blog.csdnimg.cn/20210322140353714.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3c0NDAxNDk1MTc=,size_16,color_FFFFFF,t_70)

## 0.业务代码
该页面可以使用三个组件展示，分别是通知栏组件、购物栏组件、订单列表
```js
// 通知栏-Notice.js
import React from 'react';
const style={marginRight:16}
export const Notice = (props = {}) => {
    const {count = 0, tip = ''} = props
    return <div>
        <span style={style}>总商品数:{count}</span>
        <span>{tip}</span>
    </div>
}


// 订单列表-OrderList.js
import React from 'react';
export const OrderList = (props = {}) => {
    const {phone = 0, toy = 0, shoes = 0} = props;
    return <div>
        <ul>
            <li>手机{phone}部,价格{phone * 8000}元</li>
            <li>玩具{toy}个,价格{toy * 200}元</li>
            <li>鞋子{shoes}双,价格{shoes * 400}元</li>
        </ul>
    </div>
}


// 购物栏-Shopping.js
import React from 'react';
import Store from '../store';
import * as types from '../store/types';
import createAction from '../store/createAction'

const style={marginRight:16}
const store = Store();
export const Shopping = (props = {}) => {
    const bugPhone = () => {
        store.dispatch(createAction(types.ADD_PHONE,'tip')('您刚刚购买了一部手机'));
    }
    const bugToy = () => {
        store.dispatch(createAction(types.ADD_TOY,'tip')('您刚刚购买了一个玩具'));
    }
    const bugShoes = () => {
        store.dispatch(createAction(types.ADD_SHOES,'tip')('您刚刚购买了一双鞋子'));
    }
    return <div>
        手机8000元/部<button onClick={bugPhone} style={style}>购买</button>
        玩具200元/个<button onClick={bugToy} style={style}>购买</button>
        写字400元/双<button onClick={bugShoes}>购买</button>
    </div>
}
```

## 1.redux三原则
先了解redux的概念
- 1.必须有一个`state`对象，整个应用的状态都是整个对象提供的
- 2.改变状态必须使用`action`对象，它有一个必须的字段`type`,例如`action = { type: 'add' }`
- 3.必须得有一个`reducer`函数，并且是一个纯函数。它接收`state`和`action`,并且根据`action`返回新的`state`。

## 2. `store`
store是Redux的核心对象，作用是将上述三原则聚合起来，因此是`store`最少应该具备以下三个方法
- 1.`getState()`: 获取应用的当前状态
- 2.`dispatch(action)`:发送一个`action`改变应用的`state`
- 3.`subscribe(callback)`:注册一个回调函数，状态改变后Redux会主动调用该回调函数。例如在回调函数中更新UI。
```js
// createStore.js
/**
 * 创建store
 * @param {Function} reducer (state, action) => state
 */
export const createStore = (reducer) => {
    let state = {};
    let listeners = [];
    return {
        getState:() => state,
        dispatch: (action) => {// 发送一个action
            state = reducer(state, action);
            listeners.forEach(listener => listener()); 
        },
        subscribe: (callback) => {
            listeners.push(callback);
            return () => {// 撤销订阅
                listeners = listeners.filter(fn => fn !== callback);
            }
        }
    }
}
```
为了保证整个应用都使用一个state更新，我们下面把创建`store`的方法写成单例模式。`combineReducers`方法稍后再讲
```js
// index.js
const Store = (function(func, reducer){
    let singleton = func.apply(this, [reducer, ...arguments]);
    return () => singleton || (singleton = func.apply(this, [reducer, ...arguments]))
})(createStore, combineReducers(reducers))

export default Store;

```

## 3.reducer
上面的`createStore()`方法接收一个reducer参数，reducer就是接收action，并根据action返回新的`state`的函数
```js
const counter = (state = {}, action = {}) => {
    const tip = action.tip
    switch (action.type) {
        case types.ADD_PHONE:
            let { phone = 0 } = state;
            phone += 1;
            return { ...state, phone, tip};
        case types.ADD_TOY:
            let { toy = 0 } = state;
            toy += 1;
            return { ...state, toy, tip};
        case types.ADD_SHOES:
            let { shoes = 0 } = state;
            shoes += 1;
            return { ...state, shoes, tip};
        default:
            return state;
    }
}
const reducers = { counter }
export default reducers;
```
上面只有一个reducer，即`counter`,如果有多个，需要使用`combineReducers()`方法合并成一个reducer。
- 1.`combineReducers(reducers)`:接收一个包含多个reducer的对象
- 2.保证每个子reducer只控制自己的state就可以
```js
// combineReducers.js
const combineReducers = (reducers) => {
    return (state, action = {}) => {
        // state的key就是reducers对象的key
        return Object.keys(reducers).reduce((initState, key) => {
            initState[key] = reducers[key](state[key], action);
            return initState;
        }, {});
    }
}
export default combineReducers;
```
## 4.渲染页面
```js
// app.js
const store = Store();
function App() {
  const {counter = {}} = store.getState();
  const {tip = '', phone = 0, toy = 0, shoes = 0} = counter;
  return (
    <div className="App">
      <Notice count={phone+toy+shoes} tip={tip}/>
      <Shopping/>
      <OrderList {...counter}/>

    </div>
  );
}
export default App;


// 应用入口-index.js
export const store = Store();
const render = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}
store.subscribe(render);// 监听state变化
render();// 默认要渲染一次，不然组件不显示

```


## redux优缺点分析
redux是典型的单项数据流，即state变化后更新UI
![](https://img-blog.csdnimg.cn/20191030112008942.png)

    图片借用`https://blog.csdn.net/YYece/article/details/102802903`，侵删。
优点：
单项数据流的好处是数据状态都放在store中进行集中管理，逻辑清晰

缺点：
- 1.每次发送`dispath(action)`都会导致state发生变化，而state只要发生变化就要执行render函数，会导致页面多次渲染？怎么办？这里react官当提供了`diff`算法减少页面渲染次数。
- 2.使用redux无疑要写很多模板代码，例如reducer，action

## 源码
[源代码在github上](https://github.com/w440149517/redux-noticelist)
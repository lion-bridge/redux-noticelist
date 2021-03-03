# redux核心概念

### 1.redux三原则
- 1.必须有一个`state`对象，整个应用的状态都是整个对象提供的
- 2.改变状态必须使用`action`对象，它有一个必须的字段`type`,例如`action = { type: 'add' }`
- 3.必须得有一个`reducer`函数，并且是一个纯函数。它接收`state`和`action`,并且根据`action`返回新的`state`。

### 2. `store`
store是Redux的核心对象，作用是将上述三原则聚合起来，因此是`store`最少应该具备以下三个方法
- 1.`getState()`: 获取应用的当前状态
- 2.`dispatch(action)`:发送一个`action`改变应用的`state`
- 3.`subscribe(callback)`:注册一个回调函数，状态改变后Redux会主动调用该回调函数。例如在回调函数中跟新UI。

# 如何手写一个redux
## 1.创建store



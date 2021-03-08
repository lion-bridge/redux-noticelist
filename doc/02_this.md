
## 1.this的使用场景
- 1.在对象中使用this
- 2.在普通函数中使用this
- 3.在构造函数中使用this
- 4.在`call()`,`apply()`,`bind()`方法中使用this
### 1.1在对象中使用this
```js
var person = {
    name: '张三',
    setName: function(name){
        this.name = name;
    },
    getName: function(){
        return this.name;
    }
}

// 测试
console.log(person.name)
person.setName('老刘')
console.log(person.getName())


/**
 * 以下情况会导致this丢失而报错。因为这种写法相当于`var getName = function(){return this.name}`
 * 直接调用方法getName(),或导致this指向全局的this，而全局的this并没有name这个属性，因此报错
 */
var getName = person1.getName
var setName = person1.setName
console.log(setName('李思'))
console.log(getName())
```

### 1.2.在普通函数中使用this
```js
global.name = 'globalName'; 
var getName = function(){ 
 return this.name; 
}; 
console.log( getName() ); // 输出：globalName
```

### 1.3.在构造函数中使用this
```js
function Person(name){
    this.name = name;
}
Person.prototype.setName = function(name){
    this.name = name;
}
Person.prototype.getName = function(){
    return this.name;
}
// 测试
var p1 = new Person('张三')
p1.setName('李思')
console.log(p1.getName()); // 输出：李思
```
## 1.4.在`call()`,`apply()`,`bind()`方法中使用this
```js
function People(sex){
    this.sex = sex || 'unknown'
}

function Women(){
    People.apply(this, ['女']);
}


var women = new Women()
console.log(women.sex)
```
## 2、详解`call()`,`apply()`,`bind()`
这三个方法的作用都是改变this指向，其中`call()`和`apply()`功能相同只不过参数不同，其他都完全相同。
- `apply(this, args)`,第一参数是要this对象，第二个参数是可变参数，已数组的形式传入
- `call(this, arg1,arg2,arg3,...)`,第一参数是要this对象,后面的参数相当于将`apply()`方法里的可变参数平铺展开
    ```js
    A.apply(this, ['张三','20岁']);
    // 使用call方法应该写成
    A.call(this, '张三','20岁')
    ```

`bind()`方法只接收一个参数，用来改变this指向。其实现原理可以理解为内部使用`apply()`方法实现的
```js
Function.prototype.bind = function (context) {
    var _this = this;// this就是Function创建的对象
    return function () {
        _this.apply(context, arguments);// 把this指向传进来的对象
    }
}
```



## 参考文献
[1] JavaScript设计模式与开发实践. 曾探[D]



## js组合继承和组合寄生继承

js设计之初是没有继承的概念的，如果要实现ES6中`class A extends B`的形式，需要借用`prototype`和`Function.prototype.apply()`方法或`Function.prototype.call()`方法。

- 原型链继承方式：`B.prototype = A.prototype;`,目的是继承父类方法
- 构造函数继承方式:`A.apply(this, arguments)`,目的是继承父类成员变量

我们先看两个类
```js
 // 父类
 var A = function(name){
     this.name = name;// 父类属性
 }
 // 父类方法
 A.prototype.setName = function(name){
    this.name = name
 }
 // 子类
 var B = function (){
     A.apply(this, arguments);// 继承属性
 }
 // 子类方法
 B.prototype.getName = function(){
     return this.name;
 }
```
我们的目的是实现子类A继承父类B的属性`name`和方法`setName()`，并且B自有的属性和方法不能丢失

## 1.组合继承
将原型链继承和构造函数继承两种方式结合，`apply()`方法改变父类的this指向，`prototype`继承父类成员方法
```js
// 父类
var A = function (name) {
    this.name = name;
}
A.prototype.setName = function (name) {
    this.name = name;
}
// 子类
var B = function () {
    A.apply(this, arguments);// 将A的this指向B的this， 并且A接收B的构造函数参数
}
B.prototype = A.prototype;// 继承父类方法
B.prototype.constructor = B;// 子类构造函数被覆盖掉了，恢复回来
// 必须先写上面两行，才能给子类添加成员方法
B.prototype.getName = function () {
    return this.name;
}

// 测试
var b = new B('张三')
b.setName('老刘')
console.log('name=', b.getName())
```
### 优缺点分析
**优点：**
- 写法简单，可满足基本使用

**缺点：**
- 1.顺序不能错。只能现将子类`prototype`执行父类的`prototype`，在增加子类原型方法。一旦顺序反了就会丢失子类自己的方法
- 2.原型链上`__proto__`看不到父类，实际上只是把父类的属性和方法指向了子类，并不是真正的继承


## 2.组合继承 + 寄生继承
- 1.我们可以创建一个内部函数作为寄生母体`var fun = function(){}`，
- 2.让这个母体继承父类的原型`fun.prototype = A.prototype`，
- 3.再把寄生母体的`contructor`指向子类，`fun.prototype.contructor = B`
- 4.创建寄生对象`var obj = new fun()`,这个`obj`没有任何属性，可以认为是个空对象，此时它的`__proto__`已经指向了`A`
- 5.把子类B的原型链替换为上面常见的寄生对象`obj`，`B.prototype = obj`
- 6.寄生继承完成，结束

```js
// 父类
 var A = function(name){
     this.name = name;// 父类属性
 }
 // 父类方法
 A.prototype.setName = function(name){
    this.name = name
 }
// 调用此方法进行继承
var _extends = function(sub, sup){
    // 寄生函数
    var fun = function(){ }
    fun.prototype = sup.prototype;// 原型链继承
    fun.prototype.contructor = sub;// contructor丢失，恢复

    sub.prototype = new fun();// 寄生函数创建的实例，里面只有原型链(__proto__)
}
// 子类
var B = function (){
    A.apply(this, arguments);// 继承属性
}
_extends(B, A);
 // 子类方法
 B.prototype.getName = function(){
     return this.name;
 }

 var b = new B('张三')
 b.setName('李思')
 console.log(b.getName())
```

### 优缺点分析
**优点：**
- 1.解决掉`组合继承`不是真正继承的毛病
- 2.继承后的原型链比较清晰易懂

**缺点：**
- 额外增加一个寄生函数，占用更多内存

## 参考资料
- [TypeScript中的`extends`继承原理分析](https://blog.csdn.net/w440149517/article/details/114026446)
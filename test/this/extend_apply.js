/**
 * 组合继承（apply执行构造方法继承 + 原型链继承）
 * 1.使用apply方法实现继承，属于构造函数继承，只能继承成员变量
 * 2.使用原型链继承父类的方法
 * 
 * 缺点：
 *  1.顺序不能错。只能现将子类prototype执行父类的prototype，在增加子类原型方法。一旦顺序反了就会丢失子类自己的方法
 *  2.原型链上(__proto__)看不到父类，实际上只是把父类的属性和方法指向了子类，并不是真正的继承
 * 
 * 
 */
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



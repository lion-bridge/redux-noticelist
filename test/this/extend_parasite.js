/**
 * 寄生继承
 */
// 父类
 var A = function(name){
     this.name = name;// 父类属性
 }
 // 父类方法
 A.prototype.setName = function(name){
    this.name = name
 }

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
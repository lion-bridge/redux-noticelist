/**
 * 构造函数中使用this
 * @param {} name 
 */
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
/**
 * 模拟Function.prototype.bind()方法
 */

Function.prototype.bind = function (context) {
    var _this = this;// this就是Function创建的对象
    return function () {
        _this.apply(context, arguments);// 把this指向传进来的对象
    }
}

var obj1 = { name: '张三' }
var obj2 = { name: '李思' }
function getName() {
    console.log('this.name = ', this.name)
    return this.name;
}
// 测试
var getName1 = getName.bind(obj1)
var getName2 = getName.bind(obj2)

getName1();
getName2();


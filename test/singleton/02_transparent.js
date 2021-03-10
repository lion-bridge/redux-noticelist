/**
 * 透明的单例模式，只要调用new Singleton1(),就可以获取单例对象
 */
var Singleton1 = (function () {
    var instance;
    // 闭包存在的目的就是让`instance`不销毁
    var Fun = function () {
        if (!instance) {
            instance = this;
        }
        return instance;
    }
    return Fun;
})()

// 测试
var ins3 = new Singleton1()
var ins4 = new Singleton1()

console.log(ins3 === ins4)


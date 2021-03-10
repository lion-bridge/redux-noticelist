// 闭包作用1：封装变量

/**
 * 求和函数（初级版）
 */
var sum = function(){
    var sum = 0
    for(var i = 0, len = arguments.length; i < len; i ++) {
        sum += arguments[i];
    }
    console.log('sum=',sum)
    return sum
}
// 测试
sum(1,2,3,4)

/**
 * 求和函数2：使用cache全局变量，减少计算次数
 */
var cache = {};
var sum1 = function(){
    var key = Array.prototype.join.call(arguments, ',');
    if (cache[key]) {
        return cache[key];
    }
    var sum = 0;
    for(var i = 0, len = arguments.length; i < len; i ++) {
        sum += arguments[i];
    }
    return (cache[key] = sum);
}
// 测试
console.log('sum1=',sum1(1,2,3,4))

/**
 * 求和函数3：使用闭包将cache变量变为私有变量
 */
var sum2 = (function(){
    var cache = {};
    return function(){
        var key = Array.prototype.join.call(arguments, ',');
        if (cache[key]) {
            return cache[key];
        }
        var sum = 0;
        for(var i = 0, len = arguments.length; i < len; i ++) {
            sum += arguments[i];
        }
        return (cache[key] = sum);
    }
})();
// 测试
console.log('sum2=',sum1(1,2,3,4))

/**
 * 求和函数（高级版）
 * 1.闭包将cache变量私有化
 * 2.封装求和函数最为内部函数 
 */
var sum3 = (function(){
    var sumFun = function(){
        var sum = 0;
        for(var i = 0, len = arguments.length; i < len; i ++) {
            sum += arguments[i];
        }
        return sum;
    }
    var cache = {};
    return function(){
        var key = Array.prototype.join.call(arguments, ',');
        if (cache[key]) {
            return cache[key];
        }
        return cache[key] = sumFun.apply(this, arguments);
    }
})()

console.log('sum3=', sum3(1,2,3,4))

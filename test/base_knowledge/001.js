// let 与 var的区别

/**
 * 返回：3 3 3
 * var创建的变量是全局变量。由于在js中存在事件队列，先执行`for`循环中的`++`计算，再执行setTimeout的回调方法。
 * 因此，打印出来全是3
 */
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 1);
}
/**
 * 返回：0 1 2
 * let和const变量可以创建一种`块作用域`,`for`循环中的`{ }`相当于它的作用域，因此每个循环都会创建一个变量`i`，
 */
for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 1);
}
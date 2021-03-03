var obj1 = {
    name: 'sven'
};
var obj2 = {
    name: 'anne'
};
global.name = 'window';
var getName = function () {
    console.log(this.name)
};
// console.log(getName()); // 输出: window 
console.log(getName.apply(obj1)); // 输出: sven 
console.log(getName.call(obj2)); // 输出: anne
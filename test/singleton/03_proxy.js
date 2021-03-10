// 通过代理创建单例


var A = function(){

}


var proxy = (function(){
    var instance;
    return function(fun){
        if (!instance) {
            instance = new fun();
        }
        return instance;
    }
})()

const p1 = proxy(A)
const p2 = proxy(A)
console.log(p1 === p2)
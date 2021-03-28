"use strict"


function strict1(){
    
    this.name = arguments[0];
}

const ins = new strict1('zhangsan')
console.log(ins.name)
console.log(global)
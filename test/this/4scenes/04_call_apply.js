/**
 * 在call()和apply()方法中使用this。
 * 将People的this指向Women
 */

function People(sex){
    this.sex = sex || 'unknown'
}

function Women(){
    People.call(this, '女');
}


var women = new Women()
console.log(women.sex)




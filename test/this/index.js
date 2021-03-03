global.name = 'globalName'; 

var obj = { 
    name: 1, 
    getA: function(){ 
        console.log('this=',this === obj); // 输出：true 
        console.log('name',this.name); // 输出: 1 
    } 
   }; 
obj.getA();




function fun1(age){
    this.age = age;
}
var a1 = fun1.apply(this,[10])
console.log('age=',a1.age)

function test1() {
    this.testName = 'test111'
    console.log('this.testName=',this.testName)
}
new test1()



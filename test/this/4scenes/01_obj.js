// 在普通对象中使用this

var person = {
    name: '张三',
    setName: function(name){
        this.name = name;
    },
    getName: function(){
        return this.name;
    }
}

// 测试
console.log(person.name)
person.setName('老刘')
console.log(person.getName())


/**
 * 以下情况会导致this丢失而报错。因为这种写法相当于`var getName = function(){return this.name}`
 * 直接调用方法getName(),或导致this指向全局的this，而全局的this并没有name这个属性，因此报错
 */
var getName = person1.getName
var setName = person1.setName
console.log(setName('李思'))
console.log(getName())
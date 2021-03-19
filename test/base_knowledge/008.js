class Chameleon {
    static colorChange(newColor) {
      this.newColor = newColor
      
      /**
        此处的this指向Chameleon对象，相当于
        var Chameleon = {
            newColor: undefined,
            colorChange: function(newColor){
                this.newColor = newColor;
                return this.newColor;
            }
        }
       */
      return this.newColor;
    }
  
    constructor({ newColor = 'green' } = {}) {
      this.newColor = newColor
    }
  }
  // 测试：node test/base_knowledge/008.js
  const freddie = new Chameleon({ newColor: 'purple' })
  console.log(Chameleon.colorChange('orange'))
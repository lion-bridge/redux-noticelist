// "use strict"
/**
 * 注意：在普通函数中使用this,严格模式下`this=undefined`
 */

global.name = 'globalName'; 
var getName = function(){ 
 return this.name; 
}; 
console.log( getName() ); // 输出：globalName

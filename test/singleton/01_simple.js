
/**
 * 简单版-单例模式（静态方法`Singleton.getInstance()`调用）
 * @param {string}} name 
 */
var Singleton = function(){
    this.instance = null;
}
Singleton.getInstance = function(){
    if (!this.instance) {
        this.instance = new Singleton();
    }
    return this.instance;
}

// 测试
var ins1 = Singleton.getInstance();
var ins2 = Singleton.getInstance();

console.log('ins1 === ins2:', ins1 === ins2)
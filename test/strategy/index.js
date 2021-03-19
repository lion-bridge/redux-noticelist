// 策略：格式校验规则
const strategies = {
    isNoEmpty: function(value, errorMsg) {
        return value ? '' : errorMsg
    },
    minLength: function(value, errorMsg,length) {
        return value && value.length >= length ? '' : errorMsg
    },
    isMoble: function(value, errorMsg) {
        return /(^1[3|5|8][0-9]{9}$)/.test(value) ? '' : errorMsg;
    }
}
// 校验类
const Validator = function(){
    this.rules = [];// 校验规则
}
// 添加校验规则到校验池
Validator.prototype.add = function(dom, rule, errorMsg){
    const key = Object.keys(rule)[0];
    const value = rule[key]
    this.rules.push(function(){
        // 执行key对应策略
        return strategies[key].apply(null, [dom.value, errorMsg, value])
    })
}
// 执行校验池
Validator.prototype.run = function(){
    for(let i = 0; i < this.rules.length; i ++){
        const msg = this.rules[i]()
        if (msg) return msg;
    }
}
// 进行校验
const validateLoginData = function(){
    const validator = new Validator()
    validator.add(document.getElementsByName('userName')[0], {isNoEmpty: true}, '用户名不能为空')
    validator.add(document.getElementsByName('password')[0], {minLength: 6}, '密码最少6位')
    validator.add(document.getElementsByName('phoneNumber')[0], {isMoble: true}, '手机号不正确')
    return validator.run();
}
// 绑定事件
window.onload = function(){
    document.getElementById('registerForm').onsubmit = function(){
        console.log('xxxx')
        var errorMsg = validateLoginData()
        if(errorMsg){
            alert(errorMsg)
            return false;
        }
    }
}


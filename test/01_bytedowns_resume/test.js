var length = 10;
function fn() {
  alert(this.length);
}
var obj = {
  length: 5,    
  method: function (fn) {
    fn();            //?
    arguments[0]();  //?
  }
}
obj.method(fn)
Funtion Object
fn.apply(obj, [1,2,3,])
call(this,1,2,3,4,5,6,6)
bind(obj)
hook

var [state,set] = useState();
set(obj)

store.sub()

https  http ssh
public

var arr = [1,2,4,3,4]

function node(){
    this.val;
    this.next:node
}





function test(l1){
    var dump = {next:l1}
    const loop =  (head) => {
        if (!head) return
        var temp = head.next
        head.next = temp.next
        temp.next = head.next;//2
        
        loop(temp.next)
    }
    loop(dump)
    return dump.next
}
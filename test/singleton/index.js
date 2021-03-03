import { createStore } from "./createStore.js";
import reducer from "./reducer.js";

const getSingleton = function(fn){
    let singleton;
    return () => singleton || (singleton = fn.apply(this, [reducer]))
}

const store1 = getSingleton(createStore);
const store2 = getSingleton(createStore);

console.log(store1 === store2)

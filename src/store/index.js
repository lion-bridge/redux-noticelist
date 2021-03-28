import { createStore } from "./createStore";
import reducers from './reducers';
import combineReducers from './combineReducers';


const Store = (function(func, reducer){
    let singleton = func.apply(this, [reducer, ...arguments]);
    return () => singleton || (singleton = func.apply(this, [reducer, ...arguments]))
})(createStore, combineReducers(reducers))

export default Store;

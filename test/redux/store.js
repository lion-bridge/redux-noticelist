/**
 * 目前存在疑问：
 * 1.首次执行combineReducers的子函数，会导致undefined问题
 *      目前的处理方案就是在子reducer中进行判断
 * 
 * 
 */

const combineReducers = reducers => {
    return (state, action) => {
        return Object.keys(reducers).reduce((nextState, key) => {
            nextState[key] =  reducers[key](state[key], action);
            return nextState;
        },{})
    }
}

const reducers = {
    shop: (state, action) => {
        switch(action.type){
            case 'addShop':
                return { shop: state ? ++state.shop : 1 };
            default:
                return state
        }
        
    },
    toy: (state, action) => {
        switch(action.type){
            case 'addToy':
                return { toy: state ? ++state.toy : 1 };
            default:
                return state
        }
    }
}

const Store = (reducer) => {
    let state = {};
    let listeners = [];

    const getState = () => state;
    const subscribe = (callback) => {
        listeners.push(callback);
        return () => {// 取消监听
            listeners = listeners.filter(fn => fn !== callback);
        }
    }
    const dispatch = (action ={}) => {
        state = reducer(state, action);
        listeners.forEach((callback) => callback())
    }
    return { getState, subscribe, dispatch }
}


const store = Store(combineReducers(reducers))
store.subscribe(() => {
    console.log(store.getState())
})


store.dispatch({type: 'addShop'});
store.dispatch({type: 'addToy'});
store.dispatch({type: 'addToy'});
store.dispatch({type: 'addShop'});
store.dispatch({type: 'addToy'});
store.dispatch({type: 'addToy'});
store.dispatch({type: 'addShop'});
store.dispatch({type: 'addShop'});
store.dispatch({type: 'addToy'});
store.dispatch({type: 'addToy'});
store.dispatch({type: 'addToy'});




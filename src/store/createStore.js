/**
 * 创建store
 * @param {Function} reducer (state, action) => state
 */
export const createStore = (reducer) => {
    let state = {};
    let listeners = [];
    return {
        getState:() => state,
        dispatch: (action) => {// 发送一个action
            state = reducer(state, action);
            listeners.forEach(listener => listener()); 
        },
        subscribe: (callback) => {
            listeners.push(callback);
            return () => {// 撤销订阅
                listeners = listeners.filter(fn => fn !== callback);
            }
        }
    }
}
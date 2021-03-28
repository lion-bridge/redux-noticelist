/**
 * 创建store
 * @param {Function} reducer (state, action) => state
 */
export const createStore = (reducer) => {
    let state = {};
    let listeners = [];
    return {
        getState:() => {
            return state
        },
        /**
         * 发送一个action
         * @param {Object} action 
         */
        dispatch: (action) => {
            state = reducer(state, action);
            listeners.forEach(listener => listener()); 
        },
        subscribe: (callback) => {
            listeners.push(callback);
            return () => {
                listeners = listeners.filter(fn => fn !== callback);
            }
        }
    }
}
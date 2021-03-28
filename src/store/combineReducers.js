const combineReducers = (reducers) => {
    return (state, action = {}) => {
        // state的key就是reducers对象的key
        return Object.keys(reducers).reduce((initState, key) => {
            initState[key] = reducers[key](state[key], action);
            return initState;
        }, {});
    }
}
export default combineReducers;
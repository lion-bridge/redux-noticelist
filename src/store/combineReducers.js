const combineReducers = (reducers) => {
    return (state, action = {}) => {
        return Object.keys(reducers).reduce((initState, key) => {
            initState[key] = reducers[key](state[key], action);
            return initState;
        }, {});
    }
}
export default combineReducers;
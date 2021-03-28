/**
 * 创建action
 * @param {string} type 
 */
 const createAction = (type, ...keys) => {
    return (...values) => {
        let action = { type };
        for (let i = 0; i < keys.length; i++) {
            action[keys[i]] = values[i];
        }
        return action
    }
}
export default createAction;
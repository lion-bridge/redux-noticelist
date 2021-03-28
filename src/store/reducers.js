import * as types from './types';


const counter = (state = {}, action = {}) => {
    const tip = action.tip
    switch (action.type) {
        case types.ADD_PHONE:
            let { phone = 0 } = state;
            phone += 1;
            return { ...state, phone, tip};
        case types.ADD_TOY:
            let { toy = 0 } = state;
            toy += 1;
            return { ...state, toy, tip};
        case types.ADD_SHOES:
            let { shoes = 0 } = state;
            shoes += 1;
            return { ...state, shoes, tip};
        default:
            return state;
    }
}
const reducers = { counter }
export default reducers;
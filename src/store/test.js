import Store from '.';
import createAction from './createAction';
import * as types from './types'


const store = Store();


store.subscribe(() => {
    console.log(store.getState());
})


store.dispatch(createAction(types.ADD_PHONE,'tip')('您购买了一部手机'))
store.dispatch(createAction(types.ADD_SHOES,'tip')('您购买了12部手机'))
store.dispatch(createAction(types.ADD_TOY,'tip')('您购买了2部手机'))
store.dispatch(createAction(types.ADD_PHONE,'tip')('您购买了3部手机'))
store.dispatch(createAction(types.ADD_PHONE,'tip')('您购买了4部手机'))
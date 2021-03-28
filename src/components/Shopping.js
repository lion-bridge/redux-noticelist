import React from 'react';
import Store from '../store';
import * as types from '../store/types';
import createAction from '../store/createAction'

const style={marginRight:16}
const store = Store();
export const Shopping = (props = {}) => {
    const bugPhone = () => {
        console.log('xxxxx')
        store.dispatch(createAction(types.ADD_PHONE,'tip')('您刚刚购买了一部手机'));
    }
    const bugToy = () => {
        store.dispatch(createAction(types.ADD_TOY,'tip')('您刚刚购买了一个玩具'));
    }
    const bugShoes = () => {
        store.dispatch(createAction(types.ADD_SHOES,'tip')('您刚刚购买了一双鞋子'));
    }
    return <div>
        手机8000元/部<button onClick={bugPhone} style={style}>购买</button>
        玩具200元/个<button onClick={bugToy} style={style}>购买</button>
        写字400元/双<button onClick={bugShoes}>购买</button>
    </div>
}
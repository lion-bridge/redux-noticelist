import React from 'react';
const style={marginRight:16}
export const Notice = (props = {}) => {
    const {count = 0, tip = ''} = props
    return <div>
        <span style={style}>总商品数:{count}</span>
        <span>{tip}</span>
    </div>
}
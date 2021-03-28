import React from 'react';

export const Notice = (props = {}) => {
    const {count = 0, tip = ''} = props
    return <div>
        <span>总商品数:{count}</span>
        <span>{tip}</span>
    </div>
}
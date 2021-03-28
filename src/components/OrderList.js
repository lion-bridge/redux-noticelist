import React from 'react';
export const OrderList = (props = {}) => {
    const {phone = 0, toy = 0, shoes = 0} = props;
    return <div>
        <ul>
            <li>手机{phone}部,价格{phone * 8000}元</li>
            <li>玩具{toy}个,价格{toy * 200}元</li>
            <li>鞋子{shoes}双,价格{shoes * 400}元</li>
        </ul>
    </div>
}
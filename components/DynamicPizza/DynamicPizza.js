import { Images } from '@/components/DynamicPizza/Image.js';
import {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';

// used to ensure that the toppings are sorted with dough at the
// bottom. This makes sure that images are always overlayed properly
// no matter the order they are added
const sort = (toppings) => {
    let dough = toppings.find(item => item.itemtype === "dough")
    let sauce = toppings.find(item => item.itemtype === "sauce")
    let cheese = toppings.find(item => item.itemtype === "cheese")
    let others = toppings.filter(item => {
        let filterDough = item.itemtype !== "dough"
        let filterCheese = item.itemtype !== "cheese"
        let filterSauce = item.itemtype !== "sauce"
        return filterDough && filterCheese && filterSauce
    })
    return [dough, sauce, cheese, ...others]
}

export function DynamicPizza() {
    const order = useSelector((state) => state.order.orderItems)
    const index = useSelector((state) => state.order.activeOrder)

    return (
        <>
            {order.length > 0 && sort(order[index].toppings).map(item => 
                {return <Images image={item?.images}/>}  
            )}
        </>
    );
}
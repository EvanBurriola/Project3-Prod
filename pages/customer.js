import * as View from './CustomerViews/index.js'

import React, { useState, useEffect } from 'react';

import { prisma } from '@/lib/prisma'
import { useSelector, useDispatch } from 'react-redux'
import { addItem, addPizzaTopping, clearOrder } from '@/store/slices/order' 
import { PizzaModel, ToppingModel } from '@/lib/models'

export async function getServerSideProps() {
    const inventory = await prisma.inventory.findMany({
        orderBy: {
            inventoryid: 'asc'
        }
    })
    const menu = await prisma.menuitems.findMany({
        orderBy: {
            typeid: 'asc'
        }
    })
    return {
        props: { 
            inventory,
            menu
        }
    }
}

export default function Customer({inventory, menu}) {
    const order = useSelector((state) => state.order)
    const dispatch = useDispatch()

    const dough = inventory.find(item => item.ingredientname === 'Dough')

    const [custViews, setCustView] = useState([true, false ,false, false])

    // activate or deactive checkout button based on order
    const [checkoutReady, setCheckoutReady] = useState(false)
    useEffect(() => {
        if (order.orderItems.length === 0 || order.customername === "") {
            setCheckoutReady(false)
        } else {
            setCheckoutReady(true)
        }
    }, [order.orderItems.length, order.customername])

    const handleNewPizza = (type, price) => {
        const pizza = {
            ...PizzaModel,
            pizzatype: type,
            price
        }

        const doughItem = {
            pizzatype: type,
            ingredientname: dough.ingredientname,
            inventoryid: dough.inventoryid,
            ingredientprice: dough.priceperounce,
            quantityused: dough.averageamountperunitsold,
            itemtype: dough.itemtype
        }

        dispatch(addItem(pizza))
        dispatch(addPizzaTopping(doughItem))
    }

    // redux function to add toppings to a pizza
    const handleAddTopping = (ingredient) => {
        const lastItem = order.orderItems.length - 1
        if (!order.orderItems[lastItem]) {
            return
        }
        
        const item = {
            pizzatype: order.orderItems[lastItem].pizzatype,
            ingredientname: ingredient.ingredientname,
            inventoryid: ingredient.inventoryid,
            ingredientprice: ingredient.priceperounce,
            quantityused: ingredient.averageamountperunitsold,
            itemtype: ingredient.itemtype
        }
        dispatch(addPizzaTopping(item))
    }

    // submits the order by pushing to database
    const submitOrder = async (event) => {
        event.preventDefault()
        try {
            const body = { order }
            await fetch('/api/order', {
                method: "POST",
                body: JSON.stringify(body)
            })

            dispatch(clearOrder())
            setCustView([true,false,false,false]);
        } catch (error) {
            console.log(error);
        }
    }

    const next_page = (page) => {
        let temp = [...custViews];
        temp[page] = false;
        temp[page + 1] = true;
        setCustView(temp);
    }

    const back_page = (page) => {
        let temp = [...custViews];
        temp[page] = false;
        temp[page - 1] = true;
        setCustView(temp);
    }

    const add_more = () => {
        setCustView([true,false,false,false]);
    }

    return(
        <>
            {custViews[0] ? <View.cust_start_order inventory={inventory} menu={menu} order={order} pages={custViews} checkoutReady={checkoutReady} handleNewPizza={handleNewPizza} submitOrder={submitOrder} next_click={next_page}/> : <></>}
            {custViews[1] ? <View.cust_cheese_sauce inventory={inventory} menu={menu} order={order} pages={custViews} checkoutReady={checkoutReady} handleAddTopping={handleAddTopping} submitOrder={submitOrder} next_click={next_page} back_click={back_page}/> : <></>}
            {custViews[2] ? <View.cust_toppings inventory={inventory} menu={menu} order={order} pages={custViews} checkoutReady={checkoutReady} handleAddTopping={handleAddTopping} submitOrder={submitOrder} next_click={next_page} back_click={back_page}/> : <></>}
            {custViews[3] ? <View.cust_drink inventory={inventory} menu={menu} order={order} pages={custViews} checkoutReady={checkoutReady} handleAddTopping={handleAddTopping} add_more={add_more} submitOrder={submitOrder} back_click={back_page} /> : <></>}
        </>
    );
}
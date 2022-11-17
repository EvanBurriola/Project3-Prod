import * as View from '../components/CustomerViews/index.js'
import * as Navbar from "@/components/Navbar/Navbar.js";
import * as Object from '@/components/Objects/Objects.js';

import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'

import { prisma } from '@/lib/prisma'
import { useSelector, useDispatch } from 'react-redux'
import { addItem, addPizzaTopping, clearOrder } from '@/store/slices/order' 
import { PizzaModel, ToppingModel } from '@/lib/models'
import { render } from 'react-dom';

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

    const handleNewPizza = (type, price, pageIndex) => {
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
        next_page(pageIndex)
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

    // returns a specific page view based on the current page
    const renderView = () => {
        if (custViews[1])
            return <View.cust_cheese_sauce inventory={inventory} handleAddTopping={handleAddTopping} next_click={next_page} back_click={back_page}/>
        if (custViews[2]) 
            return <View.cust_toppings inventory={inventory} handleAddTopping={handleAddTopping} next_click={next_page} back_click={back_page}/>
        if (custViews[3])
            return <View.cust_drink inventory={inventory} handleAddTopping={handleAddTopping} add_more={add_more} back_click={back_page} />
    }

    // merges a page view with the rest of the page
    // (basically merges the order info with the button
    // selection)
    const buildPage = () => {
        if (custViews[0]) {
            return <View.cust_start_order menu={menu} handleNewPizza={handleNewPizza} /> 
        } else {
            let view = renderView()

            return (
                <Row>
                    {view}
                    <Col md={4} className="d-flex flex-column align-items-end">
                        <Row className="w-100 mb-auto">
                            <h1>Current Order</h1>
                            <Col>
                                {order.orderItems.map(item => {
                                    return <Object.OrderDisplay 
                                        key={order.orderItems.indexOf(item)} 
                                        item={item}
                                        index={order.orderItems.indexOf(item)} />
                                })
                                }
                            </Col>
                        </Row>
                        <Row className="w-100">
                            <Col>
                                <Object.OrderCost order={order} />
                                <Form onSubmit={submitOrder}>
                                    <Button type="submit" disabled={!checkoutReady}>Checkout</Button>
                                </Form>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            )
        }
    }

    return(
        <Container fluid>
            <Row>
                <Col xs={12} md={12}>
                    <Navbar.NavbarCustomer sticky="top"/>
                </Col>
            </Row>
            {
                buildPage()
            }
        </Container>
    );
}
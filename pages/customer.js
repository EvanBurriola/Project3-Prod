import styles from "@/styles/customer.module.css"

import { StartOrder, CheeseSauce, Toppings, DrinkSeasonal } from '@/components/CustomerViews/'
import { NavbarCustomer } from "@/components/Navbar/Navbar.js";
import { OrderCost, OrderDisplay } from '@/components/Objects/Objects.js';

import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

import { prisma } from '@/lib/prisma'
import { useSelector, useDispatch } from 'react-redux'
import { addItem, addPizzaTopping, clearOrder } from '@/store/slices/order' 
import { PizzaModel, ToppingModel } from '@/lib/models'

import { useRouter } from 'next/router';

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
    const router = useRouter()

    const dough = inventory.find(item => item.ingredientname === 'Dough')

    const [isSubmitting, setIsSubmitting] = useState(false)
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


    // submits the order by pushing to database and sends
    // user to receipt page
    const submitOrder = async (event) => {
        event.preventDefault()
        setIsSubmitting(true)
        try {
            const body = { order }
            const response = await fetch('/api/order', {
                method: "POST",
                body: JSON.stringify(body)
            })
            const result = await response.json()
            const { orderid } = result
            router.push({
                pathname: '/order/[id]',
                query: { id: orderid }
            })
            //dispatch(clearOrder())
            setIsSubmitting(false)
        } catch (err) {
            console.log(err)
        }
            
            //setCustView([true,false,false,false]);
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
            return <CheeseSauce inventory={inventory} handleAddTopping={handleAddTopping} next_click={next_page} back_click={back_page}/>
        if (custViews[2]) 
            return <Toppings inventory={inventory} handleAddTopping={handleAddTopping} next_click={next_page} back_click={back_page}/>
        if (custViews[3])
            return <DrinkSeasonal inventory={inventory} handleAddTopping={handleAddTopping} add_more={add_more} back_click={back_page} />
    }

    // merges a page view with the rest of the page
    // (basically merges the order info with the button
    // selection)
    const buildPage = () => {
        if (custViews[0]) {
            return <StartOrder menu={menu} handleNewPizza={handleNewPizza} /> 
        } else {
            let view = renderView()

            return (
                <Row>
                    {view}
                    <Col md={4} className="d-flex flex-column align-items-end">
                        <Row className={`w-100 mb-auto`}>
                            <h1 className={`${styles.typeTitle}`}>Current Order</h1>
                            <Col className={`${styles.orderContainer}`}>
                                {order.orderItems.map(item => {
                                    return <OrderDisplay 
                                        key={order.orderItems.indexOf(item)} 
                                        item={item}
                                        index={order.orderItems.indexOf(item)} />
                                })
                                }
                            </Col>
                        </Row>
                        <Row className="w-100 mt-5">
                            <Col>
                                <OrderCost order={order} />
                                <Form onSubmit={submitOrder}>
                                    <Button type="submit" 
                                        disabled={!checkoutReady} 
                                        className={`${styles.btnNav}`}
                                        >
                                        {isSubmitting && <Spinner 
                                            as="span"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            animation="border"
                                            className="me-1"
                                            /> 
                                        }
                                        Checkout
                                    </Button>
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
                <NavbarCustomer sticky="top"/>
            </Row>
            {
                buildPage()
            }
        </Container>
    );
}
import styles from '@/styles/customer.module.css'

import * as Navbar from "@/components/Navbar/Navbar.js";
import GridSystem from '@/components/GridSystem/GridSystem.js';
import * as Object from '@/components/Objects/Objects.js';


import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'

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
export default function Cust_drink_SI({inventory, menu}) {

    const order = useSelector((state) => state.order)
    const dispatch = useDispatch()

    const dough = inventory.find(item => item.ingredientname === 'Dough')

    // activate or deactive checkout button based on order
    const [checkoutReady, setCheckoutReady] = useState(false)
    useEffect(() => {
        if (order.orderItems.length === 0 || order.customername === "") {
            setCheckoutReady(false)
        } else {
            setCheckoutReady(true)
        }
    })

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
        }

        dispatch(addItem(pizza))
        dispatch(addPizzaTopping(doughItem))
    }

    // redux function to add toppings to a pizza
    const handleAddTopping = (ingredient) => {
        const lastItem = order.orderItems.length - 1
        const item = {
            pizzatype: order.orderItems[lastItem].pizzatype,
            ingredientname: ingredient.ingredientname,
            inventoryid: ingredient.inventoryid,
            ingredientprice: ingredient.priceperounce,
            quantityused: ingredient.averageamountperunitsold,
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
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Container fluid>
                <Row>
                    <Col xs={12} md={12}>
                        <Navbar.NavbarCustomer sticky="top"/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={8} md={8}>
                        <Row>
                            <h1>Drinks and Seasonal Items</h1>
                            <GridSystem colCount={3} md={4} >
                                {inventory.length > 0 ? inventory.map(item => {
                                    if (item.itemtype == "other") {
                                        return <Object.MenuItem key={item.inventoryid} onClick={() => handleAddTopping(item)} butId={item.inventoryid} name={item.ingredientname} />
                                    }
                                }) : <p>No tracks are found.</p>
                                }
                            </GridSystem>
                        </Row>
                        <Row>
                            <Col className="d-flex justify-content-end">
                                <Button className="me-auto" href="/Cust_toppings" variant="primary" >Previous Page</Button>
                                <Button variant="primary" >Add more</Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={4} className="d-flex flex-column align-items-end">
                        <Row className="w-100 mb-auto">
                            <h1>Current Order</h1>
                            <Col>
                                {order.orderItems.map(item => {
                                    return <Object.OrderDisplay key={order.orderItems.indexOf(item)} item={item} />
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
            </Container>
        </div>

    );
}
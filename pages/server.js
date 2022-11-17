import * as Navbar from "@/components/Navbar/Navbar.js";
import GridSystem from '@/components/GridSystem/GridSystem.js';
import * as Object from '@/components/Objects/Objects.js';

import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'

import { prisma } from '@/lib/prisma'
import { useSelector, useDispatch } from 'react-redux'
import { addItem, removeItem, addPizzaTopping, clearOrder } from '@/store/slices/order' 
import { PizzaModel, ToppingModel } from '@/lib/models'

// pull inventory from db
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

export default function Server({inventory, menu}) {
    const order = useSelector((state) => state.order)
    const dispatch = useDispatch()

    const dough = inventory.find(item => item.ingredientname === 'Dough')

    const [isSubmitting, setIsSubmitting] = useState(false)

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
            setIsSubmitting(true)
            const body = { order }
            await fetch('/api/order', {
                method: "POST",
                body: JSON.stringify(body)
            })

            dispatch(clearOrder())
            setIsSubmitting(false)
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <Container fluid className="h-100">
            <Row>
                <Navbar.NavbarServer />
            </Row>
            <Row className="">
                <Col md={4}>
                    <h1>Pizza Type</h1>
                    <GridSystem colCount={3} md={4} >
                        {menu.length > 0 ? menu.map(item => {
                            return <Object.MenuItem key={item.typeid} onClick={() => handleNewPizza(item.pizzatype, item.itemprice)} butId={item.typeid} name={item.pizzatype} />
                        }) : <p>No tracks are found.</p>
                        }
                    </GridSystem>
                    <h1>Sauces</h1>
                    <GridSystem colCount={3} md={4} >
                        {inventory.length > 0 ? inventory.map(item => {
                            if (item.itemtype == "sauce") {
                                return <Object.MenuItem key={item.inventoryid} onClick={() => handleAddTopping(item)} butId={item.inventoryid} name={item.ingredientname} />
                            }
                        }) : <p>No tracks are found.</p>
                        }
                    </GridSystem>
                    <h1>Cheeses</h1>
                    <GridSystem colCount={3} md={4} >
                        {inventory.length > 0 ? inventory.map(item => {
                            if (item.itemtype == "cheese") {
                                return <Object.MenuItem key={item.inventoryid} onClick={() => handleAddTopping(item)} butId={item.inventoryid} name={item.ingredientname} />
                            }
                        }) : <p>No tracks are found.</p>
                        }
                    </GridSystem>
                    <h1>Drinks and Seasonal Items</h1>
                    <GridSystem colCount={3} md={4} >
                        {inventory.length > 0 ? inventory.map(item => {
                            if (item.itemtype == "other") {
                                return <Object.MenuItem key={item.inventoryid} onClick={() => handleAddTopping(item)} butId={item.inventoryid} name={item.ingredientname} />
                            }
                        }) : <p>No tracks are found.</p>
                        }
                    </GridSystem>
                </Col>
                <Col md={4}>
                    <h1>Toppings</h1>
                    <GridSystem colCount={3} md={4} >
                        {inventory.length > 0 ? inventory.map(item => {
                            if (item.itemtype == "topping") {
                                return <Object.MenuItem key={item.inventoryid} onClick={() => handleAddTopping(item)} butId={item.inventoryid} name={item.ingredientname} />
                            }
                        }) : <p>No tracks are found.</p>
                        }
                    </GridSystem>
                </Col>
                <Col md={4} className="d-flex flex-column align-items-end">
                    <Row className="w-100 mb-auto">
                        <h1>Current Order</h1>
                        <Col>
                            {order.orderItems.map(item => {
                                return <Object.OrderDisplay 
                                    key={order.orderItems.indexOf(item)} 
                                    item={item}
                                    index={order.orderItems.indexOf(item)}
                                    />
                            })
                            }
                        </Col>
                    </Row>
                    <Row className="w-100">
                        <Col>
                            <Object.OrderCost order={order} />
                            <Form onSubmit={submitOrder}>
                                <Button type="submit" disabled={!checkoutReady}>
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
        </Container>
    );
}
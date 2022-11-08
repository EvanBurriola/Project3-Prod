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

export default function Cust_start_order({inventory, menu}) {
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
                    <Navbar.NavbarCustomer sticky="top"/>
                </Row>
                <Row>
                    <div class={styles.centerScreen1}>
                        <h1>Start Your Order</h1>
                    </div>
                    <div class={styles.centerScreen2}>
                        <GridSystem colCount={3} md={2} >
                            {menu.length > 0 ? menu.map(item => {
                                return <Object.MenuItem key={item.typeid} onClick={() => handleNewPizza(item.pizzatype, item.itemprice)} butId={item.typeid} name={item.pizzatype} />
                            }) : <p>No tracks are found.</p>
                            }
                        </GridSystem>
                    </div>
                </Row>
                <Button style={{position: "absolute", width: "15%", top: "80%", left: "41%"}} href="/Cust_cheese_sauce" variant="primary" >Next Page</Button>
            </Container>
        </div>

    );
}
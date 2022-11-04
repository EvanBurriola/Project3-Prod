import styles from '@/styles/server.module.css'

import * as Navbar from "@/components/Navbar/Navbar.js";
import GridSystem from '@/components/GridSystem/GridSystem.js';
import * as Object from '@/components/Objects/Objects.js';

import React from 'react';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { prisma } from '@/lib/prisma'
import { useSelector, useDispatch } from 'react-redux'
import { addItem, addPizzaTopping, finishPizza, newPizza } from '@/store/slices/order' 
import { PizzaModel, ToppingModel } from '@/lib/models'

// pull inventory from db
export async function getServerSideProps() {
    const inventory = await prisma.inventory.findMany()
    const menu = await prisma.menuitems.findMany()
    return {
        props: { 
            inventory,
            menu
        }
    }
}

export default function server({inventory, menu}) {
    const order = useSelector((state) => state.order)
    const dispatch = useDispatch()

    // TODO: add dough to the new pizza
    const handleNewPizza = (type, price) => {
        const pizza = {
            ...PizzaModel,
            pizzatype: type,
            price
        }

        dispatch(newPizza(pizza))
    }

    const handleAddTopping = (ingredient) => {
        const item = {
            ...ToppingModel,
            pizzatype: ingredient.pizzatype,
            ingredientname: ingredient.ingredientname,
            inventoryid: ingredient.inventoryid,
            ingredientprice: ingredient.ingredientprice,
            quantityused: ingredient.quantityused
        }
        dispatch(addPizzaTopping(item))
    }
    
    return (
        <div>
            <Container fluid>
                <Row>
                    <Col xs={12} md={12}>
                        <Navbar.NavbarServer />
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} md={4}>
                        <h1>Pizza Type</h1>
                        <GridSystem colCount={3} md={4} >
                            {menu.length > 0 ? menu.map(item => {
                                return <Object.MenuItem key={item.typeid} onClick={() => handleNewPizza(item.pizzatype, item.itemprice)} butId={item.typeid} name={item.pizzatype} />
                            }) : [<p>No tracks are found.</p>]
                            }
                        </GridSystem>
                        <h1>Sauces</h1>
                        <GridSystem colCount={3} md={4} >
                            {inventory.length > 0 ? inventory.map(item => {
                                if (item.itemtype == "sauce") {
                                    return <Object.MenuItem key={item.inventoryid} onClick={() => handleAddTopping(item)} butId={item.inventoryid} name={item.ingredientname} />
                                }
                            }) : [<p>No tracks are found.</p>]
                            }
                        </GridSystem>
                        <h1>Cheeses</h1>
                        <GridSystem colCount={3} md={4} >
                            {inventory.length > 0 ? inventory.map(item => {
                                if (item.itemtype == "cheese") {
                                    return <Object.MenuItem key={item.inventoryid} onClick={() => handleAddTopping(item)} butId={item.inventoryid} name={item.ingredientname} />
                                }
                            }) : [<p>No tracks are found.</p>]
                            }
                        </GridSystem>
                        <h1>Drinks and Seasonal Items</h1>
                        <GridSystem colCount={3} md={4} >
                            {inventory.length > 0 ? inventory.map(item => {
                                if (item.itemtype == "other") {
                                    return <Object.MenuItem key={item.inventoryid} onClick={() => handleAddTopping(item)} butId={item.inventoryid} name={item.ingredientname} />
                                }
                            }) : [<p>No tracks are found.</p>]
                            }
                        </GridSystem>
                    </Col>
                    <Col xs={6} md={4}>
                        <h1>Toppings</h1>
                        <GridSystem colCount={3} md={4} >
                            {inventory.length > 0 ? inventory.map(item => {
                                if (item.itemtype == "topping") {
                                    return <Object.MenuItem key={item.inventoryid} onClick={() => handleAddTopping(item)} butId={item.inventoryid} name={item.ingredientname} />
                                }
                            }) : [<p>No tracks are found.</p>]
                            }
                        </GridSystem>
                    </Col>
                    <Col xs={6} md={4}>
                        <Row>
                            <h1>Current Order</h1>
                        </Row>
                        <Row>
                            <div className="col-md-3 offset-md-4">
                                {order.orderItems.map(item => {
                                    return <Object.OrderDisplay item={item} />
                                })
                                }
                                <Object.OrderDisplay item={order.currentPizza} />
                            </div>
                            <div>
                                <Object.OrderCost order={order} />
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>

    );
}
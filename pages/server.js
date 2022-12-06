import * as Navbar from "@/components/Navbar/Navbar.js";
import styles from '@/styles/server.module.css'

import GridSystem from '@/components/GridSystem/GridSystem.js';
import * as Object from '@/components/Objects/Objects.js';
import SubmitNotification from "@/components/Objects/SubmitNotifcation";
import TypeSelector from "@/components/Navbar/TypeSelector";
import NameModal from "@/components/Objects/NameModal"
import ErrorNotification from "@/components/Objects/ErrorNotification"

import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'

import { prisma } from '@/lib/prisma'
import { useSelector, useDispatch } from 'react-redux'
import { addItem, addPizzaTopping, clearOrder, clearStatus, setEmployee } from '@/store/slices/order' 
import { PizzaModel, ToppingModel } from '@/lib/models'
import ReactDOM from "react-dom";

import { useSession } from 'next-auth/react'

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
    const filter = useSelector((state) => state.filter.itemFilter)
    const dispatch = useDispatch()
    const { data: session, status } = useSession()

    // wait for status to be authenticated then set the employee who
    // is taking the orders in the redux order state
    useEffect(() => {
        if (status === "authenticated" && session) {
            dispatch(setEmployee({
                employee: session.user.fullname, 
                id: session.user.employeeid
            }))
        }
    }, [status])

    const dough = inventory.find(item => item.ingredientname === 'Dough')

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [orderSubmitted, orderDidSubmit] = useState(false)
    const [isBrowser, setIsBrowser] = useState(false)

    const menuChoices = [
        {
            name: "Sauces",
            type: "sauce",
            icon: () => <i className="fa-solid fa-droplet me-1"></i>
        },
        {
            name: "Cheeses",
            type: "cheese",
            icon: () => <i className="fa-solid fa-cheese me-1"></i>
        },
        {
            name: "Toppings",
            type: "topping",
            icon: () => <i className="fa-solid fa-pizza-slice me-1"></i>
        },
        {
            name: "Drink/Seasonal",
            type: "other",
            icon: () => <i className="fa-solid fa-bottle-water me-1"></i>
        },

    ]

    // this will only get run once on the client side. Then we know
    // it is safe to add the modal to a container div within the
    // nextjs app
    useEffect(() => {
        setIsBrowser(true)
    }, [])

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
            orderDidSubmit(true)
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <Container fluid className="h-100">
            <Row> 
                <Navbar.NavbarServer user={session.user} />
            </Row>
            <Row className={`py-3 ${styles.wrapper}`}>
                <Col className={`px-4`}>
                    <h2 className="mb-0">Pizza</h2>
                    <div className="">
                        <GridSystem colCount={3} md={4} >
                            {menu.length > 0 ? menu.map(item => {
                                return <Object.MenuItem key={item.typeid} style={styles.menuItemBtn} onClick={() => handleNewPizza(item.pizzatype, item.itemprice)} butId={item.typeid} name={item.pizzatype} />
                            }) : <p>No tracks are found.</p>
                            }
                        </GridSystem>
                    </div>
                    <div className={`mt-2 pb-3`}>
                        <h2>Items</h2>
                        <TypeSelector choices={menuChoices} />
                    </div>
                    <div className={`${styles.menuContainer} w-100 mt-1 px-4 py-3`}>
                        <GridSystem colCount={4} md={3} >
                            {inventory.length > 0 ? inventory.map(item => {
                                if (item.itemtype == filter) {
                                    return <Object.MenuItem key={item.inventoryid} className={styles.subItemBtn} onClick={() => handleAddTopping(item)} butId={item.inventoryid} name={item.ingredientname} />
                                }
                            }) : <p>No tracks are found.</p>
                            }
                        </GridSystem>
                    </div>
                </Col>
                <Col md={3} className={`d-flex flex-column align-items-center border-start border-light px-4 pb-4`}>
                    <Row className="w-100 mb-auto">
                        <h2 className="mb-0">Order</h2>
                        <h6 className="text-muted">{order.employeename}</h6>
                        <div className={`d-flex ${styles.orderContainer} ${order.orderItems.length == 0 ? "align-items-center" : "flex-column"}`}>
                            {order.orderItems.map(item => {
                                return <Object.OrderDisplay 
                                    key={order.orderItems.indexOf(item)} 
                                    item={item}
                                    index={order.orderItems.indexOf(item)}
                                    />
                            })
                            }

                            {order.orderItems.length == 0 &&
                            <div className={`w-100`}>
                                <p className="text-center text-muted fs-3 mb-0">
                                    <i className="fa-solid fa-utensils"></i>
                                </p>
                                <p className="text-center text-muted">Order Is Empty</p>
                            </div>
                            }
                        </div>
                    </Row>
                    <Row className="w-100">
                        <Col className={`${styles.checkoutContainer} px-4 py-3 shadow`}>
                            <Object.OrderCost order={order} />
                            <Form onSubmit={submitOrder}>
                                <Button 
                                    type="submit" 
                                    disabled={!checkoutReady}
                                    className={`${styles.btnNav} w-100`}
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
                        {orderSubmitted && <SubmitNotification onAnimationEnd={() => orderDidSubmit(false)} />}
                    </Row>
                </Col>
            </Row>

            {/* 
                Since NextJS uses SSR to hydrate the page, we can't
                just add the modal without giving it a container element.
                Without this, we get a hydration error since the server
                is not expecting the modal to be outside of its container
                (which is expected behavior for bootstrap modals). 
                
                A div is defined in _document.js that has an id 
                "modal-root" that the modal attaches itself to and
                is still contained in our nextjs app. 
                createPortal allows this
            */}
            {isBrowser
            ? ReactDOM.createPortal(
                <NameModal show={order.customername === ""} keyboard={false} />,
                document.getElementById("modal-root")
                )
            : <></>
            }
            
            {order.status && 
                <ErrorNotification error={order.status} onComplete={() => dispatch(clearStatus())} />
            }
        </Container>
    );
}
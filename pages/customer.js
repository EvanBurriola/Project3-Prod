import styles from "@/styles/customer.module.css"

import { StartOrder, CheeseSauce, Toppings, DrinkSeasonal } from '@/components/CustomerViews/'
import { NavbarCustomer } from "@/components/Navbar/Navbar.js";
import { OrderCost, OrderDisplay } from '@/components/Objects/Objects.js';
import CheckoutModal from "@/components/Objects/CheckoutModal"
import ErrorNotification from "@/components/Objects/ErrorNotification"
import { DynamicPizza } from "@/components/DynamicPizza/DynamicPizza"

import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'

import Head from "next/head"

import { prisma } from '@/lib/prisma'
import { useSelector, useDispatch } from 'react-redux'
import { addItem, addPizzaTopping, clearStatus, setEmployee } from '@/store/slices/order' 
import { PizzaModel, ToppingModel } from '@/lib/models'
import { useSession } from 'next-auth/react'

import { useRouter } from 'next/router';
import ReactDOM from "react-dom";

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

    // enable modal once the component is mounted on client
    const [isBrowser, setIsBrowser] = useState(false)
    useEffect(() => {
        setIsBrowser(true)
    }, [])

    const dough = inventory.find(item => item.ingredientname === 'Dough')

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [custViews, setCustView] = useState([true, false ,false, false])

    // activate or deactive checkout button based on order and show modal
    const [checkoutReady, setCheckoutReady] = useState(false)
    const [isCheckingOut, setIsCheckingOut] = useState(false)
    useEffect(() => {
        if (order.orderItems.length === 0) {
            setCheckoutReady(false)
        } else {
            setCheckoutReady(true)
        }
    }, [order.orderItems.length])


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
            itemtype: dough.itemtype,
            images: dough.images
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
            itemtype: ingredient.itemtype,
            images: ingredient.images
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
            return (
                <>
                    <Head>
                        <title>SNS Pizza | Start Your Order</title>
                    </Head>
                    <StartOrder menu={menu} handleNewPizza={handleNewPizza} />
                </>
            ) 
        } else {
            let view = renderView()

            return (
                <>
                    <Head>
                        <title>SNS Pizza | Add To Your Order</title>
                    </Head>
                    <Row className={`py-3 ps-3 ${styles.wrapper}`}>
                        {view}
                        <Col md={3} className="d-flex flex-column align-items-center border-start border-light px-4 pb-4">
                            <Row className={`w-100 mb-auto`}>
                                <h2 className={`mb-2`}>Your Order</h2>
                                <Row className="justify-content-center">
                                    <div style={{ width: 96, height: 96, position: "relative", zIndex: 100}}>
                                        <DynamicPizza />
                                    </div>
                                </Row>
                                <div className={`d-flex ${styles.orderContainer} ${order.orderItems.length == 0 ? "align-items-center" : "flex-column"}`}>
                                    {order.orderItems.map(item => {
                                        return <OrderDisplay 
                                            key={order.orderItems.indexOf(item)} 
                                            item={item}
                                            index={order.orderItems.indexOf(item)} />
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
                            <Row className="w-100 mt-4">
                                <Col className={`${styles.checkoutContainer} px-4 py-3 shadow`}>
                                    <OrderCost order={order} />
                                    <div>
                                        <Button type="button" 
                                            disabled={!checkoutReady} 
                                            className={`${styles.btnNav} w-100`}
                                            onClick={() => setIsCheckingOut(true)}
                                            >
                                            Checkout
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </>
            )
        }
    }

    return(
        <>
            <Container fluid>
                <Row>
                    <NavbarCustomer user={session.user} sticky="top"/>
                </Row>

                {
                    buildPage()
                }

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
                    <CheckoutModal isSubmitting={isSubmitting} onSubmit={submitOrder} show={isCheckingOut} handleClose={() => setIsCheckingOut(false)} keyboard={false} />,
                    document.getElementById("modal-root")
                    )
                : <></>
                }

                {order.status && 
                    <ErrorNotification error={order.status} onComplete={() => dispatch(clearStatus())} />
                }
            </Container>
        </>
    );
}
import styles from '@/styles/customer.module.css'

import * as Navbar from "@/components/Navbar/Navbar.js";
import GridSystem from '@/components/GridSystem/GridSystem.js';
import * as Object from '@/components/Objects/Objects.js';


import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'

export default function Cust_drink_SI({inventory, menu, ...props}) {
    
    return (
        <>
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
                                        return <Object.MenuItem key={item.inventoryid} onClick={() => props.handleAddTopping(item)} butId={item.inventoryid} name={item.ingredientname} />
                                    }
                                }) : <p>No tracks are found.</p>
                                }
                            </GridSystem>
                        </Row>
                        <Row>
                            <Col className="d-flex justify-content-end">
                                <Button className="me-auto" onClick={() => props.back_click(3)} variant="primary" >Previous Page</Button>
                                <Button onClick={() => props.add_more()} variant="primary" >Add more</Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={4} className="d-flex flex-column align-items-end">
                        <Row className="w-100 mb-auto">
                            <h1>Current Order</h1>
                            <Col>
                                {props.order.orderItems.map(item => {
                                    return <Object.OrderDisplay 
                                        key={props.order.orderItems.indexOf(item)} 
                                        item={item}
                                        index={props.order.orderItems.indexOf(item)} />
                                })
                                }
                            </Col>
                        </Row>
                        <Row className="w-100">
                            <Col>
                                <Object.OrderCost order={props.order} />
                                <Form onSubmit={props.submitOrder}>
                                    <Button type="submit" disabled={!props.checkoutReady}>Checkout</Button>
                                </Form>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>

    );
}
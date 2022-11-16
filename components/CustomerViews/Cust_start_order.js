import styles from '@/styles/customer.module.css'

import * as Navbar from "@/components/Navbar/Navbar.js";
import GridSystem from '@/components/GridSystem/GridSystem.js';
import * as Object from '@/components/Objects/Objects.js';

import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Cust_start_order({inventory, menu, ...props}) {

    return (
        <>
            <Container fluid>
                <Row>
                    <Navbar.NavbarCustomer sticky="top"/>
                </Row>
                <Row className="d-flex w-100 my-5">
                    <Col className="d-flex justify-content-center">
                        <h1>Start Your Order</h1>
                    </Col>
                </Row>
                <Row className="d-flex w-100 my-5">    
                    <Col className="d-flex justify-content-center">
                        <GridSystem colCount={3} md={12} >
                            {menu.length > 0 ? menu.map(item => {
                                return <Object.MenuItem key={item.typeid} onClick={() => props.handleNewPizza(item.pizzatype, item.itemprice)} butId={item.typeid} name={item.pizzatype} />
                            }) : <p>No tracks are found.</p>
                            }
                        </GridSystem>
                    </Col>
                </Row>
                <Button style={{position: "absolute", width: "15%", top: "80%", left: "42.5%"}} onClick={() => props.next_click(0)} variant="primary" >Next Page</Button>
            </Container>
        </>
    );
}
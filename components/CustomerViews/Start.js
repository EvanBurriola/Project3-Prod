import styles from '@/styles/customer.module.css'

import GridSystem from '@/components/GridSystem/GridSystem.js';
import { MenuItem } from '@/components/Objects/Objects.js';

import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Creating the layout for the first page of the Customer View
export default function StartOrder({menu, ...props}) {
    const PAGE_INDEX = 0

    return (
        <>
            <Row className="d-flex w-100 my-5">
                <Col className="d-flex justify-content-center">
                    <h1>Start Your Order</h1>
                </Col>
            </Row>
            <Row className="d-flex w-100 my-5">    
                <Col className="d-flex justify-content-center">
                    <GridSystem colCount={3} md={12} >
                        {menu.length > 0 ? menu.map(item => {
                            return <MenuItem key={item.typeid} onClick={() => props.handleNewPizza(item.pizzatype, item.itemprice, PAGE_INDEX)} butId={item.typeid} name={item.pizzatype} />
                        }) : <p>No tracks are found.</p>
                        }
                    </GridSystem>
                </Col>
            </Row>
        </>
    );
}
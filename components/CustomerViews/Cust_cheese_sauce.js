import styles from '@/styles/customer.module.css'

import GridSystem from '@/components/GridSystem/GridSystem.js';
import * as Object from '@/components/Objects/Objects.js';


import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Cust_cheese_sauce({inventory, menu, ...props}) {

    return (
        <Col xs={8} md={8}>
            <Row>
                <h1>Sauces</h1>
            <GridSystem colCount={3} md={4} >
                {inventory.length > 0 ? inventory.map(item => {
                    if (item.itemtype == "sauce") {
                        return <Object.MenuItem key={item.inventoryid} onClick={() => props.handleAddTopping(item)} butId={item.inventoryid} name={item.ingredientname} />
                    }
                }) : <p>No tracks are found.</p>
                }
            </GridSystem>
            <h1>Cheeses</h1>
            <GridSystem colCount={3} md={4} >
                {inventory.length > 0 ? inventory.map(item => {
                    if (item.itemtype == "cheese") {
                        return <Object.MenuItem key={item.inventoryid} onClick={() => props.handleAddTopping(item)} butId={item.inventoryid} name={item.ingredientname} />
                    }
                }) : <p>No tracks are found.</p>
                }   
            </GridSystem>
            </Row>
            <Row>
                <Col className="d-flex justify-content-end">
                    <Button className="me-auto" onClick={() => props.back_click(1)} variant="primary" >Previous Page</Button>
                    <Button onClick={() => props.next_click(1)} variant="primary" >Next Page</Button>
                </Col>
            </Row>
        </Col>
    );
}
import styles from '@/styles/customer.module.css'

import GridSystem from '@/components/GridSystem/GridSystem.js';
import { MenuItem } from '@/components/Objects/Objects.js';

import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Toppings({inventory, ...props}) {
    
    return (
        <Col xs={8} md={8} className="d-flex flex-column justify-content-end">
            <Row className="mb-auto">
                <h1 className={`${styles.typeTitle}`}>Toppings</h1>
                <GridSystem colCount={4} md={3} >
                    {inventory.length > 0 ? inventory.map(item => {
                        if (item.itemtype == "topping") {
                            return <MenuItem key={item.inventoryid} onClick={() => props.handleAddTopping(item)} butId={item.inventoryid} name={item.ingredientname} />
                        }
                    }) : <p>No tracks are found.</p>
                    }
                </GridSystem>
            </Row>
            <Row>
                <Col className="d-flex justify-content-end">
                    <Button className={`me-auto ${styles.btnNav}`} onClick={() => props.back_click(2)} variant="primary" >Previous Page</Button>
                    <Button className={`${styles.btnNav}`} onClick={() => props.next_click(2)} variant="primary" >Next Page</Button>
                </Col>
            </Row>
        </Col>

    );
}
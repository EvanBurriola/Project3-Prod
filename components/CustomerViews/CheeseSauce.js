import styles from '@/styles/customer.module.css'

import GridSystem from '@/components/GridSystem/GridSystem.js';
import { MenuItem } from '@/components/Objects/Objects.js';


import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/** 
 * Creating the layout for the second page of the Customer View
 * @author Brandon Longuet*/ 
export default function CheeseSauce({inventory, menu, ...props}) {

    return (
        <Col md={8} className="d-flex flex-column justify-content-end">
            <Row className="mb-auto">
                <h1 className={`${styles.typeTitle}`}>Sauces</h1>
                <GridSystem colCount={3} md={4} >
                    {inventory.length > 0 ? inventory.map(item => {
                        if (item.itemtype == "sauce") {
                            return <MenuItem key={item.inventoryid} onClick={() => props.handleAddTopping(item)} butId={item.inventoryid} name={item.ingredientname} />
                        }
                    }) : <p>No tracks are found.</p>
                    }
                </GridSystem>
                <h1 className={`${styles.typeTitle}`}>Cheeses</h1>
                <GridSystem colCount={3} md={4} >
                    {inventory.length > 0 ? inventory.map(item => {
                        if (item.itemtype == "cheese") {
                            return <MenuItem key={item.inventoryid} onClick={() => props.handleAddTopping(item)} butId={item.inventoryid} name={item.ingredientname} />
                        }
                    }) : <p>No tracks are found.</p>
                    }   
                </GridSystem>
            </Row>
            <Row>
                <Col className="d-flex justify-content-end">
                    <Button className={`me-auto ${styles.btnNav}`} onClick={() => props.back_click(1)} variant="primary" >Previous Page</Button>
                    <Button className={`${styles.btnNav}`} onClick={() => props.next_click(1)} variant="primary" >Next Page</Button>
                </Col>
            </Row>
        </Col>
    );
}
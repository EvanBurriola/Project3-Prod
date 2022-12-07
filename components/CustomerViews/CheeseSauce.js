import styles from '@/styles/customer.module.css'

import GridSystem from '@/components/GridSystem/GridSystem.js';
import { MenuItem } from '@/components/Objects/Objects.js';
import { DynamicPizza } from "@/components/DynamicPizza/DynamicPizza.js";

import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/** 
 * Creating the layout for the second page of the Customer View
 * @author Brandon Longuet*/ 
export default function CheeseSauce({inventory, menu, ...props}) {

    return (
        <Col className="d-flex flex-column justify-content-end px-4">
            {/*<Row className="mb-5">
                <DynamicPizza />
             </Row>*/}
            <Row className="mb-auto">
                <h2 className={`mb-0`}>Sauce</h2>
                <GridSystem colCount={4} md={3} >
                    {inventory.length > 0 ? inventory.map(item => {
                        if (item.itemtype == "sauce") {
                            return <MenuItem disabled={item.quantityounces <= item.minimumquantity} key={item.inventoryid} onClick={() => props.handleAddTopping(item)} butId={item.inventoryid} name={item.ingredientname} />
                        }
                    }) : <p>No tracks are found.</p>
                    }
                </GridSystem>
                <h2 className={`mb-0`}>Cheese</h2>
                <GridSystem colCount={4} md={3} >
                    {inventory.length > 0 ? inventory.map(item => {
                        if (item.itemtype == "cheese") {
                            return <MenuItem disabled={item.quantityounces <= item.minimumquantity} key={item.inventoryid} onClick={() => props.handleAddTopping(item)} butId={item.inventoryid} name={item.ingredientname} />
                        }
                    }) : <p>No tracks are found.</p>
                    }   
                </GridSystem>
            </Row>
            <Row className={`pb-4`}>
                <Col className="d-flex justify-content-end">
                    {/*<Button className={`me-auto ${styles.btnNav}`} onClick={() => props.back_click(1)} variant="primary" ><i className="fa-solid fa-left-long me-1"></i> Previous</Button>*/}
                    <Button className={`${styles.btnNav}`} onClick={() => props.next_click(1)} variant="primary" >Next <i className="fa-solid fa-right-long ms-1"></i></Button>
                </Col>
            </Row>
        </Col>
    );
}
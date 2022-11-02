import styles from '@/styles/server.module.css'

import Navbar from "@/components/Navbar/Navbar.js";
import GridSystem from '@/components/GridSystem/GridSystem.js';
import * as Object from '@/components/Objects/Objects.js';


import React from 'react';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function server() {
    const MenuItems = [
        {
            butId: 0,
            type: 'Cheese',
        },
        {
            butId: 1,
            type: '1-Top',
        },
        {
            butId: 2,
            type: 'BYO',
        },
      ]

      const Sauces = [
        {
            butId: 3,
            ingredientname: 'Red',
        },
        {
            butId: 4,
            ingredientname: 'White',
        },
        {
            butId: 5,
            ingredientname: 'Zesty Red',
        },
        {
            butId: 6,
            ingredientname: 'Pesto',
        }
      ]

      const Cheeses = [
        {
            butId: 7,
            ingredientname: 'Vegan',
        },
        {
            butId: 8,
            ingredientname: 'Parmesean',
        },
        {
            butId: 9,
            ingredientname: 'Mozzarella',
        },
        {
            butId: 10,
            ingredientname: 'House Blend',
        }
      ]

      const Other = [
        {
            butId: 11,
            ingredientname: 'Cup',
        },
        {
            butId: 12,
            ingredientname: 'Cookie',
        },
        {
            butId: 13,
            ingredientname: 'Latte',
        }
      ]

      const Toppings = [
        {
            butId: 14,
            ingredientname: 'Bacon',
        },
        {
            butId: 15,
            ingredientname: 'Pepperoni',
        },
        {
            butId: 16,
            ingredientname: 'Salami',
        },
        {
            butId: 17,
            ingredientname: 'Ham',
        }
      ]

      const order = [
        {
            LabelId: 18,
            subtotal: 6.99,
            tax: 0.44,
            total: 7.43,
            type: "1-Top",
            toppings: [
                 Sauces.at(0), Cheeses.at(0), Toppings.at(0), 
            ],
        }
      ]
    
    return (
        <div>
            <Container fluid>
                <Row>
                    <Col xs={12} md={12}>
                        <Navbar />
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} md={4}>
                        <h1>Pizza Type</h1>
                        <GridSystem colCount={3} md={4} >
                            {MenuItems.length > 0 ? MenuItems.map(
                                item => <Object.MenuItem key={item.butId} butId={item.butId} type={item.type} />
                            ) : [<p>No tracks are found.</p>]}
                        </GridSystem>
                        <h1>Sauces</h1>
                        <GridSystem colCount={3} md={4} >
                            {Sauces.length > 0 ? Sauces.map(
                                item => <Object.Ingredient key={item.butId} butId={item.butId} ingredientname={item.ingredientname} />
                            ) : [<p>No tracks are found.</p>]}
                        </GridSystem>
                        <h1>Cheeses</h1>
                        <GridSystem colCount={3} md={4} >
                            {Cheeses.length > 0 ? Cheeses.map(
                                item => <Object.Ingredient key={item.butId} butId={item.butId} ingredientname={item.ingredientname} />
                            ) : [<p>No tracks are found.</p>]}
                        </GridSystem>
                        <h1>Drinks and Seasonal Items</h1>
                        <GridSystem colCount={3} md={4} >
                            {Other.length > 0 ? Other.map(
                                item => <Object.Ingredient key={item.butId} butId={item.butId} ingredientname={item.ingredientname} />
                            ) : [<p>No tracks are found.</p>]}
                        </GridSystem>
                    </Col>
                    <Col xs={6} md={4}>
                        <h1>Toppings</h1>
                        <GridSystem colCount={3} md={4} >
                            {Toppings.length > 0 ? Toppings.map(
                                item => <Object.Ingredient key={item.butId} butId={item.butId} ingredientname={item.ingredientname} />
                            ) : [<p>No tracks are found.</p>]}
                        </GridSystem>
                    </Col>
                    <Col xs={6} md={4}>
                        <h1>Current Order</h1>
                        <p></p>
                        <div>
                            {order.at(-1) ? order.map(
                                item => <Object.OrderDisplay key={item.LabelId} LabelId={item.LabelId} subtotal={item.subtotal} tax={item.tax} total={item.total} type={item.type} toppings={item.toppings} />
                            ) : [<p>No tracks are found.</p>]}
                        </div>
                        <div>
                            {order.at(-1) ? order.map(
                                item => <Object.OrderCost key={item.LabelId} LabelId={item.LabelId} subtotal={item.subtotal} tax={item.tax} total={item.total} />
                            ) : [<p>No tracks are found.</p>]}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>

    );
}
import * as Navbar from '@/components/Navbar/Navbar.js';

import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { prisma } from '@/lib/prisma'
import { EditableMenu } from '@/components/Table/MenuTable';

import "react-datepicker/dist/react-datepicker.css";

export async function getServerSideProps(){
    const menu = await prisma.menuitems.findMany({
        orderBy: {
            typeid: 'asc',
        },
    })
    return{
        props:{
            menu,
        }
    }
}

export default function menuEdit({menu}){
    return(
        <Container fluid className="h-100">
            <Navbar.NavbarManager />
            <Row>
                <h1> Menu Management </h1>
            </Row>
            <Row>
                <p> {"\n"} </p>
                <h3> Menu </h3>
            </Row>
            <Row>
                <EditableMenu menu={menu}/>
            </Row>
        </Container>
    )
}
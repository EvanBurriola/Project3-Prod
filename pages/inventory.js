import * as Navbar from '@/components/Navbar/Navbar.js';

import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {EditableInventory} from '@/components/Table/InventoryTable.js';
import { prisma } from '@/lib/prisma'

import "react-datepicker/dist/react-datepicker.css";

export async function getServerSideProps(){
  const inventory = await prisma.inventory.findMany({
    orderBy: {
      inventoryid: 'asc',
    },
  })
  return {
      props: {
          inventory,
      }
  }
}

export default function inventoryEdit({inventory}) {
  return (
    <Container fluid className="h-100">
      <Navbar.NavbarManager />
      <Row>
        <h1> Inventory Management </h1>
      </Row>
      <Row>
        <p> {"\n"} </p>
        <h3> Inventory </h3>
      </Row>
      <Row>
        <EditableInventory inventory={inventory}/> 
      </Row>
      </Container>
     )
}
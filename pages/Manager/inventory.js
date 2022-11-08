import* as Navbar from '@/components/Navbar/Navbar.js';

import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DateSelect, { DateEnd, DateStart } from '@/components/TextEntry/Datepicker.js';
import InventoryTable from '@/components/Table/InventoryTable.js';

export async function getServerSideProps() {
  const inventory = await prisma.inventory.findMany({
      orderBy: {
          inventoryid: 'asc'
      }
  })
  const menu = await prisma.menuitems.findMany({
      orderBy: {
          typeid: 'asc'
      }
  })
  return {
      props: { 
          inventory,
          menu
      }
  }
}

export default function inventory ({inventory, menu}) {
    return (
      <Container>
          <Navbar.NavbarManager />
          <Row>
            <h1> Inventory </h1>
          </Row>
          <Row>
            <p> {"\n"} </p>
          </Row>
          <InventoryTable inventory={inventory} menu={menu}/>
      </ Container>
    )
}
import ManagerNavbar from '@/components/Navbar/ManagerNavbar';

import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DateSelect, { DateEnd, DateStart } from '../components/TextEntry/Datepicker.js';
import InventoryTable from '@/components/Table/InventoryTable.js';
import MonthlySales from '@/components/Table/MonthlySales.js';
import RestockTable from '@/components/Table/RestockTable.js';
import { prisma } from '@/lib/prisma'



export async function getServerSideProps(){
  const inventory = await prisma.inventory.findMany()
  const menu = await prisma.menuitems.findMany()
  return {
      props: {
          inventory,
          menu
      }
  }
}

export default function server({inventory, menu}) {
  return (
    <Container>
      <ManagerNavbar />
      <Row>
        <Col> <h1> Dashboard </h1></Col>
        <p> {"\n"} </p>
      </Row>
      <Row>
        <Col> <h2> Reports </h2> </Col>
      </Row>
      <form>
        <Row>
          <Col> <DateSelect /> </Col>
        </Row>
        <Row> 
          <Col> 
            <button type = "submit"> Sales </button>
            <button type = "submit"> Excess </button> 
            <button type = "submit"> Restock </button> 
            <p> {"\n"} </p>
          </Col>
        </Row>
      </form>
      <Row>
        <MonthlySales />
        <p> {"\n"} </p>
        <h2> Inventory At a Glance</h2>
        <InventoryTable inventory={inventory} menu={menu}/>
      </Row>
      <Row>
        <p> {"\n"} </p>
        <h3> Restock Report </h3>
        <RestockTable inventory={inventory}/>
      </Row>
      
    </Container>
  )
}
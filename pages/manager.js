import ManagerNavbar from '@/components/Navbar/ManagerNavbar';

import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DateSelect, { DateEnd, DateStart } from '../components/TextEntry/Datepicker.js';
import InventoryTable from '@/components/Table/InventoryTable.js';
import MonthlySales from '@/components/Table/MonthlySales.js';


export default function server() {
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
        <InventoryTable />
      </Row>
      
    </Container>
  )
}
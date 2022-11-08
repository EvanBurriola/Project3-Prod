import {ManagerNavbar} from '@/components/Navbar/Navbar.js';

import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DateSelect, { DateEnd, DateStart } from '../components/TextEntry/Datepicker.js';
import InventoryTable from '@/components/Table/InventoryTable.js';
import MonthlySales from '@/components/Table/MonthlySales.js';
import RestockTable from '@/components/Table/RestockTable.js';
import MenuTable from '@/components/Table/MenuTable.js';
import { prisma } from '@/lib/prisma'

import styles from "@/styles/manager.module.css"


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

export default function manager({inventory, menu}) {
  return (
    <Container>
      <ManagerNavbar />
      <Row>
        <Col> <h1> Dashboard </h1></Col>
        <p> {"\n"} </p>
      </Row>
      <Row>
        <Col> <h2 className = {styles.header}> Reports </h2> </Col>
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
        <h2 className = {styles.header}> Inventory At a Glance </h2>
        <InventoryTable inventory={inventory}/>
      </Row>
      <Row>
        <p> {"\n"} </p>
        <h6> Menu Items </h6>
        <MenuTable menu={menu}/>
      </Row>
      <Row>
        <p> {"\n"} </p>
        <h3> Restock Report </h3>
        <RestockTable inventory={inventory}/>
      </Row>
    </Container>
  )
}
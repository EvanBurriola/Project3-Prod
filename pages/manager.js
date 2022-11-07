import { ManagerNavbar } from '@/components/Navbar/Navbar.js';

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
import GridSystem from '@/components/GridSystem/GridSystem.js';

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

export default function server({inventory, menu}) {
  return (
    <Container>
      <ManagerNavbar />
      <Row>
        <Col> <h1 className = {styles.title}> Dashboard </h1></Col>
        <p> {"\n"} </p>
      </Row>
      <Row>
        <Col> <h2 className = {styles.header}> Reports </h2> </Col>
        <Col> <h2 className = {styles.header}> Inventory At a Glance </h2> </Col>
      </Row>
      <form>
        <Row>
          <Col> <DateSelect /> </Col> 
          <Col> 
            <button className = {styles.button} type = "submit"> Sales </button>
            <button className = {styles.button} type = "submit"> Excess </button> 
            <button className = {styles.button} type = "submit"> Restock </button> 
            <p> {"\n"} </p>
          </Col>
          <Col><InventoryTable inventory={inventory}/> </Col>
          
        </Row>
      </form>
      <Row>
        <p> {"\n"} </p>
        <h3 className = {styles.header}> Menu Items </h3>
        <MenuTable menu={menu}/>
      </Row>
      <Row>
        <p> {"\n"} </p>
        <h2 className = {styles.header}> Restock Report </h2>
        <RestockTable inventory={inventory}/>
      </Row>
      
    </Container>
  )
}
import * as Navbar from '@/components/Navbar/Navbar.js';

import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InventoryTable from '@/components/Table/InventoryTable.js';
import ReportsTable from '@/components/Table/ReportsTable.js';
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
      <Navbar.NavbarManager />
      <Row>
        <Col> <h1> Dashboard </h1></Col>
        <p> {"\n"} </p>
      </Row>
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
        <h3> Reports </h3>
        
        <ReportsTable inventory={inventory}/>
      </Row>
    </Container>
  )
}
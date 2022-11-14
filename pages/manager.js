import * as Navbar from '@/components/Navbar/Navbar.js';

import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DateSelect, { DateEnd, DateStart } from '../components/TextEntry/Datepicker.js';
import InventoryTable, { InventoryDisplay } from '@/components/Table/InventoryTable.js';
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
      <Navbar.NavbarManager />
      <Row>
        <h1> Dashboard </h1>
      </Row>
      <Row>
        <Col> <h4 className = {styles.header}> Reports </h4> </Col>
        <Col> <h4 className = {styles.header}> Inventory at a Glance </h4></Col>
      </Row>
      <Row> 
        <Col>
          <Row>
            <form>
              <DateSelect />
            </form>
          </Row>
          <Row>
            <h1> {"\n"}</h1>
            <h4 className = {styles.header}> Monthly Sales </h4> 
          </Row>
        </Col>
        <Col>
          <InventoryDisplay inventory={inventory}/> 
        </Col>
      </Row>

    </Container> 
  )
}
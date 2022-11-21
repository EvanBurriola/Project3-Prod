import * as Navbar from '@/components/Navbar/Navbar.js';

import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DateSelect, { DateEnd, DateStart } from '../components/TextEntry/Datepicker.js';
import InventoryTable from '@/components/Table/InventoryTable.js';
import RestockTable from '@/components/Table/RestockTable.js';
import MenuTable from '@/components/Table/MenuTable.js';
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
        <Col> <h1 className = {styles.title}> Dashboard </h1></Col>
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
            <button className = {styles.button} type = "submit"> Sales </button>
            <button className = {styles.button} type = "submit"> Excess </button> 
            <button className = {styles.button} type = "submit"> Restock </button> 
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
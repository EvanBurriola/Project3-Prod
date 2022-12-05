import * as Navbar from '@/components/Navbar/Navbar.js';

import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/manager.module.css'

import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {EditableInventory, InventoryTable} from '@/components/Table/InventoryTable.js';
import { prisma } from '@/lib/prisma'

import "react-datepicker/dist/react-datepicker.css";

export async function getServerSideProps(){
  const inventory = await prisma.inventory.findMany({
    orderBy: {
      inventoryid: 'asc',
    },
  })
  const menu = await prisma.menuitems.findMany({
    orderBy: {
      typeid: 'asc',
    },
  })
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
        <h1> Dashboard </h1>
      </Row>
      <Row>
      <EditableInventory inventory={inventory}/> 
      </Row>
      </Container>
     )
}
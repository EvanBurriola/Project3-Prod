import * as Navbar from '@/components/Navbar/Navbar.js';

import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/manager.module.css'

import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
<<<<<<< HEAD
import {EditableInventory, InventoryTable} from '@/components/Table/InventoryTable.js';
=======
import DateSelect, { DateEnd, DateStart } from '../components/TextEntry/Datepicker.js';
import InventoryTable from '@/components/Table/InventoryTable.js';
import MonthlySales from '@/components/Table/ReportsTable.js';
import RestockTable from '@/components/Table/RestockTable.js';
>>>>>>> Reorganized and started Reports
import MenuTable from '@/components/Table/MenuTable.js';
import { InventoryDisplay } from '@/components/Table/InventoryTable.js';
import { prisma } from '@/lib/prisma'
import { useState } from 'react'
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
//Tables
import RestockTable from '@/components/Table/RestockTable';
import SalesTables from '@/components/Table/SalesTables';
import ExcessTable from '@/components/Table/ExcessTable';
import TogetherTables from '@/components/Table/TogetherTables';

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
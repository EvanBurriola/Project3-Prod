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
import MonthlySales from '@/components/Table/MonthlySales.js';
import RestockTable from '@/components/Table/RestockTable.js';
import MenuTable from '@/components/Table/MenuTable.js';
import { prisma } from '@/lib/prisma'
import { useState } from 'react'
import DatePicker from 'react-datepicker';

import styles from "@/styles/manager.module.css"
import "react-datepicker/dist/react-datepicker.css";
import RestockTable from '@/components/Table/RestockTable';

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
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [reportType, setReportType] = useState("");

  const generateReport = async () => {
    //event.preventDefault()
    try {
      const body = { startDate, endDate, reportType }
      const result = await fetch('/api/manager/reports', {
        method: "GET",
        body: JSON.stringify(body)
      })
      //return <RestockTable inventory={result} />
    } catch (error) {
      console.log(error);
    }
  }

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
      <Row>
        <p> {"\n"} </p>
        <h3> Reports </h3>
        <form /*onSubmit={generateReport}*/>
          <Row>
            <Col> 
              <DatePicker 
                required = "required"
                placeholderText = "Start Date"
                showTimeSelect
                dateFormat="yyyy-MM-dd hh:mm:ss"
                selected = {startDate}
                selectsStart
                startDate = {startDate}
                endDate = {endDate}
                onChange = {(date) => setStartDate(date)}
              />
              <DatePicker
                required = "required"
                placeholderText = "End Date"
                showTimeSelect
                dateFormat="yyyy-MM-dd hh:mm:ss"
                selected = {endDate}
                selectsEnd
                startDate={startDate}
                endDate = {endDate}
                minDate = {startDate}
                onChange = {date => setEndDate(date)}
              />
            </Col>
          </Row>
          <Row> 
            <Col> 
              <button onClick={(event) => setReportType(event.target.id)} type = "submit" id="restock"> Restock </button>
              <button onClick={(event) => setReportType(event.target.id)} type = "submit" id="sales"> Sales </button>
              <button onClick={(event) => setReportType(event.target.id)} type = "submit" id="excess"> Excess </button> 
              <button onClick={(event) => setReportType(event.target.id)} type = "submit" id="together"> What Sales Together </button> 
              <p> {"\n"} </p>
            </Col>
          </Row>
        </form>
        {(() => {
          if (reportType !== "") {
            return generateReport();
          }
          return null
        })()}
      </Row>
    </Container>
  )
}
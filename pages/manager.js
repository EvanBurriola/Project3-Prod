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
import { InventoryDisplay } from '@/components/Table/InventoryTable.js';
import { prisma } from '@/lib/prisma'
import { useState } from 'react'
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
//Tables
import RestockTable from '@/components/Table/RestockTable';
import SalesTables from '@/components/Table/SalesTables';
import ExcessTable from '@/components/Table/excessTable';
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
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [reportType, setReportType] = useState("");

  const generateReport = async () => {
    if(startDate != null){
      startDate = startDate.getUTCFullYear() + '-' +
      ('00' + (startDate.getUTCMonth()+1)).slice(-2) + '-' +
      ('00' + startDate.getUTCDate()).slice(-2) + ' ' + 
      ('00' + startDate.getUTCHours()).slice(-2) + ':' + 
      ('00' + startDate.getUTCMinutes()).slice(-2) + ':' + 
      ('00' + startDate.getUTCSeconds()).slice(-2);
    }
    if(endDate != null){
      endDate = endDate.getUTCFullYear() + '-' +
      ('00' + (endDate.getUTCMonth()+1)).slice(-2) + '-' +
      ('00' + endDate.getUTCDate()).slice(-2) + ' ' + 
      ('00' + endDate.getUTCHours()).slice(-2) + ':' + 
      ('00' + endDate.getUTCMinutes()).slice(-2) + ':' + 
      ('00' + endDate.getUTCSeconds()).slice(-2);
    }

    // console.log(new Date(startDate), new Date(endDate))
    //event.preventDefault()
    try {
      console.log("MAIN")
      console.log(result)
      if(reportType == 'restock'){
        const body = { startDate, endDate, reportType }
        const result = await fetch('/api/manager/reports', {
          method: 'POST',
          body: JSON.stringify(body)
        })
        return <RestockTable restockTable={result} />
      }
      else if(reportType == 'sales'){
        reportType = "salesPizza"
        const bodyPizza = { startDate, endDate, reportType }
        const resultPizza = await fetch('/api/manager/reports', {
          method: 'POST',
          body: JSON.stringify(bodyPizza)
        })
        reportType = "salesTopping"
        const bodyTopping = { startDate, endDate, reportType }
        const resultTopping = await fetch('/api/manager/reports', {
          method: 'POST',
          body: JSON.stringify(bodyTopping)
        })
        return <SalesTables pizzaTable={resultPizza} toppingTable={resultTopping} />
      }
      else if(reportType == 'excess'){
        const body = { startDate, endDate, reportType }
        const result = await fetch('/api/manager/reports', {
          method: 'POST',
          body: JSON.stringify(body)
        })
        return <ExcessTable excessTable={result} />
      }
      else if(reportType == 'together'){
        reportType = "together1"
        const body1 = { startDate, endDate, reportType }
        const result1 = await fetch('/api/manager/reports', {
          method: 'POST',
          body: JSON.stringify(body1)
        })
        reportType = "together2"
        const body2 = { startDate, endDate, reportType }
        const result2 = await fetch('/api/manager/reports', {
          method: 'POST',
          body: JSON.stringify(body2)
        })
        reportType = "together3"
        const body3 = { startDate, endDate, reportType }
        const result3 = await fetch('/api/manager/reports', {
          method: 'POST',
          body: JSON.stringify(body3)
        })
        reportType = "together4"
        const body4 = { startDate, endDate, reportType }
        const result4 = await fetch('/api/manager/reports', {
          method: 'POST',
          body: JSON.stringify(body4)
        })
        return <TogetherTables together1Table={result1} together2Table={result2} together3Table={result3} together4Table={result4}/>
      }
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
            <h1> {"\n"}</h1>
            <h4 className = {styles.header}> Monthly Sales </h4> 
          </Row>
        </Col>
        <Col>
          <InventoryDisplay inventory={inventory}/> 
        </Col>
      </Row>
      <Row>
        <Col>
          <InventoryTable inventory={inventory}/> 
        </Col>
      </Row>
      <Row>
        <MenuTable menu={menu}/>
      </Row>
      <Row>
        <p> {"\n"} </p>
        <h3> Reports </h3>
        <button onClick={(event) => setReportType(event.target.id)} id="restock"> Restock </button>
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
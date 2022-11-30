import * as Navbar from '@/components/Navbar/Navbar.js';

import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import stylesManager from '@/styles/manager.module.css'

import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DateSelect, { DateEnd, DateStart } from '../components/TextEntry/Datepicker.js';
import { InventoryDisplay } from '@/components/Table/InventoryTable.js';
import { MenuDisplay } from '@/components/Table/MenuTable.js';
import { prisma } from '@/lib/prisma'
import { useState, useEffect } from 'react'
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
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [reportType, setReportType] = useState("");

  const [restockData, setRestockData] = useState([]);
  const [salesPizzaData, setSalesPizzaData] = useState([]);
  const [salesToppingData, setSalesToppingData] = useState([]);
  const [excessData, setExcessData] = useState([]);
  const [together1Data, setTogether1Data] = useState([]);
  const [together2Data, setTogether2Data] = useState([]);
  const [together3Data, setTogether3Data] = useState([]);
  const [together4Data, setTogether4Data] = useState([]);

  useEffect(() => { 
    const generateReport = async () => {
      let start = startDate;
      let end = endDate;

      try {
        if(reportType == 'restock'){
          const body = { start, end, reportType }
          const response = await fetch('/api/manager/reports', {
            method: 'POST',
            body: JSON.stringify(body)
          })
          const result = await response.json()
          setRestockData(result)
        }
        else if(reportType == 'sales'){
          reportType = "salesPizza"
          const bodyPizza = { start, end, reportType }
          const responsePizza = await fetch('/api/manager/reports', {
            method: 'POST',
            body: JSON.stringify(bodyPizza)
          })
          const resultPizza = await responsePizza.json()
          reportType = "salesTopping"
          const bodyTopping = { start, end, reportType }
          const responseTopping = await fetch('/api/manager/reports', {
            method: 'POST',
            body: JSON.stringify(bodyTopping)
          })
          const resultTopping = await responseTopping.json()
          setSalesPizzaData(resultPizza)
          setSalesToppingData(resultTopping)
        }
        else if(reportType == 'excess'){
          const body = { start, end, reportType }
          const response = await fetch('/api/manager/reports', {
            method: 'POST',
            body: JSON.stringify(body)
          })
          const result = await response.json()
          setExcessData(result)
        }
        else if(reportType == 'together'){
          reportType = "together1"
          const body1 = { start, end, reportType }
          const response1 = await fetch('/api/manager/reports', {
            method: 'POST',
            body: JSON.stringify(body1)
          })
          const result1 = await response1.json()
          reportType = "together2"
          const body2 = { start, end, reportType }
          const response2 = await fetch('/api/manager/reports', {
            method: 'POST',
            body: JSON.stringify(body2)
          })
          const result2 = await response2.json()
          reportType = "together3"
          const body3 = { start, end, reportType }
          const response3 = await fetch('/api/manager/reports', {
            method: 'POST',
            body: JSON.stringify(body3)
          })
          const result3 = await response3.json()
          reportType = "together4"
          const body4 = { start, end, reportType }
          const response4 = await fetch('/api/manager/reports', {
            method: 'POST',
            body: JSON.stringify(body4)
          })
          const result4 = await response4.json()
          setTogether1Data(result1)
          setTogether2Data(result2)
          setTogether3Data(result3)
          setTogether4Data(result4)
        }
      } catch (error) {
        console.log(error);
      }
    }
    generateReport()
  }, [reportType])


  return (
    <Container fluid className="h-100">
      <Navbar.NavbarManager />
      <Row>
        <h1> Dashboard </h1>
      </Row>
      <Row>
        <Col md="5"> <h4 className = {styles.header}> Reports </h4> </Col>
        <Col md="7"> <h4 className = {styles.header}> Inventory at a Glance </h4></Col>
      </Row>
      <Row> 
        <Col>
          <Row>
            <Row>
            <p> {"\n"} </p>
        <Row>
          <Col md = "5"> 
            <h6> Select Start Date: </h6>
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
            <h6> Select End Date: </h6>
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
            <button onClick={()=>setReportType("sales")} id="sales" className={stylesManager.button}> Sales </button>
            <button onClick={()=>setReportType("excess")} id="excess" className={stylesManager.button}> Excess </button> 
            <button onClick={()=>setReportType("together")} id="together" className={stylesManager.button}> What Sales Together </button> 
            <button onClick={()=>setReportType("restock")} id="restock" className={stylesManager.button}> Restock </button>
            <p> {"\n"} </p>
          </Col>
        </Row>
        {(() => {
          if(reportType == "restock"){
            return <RestockTable restockTable={restockData} />
          }
          else if(reportType == "sales"){
            return <SalesTables pizzaTable={salesPizzaData} toppingTable={salesToppingData} />
          }
          else if(reportType == "excess"){
            return <ExcessTable excessTable={excessData} />
          }
          else if(reportType == "together"){
            return <TogetherTables together1Table={together1Data} together2Table={together2Data} together3Table={together3Data} together4Table={together4Data}/>
          }
          return null
        })()}
            </Row>
            <MenuDisplay menu={menu}/>
          </Row>
        </Col>
        <Col md = "7">
          <InventoryDisplay inventory={inventory}/> 
        </Col>
      </Row>
    </Container>
  )
}
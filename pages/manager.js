import * as Navbar from '@/components/Navbar/Navbar.js';

import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
<<<<<<< HEAD
import stylesManager from '@/styles/manager.module.css'
=======
>>>>>>> Manager dashboard layout completed

import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import DateSelect, { DateEnd, DateStart } from '../components/TextEntry/Datepicker.js';
import InventoryTable, { InventoryDisplay } from '@/components/Table/InventoryTable.js';
<<<<<<< HEAD
=======
import MonthlySales from '@/components/Table/MonthlySales.js';
import RestockTable from '@/components/Table/RestockTable.js';
>>>>>>> Manager dashboard layout completed
=======
import InventoryTable from '@/components/Table/InventoryTable.js';
import ReportsTable from '@/components/Table/ReportsTable.js';
>>>>>>> Reorganized and started Reports
import MenuTable from '@/components/Table/MenuTable.js';
import { prisma } from '@/lib/prisma'
import { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker';
=======
import InventoryTable from '@/components/Table/InventoryTable.js';
=======
import {InventoryTable} from '@/components/Table/InventoryTable.js';
>>>>>>> Created Files for tables. Need to fix bug in manager
import MenuTable from '@/components/Table/MenuTable.js';
import { InventoryDisplay } from '@/components/Table/InventoryTable.js';
import { prisma } from '@/lib/prisma'
import { useState } from 'react'
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
//Tables
import RestockTable from '@/components/Table/RestockTable';
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> Added delete for inventory and menu
=======
import SalesPizzaTable from '@/components/Table/SalesPizzaTable';
import SalesToppingTable from '@/components/Table/SalesToppingTable';
import ExcessTable from '@/components/Table/excessTable';
import Together1Table from '@/components/Table/Together1Table';
import Together2Table from '@/components/Table/Together2Table';
import Together3Table from '@/components/Table/Together3Table';
import Together4Table from '@/components/Table/Together4Table';
>>>>>>> Created Files for tables. Need to fix bug in manager

<<<<<<< HEAD
import "react-datepicker/dist/react-datepicker.css";
//Tables
import RestockTable from '@/components/Table/RestockTable';
import SalesTables from '@/components/Table/SalesTables';
import ExcessTable from '@/components/Table/ExcessTable';
import TogetherTables from '@/components/Table/TogetherTables';

import { useSession } from "next-auth/react"
import { useRouter } from 'next/router'
=======
import SalesTables from '@/components/Table/SalesTables';
import ExcessTable from '@/components/Table/excessTable';
import TogetherTables from '@/components/Table/TogetherTables';
>>>>>>> Refactored report tables. Still need to fix bug in reports

=======
>>>>>>> Manager dashboard layout completed
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

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
export default function Manager({inventory}) {
  const { data: session } = useSession()
  const router = useRouter()

  // Prefetch the redirect page for unathorized users
  useEffect(() => {
    router.prefetch('/unauthorized')
  }, [])

  // redirect if the user doesn't have a manager role
  useEffect(() => {
    if(session?.user.role != "M"){
      router.push("/unauthorized")
    }
  }, [session])

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


=======
export default function server({inventory, menu}) {
>>>>>>> Manager dashboard layout completed
=======


=======
>>>>>>> Created Files for tables. Need to fix bug in manager
export default function manager({inventory, menu}) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [reportType, setReportType] = useState("");

  const generateReport = async (event) => {
    event.preventDefault()
    console.log(startDate, endDate)

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

>>>>>>> Added delete for inventory and menu
  return (
    <Container fluid className="h-100">
      <Navbar.NavbarManager user={session.user} />
      <Row>
        <h1> Dashboard </h1>
      </Row>
      <Row>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        <Col md="5"> <h4 className = {styles.header}> Reports </h4> </Col>
        <Col md="7"> <h4 className = {styles.header}> Inventory at a Glance </h4></Col>
=======
        <Col> <h4 className = {styles.header}> Reports </h4> </Col>
        <Col> <h4 className = {styles.header}> Inventory at a Glance </h4></Col>
>>>>>>> Manager dashboard layout completed
=======
        <Col md="5"> <h4 className = {styles.header}> Reports </h4> </Col>
        <Col md="7"> <h4 className = {styles.header}> Inventory at a Glance </h4></Col>
>>>>>>> Changed ID names of tables
      </Row>
      <Row> 
        <Col>
          <Row>
<<<<<<< HEAD
<<<<<<< HEAD
            <Row>
            <p> {"\n"} </p>
        <Row>
          <Col md = "5"> 
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
          </Row>
        </Col>
        <Col md = "7">
          <InventoryDisplay inventory={inventory}/> 
        </Col>
=======
        <h2 className = {styles.header}> Inventory At a Glance </h2>
        <InventoryTable inventory={inventory}/>
>>>>>>> Reorganized and started Reports
      </Row>
      {/* <Row>
        <Col>
          <InventoryTable inventory={inventory}/> 
        </Col>
      </Row> */}
      {/* <Row>
        <MenuTable menu={menu}/>
<<<<<<< HEAD
      </Row> */}
=======
      </Row>
      <Row>
        <p> {"\n"} </p>
        <h3> Reports </h3>
        
        <ReportsTable inventory={inventory}/>
      </Row>
>>>>>>> Reorganized and started Reports
    </Container>
=======
            <form>
              <DateSelect />
            </form>
          </Row>
          <Row>
=======
>>>>>>> Created Files for tables. Need to fix bug in manager
            <h1> {"\n"}</h1>
            <h4 className = {styles.header}> Monthly Sales </h4> 
          </Row>
        </Col>
        <Col>
          <InventoryDisplay inventory={inventory}/> 
        </Col>
      </Row>
<<<<<<< HEAD
<<<<<<< HEAD

    </Container> 
>>>>>>> Manager dashboard layout completed
=======
      <Row>
=======
      {/* <Row>
>>>>>>> Changed ID names of tables
        <Col>
          <InventoryTable inventory={inventory}/> 
        </Col>
      </Row> */}
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
              <button onClick={(event) => setReportType(event.target.id)} type = "submit" id="sales"> Sales </button>
              <button onClick={(event) => setReportType(event.target.id)} type = "submit" id="excess"> Excess </button> 
              <button onClick={(event) => setReportType(event.target.id)} type = "submit" id="together"> What Sales Together </button> 
              <p> {"\n"} </p>
            </Col>
          </Row>
        </form>
        {(() => {
          if (reportType !== "") {
            return generateReport(event);
          }
          return null
        })()}
      </Row>
    </Container>
>>>>>>> Added delete for inventory and menu
  )
}
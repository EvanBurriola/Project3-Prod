import { ManagerNavbar } from '@/components/Navbar/Navbar.js';

import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

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
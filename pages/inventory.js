import * as Navbar from '@/components/Navbar/Navbar.js';

import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { prisma } from '@/lib/prisma'

import "react-datepicker/dist/react-datepicker.css";

import { useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { EditableInventory } from '@/components/Table/InventoryTable.js';

export async function getServerSideProps(){
  const inventory = await prisma.inventory.findMany({
    orderBy: {
      inventoryid: 'asc',
    },
  })
  return {
    props: {
        inventory,
    }
  }
}

export default function Inventory({inventory}) {
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

  return (
    <Container fluid className="h-100">
      <Navbar.NavbarManager user={session.user}/>
      <Row>
        <h1> Inventory Management </h1>
      </Row>
      <Row>
        <p> {"\n"} </p>
        <h3> Inventory </h3>
      </Row>
      <Row>
        <EditableInventory inventory={inventory}/> 
      </Row>
    </Container>
  )
}
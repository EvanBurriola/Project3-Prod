import ManagerNavbar from '@/components/Navbar/ManagerNavbar';

import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EmployeeTable from '../../components/Table/EmployeeTable.js';

export default function inventory () {
    return (
      <Container>
          <ManagerNavbar />
          <p> {"\n"} </p>
          <EmployeeTable />
      </ Container>
    )
}
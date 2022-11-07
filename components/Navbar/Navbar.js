// any imports
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export const ManagerNavbar = () => {
    return (
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#dashboard">Spin 'N Stone</Navbar.Brand>
          <Navbar.Toggle aria-controls="manager-navbar" />
          <Navbar.Collapse id="manager-navbar">
            <Nav className="navigations">
              <Nav.Link href="#dashboard">Dashboard</Nav.Link>
              <Nav.Link href="#inventory">Inventory</Nav.Link>
              <Nav.Link href="../pages/Manager/employees.js">Employees</Nav.Link>
              <Nav.Link href="#server">Switch View</Nav.Link>
            </Nav>
          </Navbar.Collapse>
      </Navbar>
    );
}
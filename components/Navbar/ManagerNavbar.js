import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

// Navigation bar for a manager view
// TODO: Implement functions to go to another page
function ManagerNavbar() {
    return (
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#dashboard">Spin 'N Stone</Navbar.Brand>
          <Navbar.Toggle aria-controls="manager-navbar" />
          <Navbar.Collapse id="manager-navbar">
            <Nav className="navigations">
              <Nav.Link href="#dashboard">Dashboard</Nav.Link>
              <Nav.Link href="#inventory">Inventory</Nav.Link>
              <Nav.Link href="#employees">Employees</Nav.Link>
              <Nav.Link href="#server">Switch View</Nav.Link>
            </Nav>
          </Navbar.Collapse>
      </Navbar>
    );
}

export default ManagerNavbar;
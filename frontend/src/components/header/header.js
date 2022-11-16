import React from "react";
import { Container, Navbar , Nav, NavDropdown} from "react-bootstrap";
import BarraBusqueda from "../barraBusqueda/barraBusqueda";
import './header.css';
import logo from '../../media/logo.png'
import { Link } from 'react-router-dom'

function header() {
  return (
    <Navbar  expand="lg" variant="light" bg="light">
      <Container className="navegation-body">
        <Navbar.Brand href="/">
          <img
            src={ logo }
            width="100%"
            height="100%"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
        <Nav className="items-nav">
          <Nav.Link href="/">Nosotros</Nav.Link> 
            <NavDropdown title="Publicaciones" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1" className="ml-5">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2" className="mx-3"> Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            </NavDropdown>
          <BarraBusqueda></BarraBusqueda>
          <Nav.Link href="/Login" className="user-seccion ">Inicio Sesion/Registrate</Nav.Link>
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default header;

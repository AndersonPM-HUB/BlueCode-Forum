import React from "react";
import { Container, Navbar , Nav} from "react-bootstrap";
import BarraBusqueda from "../barraBusqueda/barraBusqueda";
import Links from "../links/links";
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

          <Links></Links> 
          <BarraBusqueda></BarraBusqueda>

          <Nav.Link href="/Login" className="user-seccion ">Inicio Sesion</Nav.Link>
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default header;

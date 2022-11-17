import React from 'react'
import {NavDropdown} from "react-bootstrap";
import { Link } from 'react-router-dom'


export default function Links(props) {
    
  return (
    <NavDropdown title="Publicaciones" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1" className="ml-5">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2" className="mx-3"> Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            </NavDropdown>
  )
}

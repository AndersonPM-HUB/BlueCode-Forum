import React, { useState } from "react";
import { Button, Form, Container, Row, Col} from "react-bootstrap";
import Imagenes from "../imagenes/imagenes";
import icono from "../../media/Icono.PNG";
import { Link } from "react-router-dom";
import "./login.css";


export default function Register() {

  const [validated, setValidated] = useState(false);
  
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <Container id="contenido">
      <Row>
        <Col>
          <Imagenes imagen={icono} text="icono" id="imagen" />
        </Col>

        <Col>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <h2>Regitrate es Gratis!!</h2>
            <Row className="mb-2">
              
              <Form.Group as={Col} md="12" controlId="validationCustom01">
                <Form.Label>NickName</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Usuario"
                />
               
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="validationCustom02">
                <Form.Label>Nombres</Form.Label>
                <Form.Control
                  required
                  type="text"
                />
              
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="validationCustomUsername">
                <Form.Label>Apellidos</Form.Label>
                  <Form.Control
                    type="text"
                    required
                  />
              </Form.Group>
            </Row>


            <Row className="mb-2">

              <Form.Group as={Col} md="12" controlId="validationCustom03">
                <Form.Label>Correo</Form.Label>
                <Form.Control type="email" placeholder="@" required />
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="validationCustom04">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" required />
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="validationCustom04">
                <Form.Label>Confirmar Contraseña</Form.Label>
                <Form.Control type="password" required />
              </Form.Group>

          
            </Row>
            <Form.Group className="mb-3">
              <Form.Check
                required
                label="Agree to terms and conditions"
                feedback="You must agree before submitting."
                feedbackType="invalid"
              />
            </Form.Group>
            <Button type="submit">Registrarse</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

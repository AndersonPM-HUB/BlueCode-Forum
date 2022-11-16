import React from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import Imagenes from "../imagenes/imagenes";
import icono from "../../media/Icono.PNG";
import { Link } from "react-router-dom";
import "./login.css";

export default function Login() {
  return (
    <Container id="contenido">
      <Row>
        <Col>
          <Imagenes imagen={icono} text="icono" id="imagen" />
        </Col>
        <Col>
          <Form>
            <h2>Iniciar Sesión</h2>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
             
            >
              <Form.Label column sm="3">
                Usuario/Correo:
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" placeholder="Usuario"  required />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="3">
                Contraseña:
              </Form.Label>
              <Col sm="10">
                <Form.Control type="password" placeholder="Password" required/>
              </Col>
              <Link to="/Register">¿Olvidasete tu constraseña? </Link>
            </Form.Group>
            <Col sm="10">
              <Button variant="primary" type="submit">
                {" "}
                Ingresar{" "}
              </Button>
            </Col>
            <Link to="/Register">Si no tienes cuenta , Registrate! </Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

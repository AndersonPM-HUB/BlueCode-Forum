import { React, useState } from "react";
import { Button, Form, Container, Row, Col, Alert } from "react-bootstrap";
import Imagenes from "../imagenes/imagenes";
import icono from "../../media/Icono.PNG";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [contraseña, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState("");
  //navegar a otra pagina
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    console.log(email, contraseña);
    event.preventDefault();

    try {
      setLoading("logeando....");
      const { data } = await axios.post(
        "https://bluecode.onrender.com/usuarios/ingresar",
        { email, contraseña }
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      setError(error.response.data.contenido);
    } finally {
      setLoading("");
    }
  };
  return (
    <Container id="contenido">
      <Row>
        <Col>
          <Imagenes imagen={icono} text="icono" id="imagen" />
        </Col>
        <Col>
          <Form onSubmit={submitHandler}>
            <h2>Iniciar Sesión</h2>

            {error && (
              <Alert key={"danger"} variant={"danger"}>
                {error}
              </Alert>
            )}
            {loading && (
              <Alert key={"light"} variant={"light"}>
                {loading}
              </Alert>
            )}
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="3">
                Usuario/Correo:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="Usuario"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
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
                <Form.Control
                  type="password"
                  placeholder="Password"
                  required
                  value={contraseña}
                  onChange={(e) => setPassword(e.target.value)}
                />
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

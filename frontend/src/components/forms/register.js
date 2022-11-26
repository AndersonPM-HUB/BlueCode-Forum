import React, { useState } from "react";
import { Button, Form, Container, Row, Col, Alert } from "react-bootstrap";
import Imagenes from "../imagenes/imagenes";
import icono from "../../media/Icono.PNG";
import { useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";

export default function Register() {
  //estados de los inputs
  const [nickname, setNickname] = useState("");
  const [nombres, setName] = useState("");
  const [apellidos, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contraseña, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState("");
  const [message, setMessage] = useState(null);
  //navegar a otra pagina
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    if (contraseña !== confirmpassword) {
      setMessage("Contraseñas no Coinciden");
    } else {
      setMessage(null);
      try {
        setLoading("Registrando....");
        const { data } = await axios.post(
          "https://bluecode.onrender.com/usuarios/registrar",
          { nickname, nombres, apellidos, email, contraseña }
        );
        setMessage("");
        localStorage.setItem("userInfo", JSON.stringify(data));
        navigate("/Login");
      } catch (error) {
        setError(error.response.data.contenido);
      } finally {
        setLoading("");
      }
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
            <h2>Regitrate es Gratis!!</h2>

            {message && (
              <Alert key={"danger"} variant={"danger"}>
                {message}
              </Alert>
            )}
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

            <Row className="mb-2">
              <Form.Group as={Col} md="12" controlId="validationCustom01">
                <Form.Label>NickName</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Usuario"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="validationCustom02">
                <Form.Label>Nombres</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={nombres}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="validationCustomUsername">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={apellidos}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col} md="12" controlId="validationCustom03">
                <Form.Label>Correo</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="@email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="validationCustom04">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  required
                  value={contraseña}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="validationCustom04">
                <Form.Label>Confirmar Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  required
                  value={confirmpassword}
                  onChange={(e) => setConfirmpassword(e.target.value)}
                />
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

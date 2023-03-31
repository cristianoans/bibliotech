import { useState } from "react";
import images from "../../assets/images/login.png";
import { Button, Container } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import "./NotFound.css";

export function NotFound() {
  const [show, setShow] = useState(false);
  const closeModal = () => setShow(false);
  const openModal = () => setShow(true);
  return (

    <Container>
      <div className="notfound">
        <h1>Ops...Página não Encontrada!</h1>

        <img src={images} alt="Bibliotech" style={{ width: "400px", height: "auto" }} />

        <div className="button">

          <Button variant="secondary" href="/">Voltar</Button>
          <Button variant="success" href="/login">Login</Button>
          <Button variant="danger" onClick={openModal}>Reportar Erro</Button>
        </div>

        <Modal show={show} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Reportar Erro</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>E-mail:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Insira seu e-mail"
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="textarea"
              >
                <Form.Label>Descrição do erro:</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Fechar
            </Button>
            <Button variant="primary" onClick={closeModal}>
              Salvar
            </Button>
          </Modal.Footer>
        </Modal>


      </div>
    </Container>
  );
}
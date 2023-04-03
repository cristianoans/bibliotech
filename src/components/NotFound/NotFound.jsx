import { useState } from "react";
import images from "../../assets/images/login.png";
import { Button, Container } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import "./NotFound.css";
import { useForm } from "react-hook-form";
import { addReporteErro } from "../../firebase/reporteerros";
import { toast } from "react-hot-toast";

export function NotFound() {
  const [show, setShow] = useState(false);
  const closeModal = () => setShow(false);
  const openModal = () => setShow(true);
  const { register, handleSubmit, formState: { errors } } = useForm();

  function getFormulario (data) {
  
  addReporteErro(data)
  toast.success("Erro registrado com sucesso!", { duration: 2000, position: "top-center" })
  setShow(false)
  }

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
            <Form onSubmit={handleSubmit(getFormulario)}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>E-mail:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Insira seu e-mail"
                  autoFocus
                  {...register("email", {required:"campo obrigatório"})}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="textarea"
              >
                <Form.Label>Descrição do erro:</Form.Label>
                <Form.Control as="textarea" rows={3}
                  {...register("erro", { required: "campo obrigatório" })} />

              </Form.Group>
              <Button type="submit">Enviar</Button>
            </Form>
          </Modal.Body>
        </Modal>


      </div>
    </Container>
  );
}
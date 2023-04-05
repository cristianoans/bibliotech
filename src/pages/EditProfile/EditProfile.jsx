import { useContext, useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { excluirConta, updateUser } from "../../firebase/auth";
import { toast } from "react-hot-toast";
import "./EditProfile.css";


export function EditProfile() {
  const usuarioLogado = useContext(AuthContext);
  const [user, setUser] = useState();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  useEffect(() => {
    reset({ email: usuarioLogado.email, displayName: usuarioLogado.displayName });
  }, [])
  function updatePerfil(data) {
    console.log(data);
    updateUser(usuarioLogado, data)
      .then(() => {
        toast.success("Perfil atualizado com sucesso!", { duration: 2000, position: "bottom-right" })
      })

      .catch(() => {
        toast.error("Erro ao salvar!", { duration: 2000, position: "bottom-right" })
      })
  }
  function deletarUsuario(usuarioLogado) {
    excluirConta(usuarioLogado).then(() => {
      toast.success("Perfil excluído com sucesso!", { duration: 2000, position: "bottom-right" })
    })
     
  }


  return (
    <div>
      <Container>
        <h1 style={{ marginTop: "20px", marginBottom: "20px" }} >Perfil</h1>
      </Container>
      <Container>
        <Form className="form" onSubmit={handleSubmit(updatePerfil)}>

          <Form.Group controlId="email" className="form-group">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" {...register("email", { required: "campo obrigatorio" })} />
          </Form.Group>

          <Form.Group controlId="password" className="form-group">
            <Form.Label>Nova senha</Form.Label>
            <Form.Control type="password" {...register("senha", { required: "campo obrigatorio" })} />
          </Form.Group>

          <Form.Group controlId="displayName" className="form-group">
            <Form.Label>Nome de Exibição</Form.Label>
            <Form.Control type="text"  {...register("displayName", { required: "campo obrigatorio" })} />
          </Form.Group>

          <div className="form-buttons">
            <Button type="submit"className="btn">Salvar</Button>
            <Button variant="danger" onClick={() => deletarUsuario(usuarioLogado)} >Excluir Perfil</Button>
          </div>
        </Form>
      </Container>
    </div>

  );
}

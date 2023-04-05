import { useContext, useState } from "react";
import { Button, Container, Form, InputGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import googleIcon from "../../assets/icons/google-white.svg";
import loginImg from "../../assets/images/login.png";
import { AuthContext } from "../../contexts/AuthContext";
import { loginGoogle, loginEmailSenha, loginFacebook, loginGitHub } from "../../firebase/auth";
import { firebaseError } from "../../firebase/firebaseError";

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  function onSubmit(data) {
    const { email, senha } = data;
    loginEmailSenha(email, senha)
      .then((user) => {
        toast.success(`Entrando como ${user.email}`, {
          position: "bottom-right",
          duration: 2500,
        });
        navigate("/");
      })
      .catch((erro) => {
        toast.error(`Um erro aconteceu. Código: ${firebaseError(erro.code)}`, {
          position: "bottom-right",
          duration: 2500,
        });
      });
  }

  const tooltipGoogle = <Tooltip>Login com Google</Tooltip>;
  const tooltipFace = <Tooltip>Login com Facebook</Tooltip>;
  const tooltipGit = <Tooltip>Login com GitHub</Tooltip>;
  const tooltipEntrar = <Tooltip>Clique para Entrar</Tooltip>;
  

  const [tipoInput, setTipoInput] = useState("password");
  const [tipoIcone, setTipoIcone] = useState("bi bi-eye-slash-fill");
  function mudarTipo() {
    if (tipoInput === "password") {
      setTipoIcone("bi bi-eye-fill")
      setTipoInput("text")
    } else {
      setTipoIcone("bi bi-eye-slash-fill")
      setTipoInput("password")
    }
  }



  function onLoginGoogle() {
    loginGoogle()
      .then((user) => {
        toast.success(`Bem-vindo(a) ${user.email}`, {
          position: "bottom-right",
          duration: 2500,
        });
        navigate("/");
      })
      .catch((erro) => {
        toast.error(`Um erro aconteceu. Código: ${firebaseError(erro.code)}`, {
          position: "bottom-right",
          duration: 2500,
        });
      });
  }


  function onLoginFacebook() {
    loginFacebook()
      .then((user) => {
        toast.success(`Bem-vindo(a) ${user.email}`, {
          position: "bottom-right",
          duration: 2500,
        });
        navigate("/");
      })
      .catch((erro) => {
        toast.error(`Um erro aconteceu. Código: ${firebaseError(erro.code)}`, {
          position: "bottom-right",
          duration: 2500,
        });
      });
  }


  function onLoginGitHub() {
    loginGitHub()
      .then((user) => {
        toast.success(`Bem-vindo(a) ${user.email}`, {
          position: "bottom-right",
          duration: 2500,
        });
        navigate("/");
      })
      .catch((erro) => {
        toast.error(`Um erro aconteceu. Código: ${firebaseError(erro.code)}`, {
          position: "bottom-right",
          duration: 2500,
        });
      });
  }

  const usuarioLogado = useContext(AuthContext);

  // Se tiver dados no objeto, está logado
  if (usuarioLogado !== null) {
    return <Navigate to="/" />;
  }

  return (
    <Container fluid className="my-5">
      <p className="text-center">
        <img src={loginImg} width="256" alt="Logo" />
      </p>
      <h4>Bem-vindo(a) de volta!</h4>
      <p className="text-muted">
        Não tem conta? <Link to="/cadastro">Cadastre-se</Link> 
      </p>
      <hr />

      <OverlayTrigger overlay={tooltipGoogle}>
      <Button className="mb-3 me-1" variant="danger" onClick={onLoginGoogle}>
        <i class="bi bi-google"></i> Entre com o
        Google
      </Button>
      </OverlayTrigger>

      <OverlayTrigger overlay={tooltipFace}>
      <Button className="mb-3 me-1" variant="primary" onClick={onLoginFacebook}>
      <i className="bi bi-facebook"></i> Entre com o
        Facebook
      </Button>
      </OverlayTrigger>

      <OverlayTrigger overlay={tooltipGit}>
      <Button className="mb-3" variant="secondary" onClick={onLoginGitHub}>
      <i className="bi bi-github"></i> Entre com o
        GitHub
      </Button>
      </OverlayTrigger>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Seu email"
            className={errors.email ? "is-invalid" : ""}
            {...register("email", { required: "Email é obrigatório" })}
          />
          <Form.Text className="invalid-feedback">
            {errors.email?.message}
          </Form.Text>
        </Form.Group>
        <Form.Label>Senha</Form.Label>
        <InputGroup className="mb-3" controlId="senha">
          <InputGroup.Text onClick={mudarTipo}><i className={tipoIcone}></i></InputGroup.Text>
          <Form.Control
            onCh
            id="senha"
            type={tipoInput}
            placeholder="Sua senha"
            className={errors.senha ? "is-invalid" : ""}
            {...register("senha", { required: "Senha é obrigatória" })}
          />
          <Form.Text className="invalid-feedback">
            {errors.senha?.message}
          </Form.Text>
        </InputGroup>
        <OverlayTrigger overlay={tooltipEntrar}>
        <Button type="submit" variant="success">
          Entrar
        </Button>
        </OverlayTrigger>
      </Form>
    </Container>
  );
}
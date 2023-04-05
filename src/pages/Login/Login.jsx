import { useContext, useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import googleIcon from "../../assets/icons/google-white.svg";
import loginImg from "../../assets/images/login.png";
import { AuthContext } from "../../contexts/AuthContext";
import {
  loginGoogle,
  loginEmailSenha,
  loginFacebook,
  loginGitHub,
} from "../../firebase/auth";
import { firebaseError } from "../../firebase/firebaseError";
import "./Login.css";

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

  const [tipoInput, setTipoInput] = useState("password");
  const [tipoIcone, setTipoIcone] = useState("bi bi-eye-slash-fill");
  function mudarTipo() {
    if (tipoInput === "password") {
      setTipoIcone("bi bi-eye-fill");
      setTipoInput("text");
    } else {
      setTipoIcone("bi bi-eye-slash-fill");
      setTipoInput("password");
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
    <Container
      fluid
      className="my-5 d-flex align-items-center flex-column containerLogin"
    >
      <div className="login">
        <h2 className="text-center">Bibliotech</h2>

        <p className="text-center logoLogin">
          <img src={loginImg} width="256" alt="Logo" />
        </p>

        <h4>Bem-vindo(a) de volta!</h4>

        <p className="text-dark">
          Não tem conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>

        <hr />

        <div className="btnSocial">
          <Button className="mb-3" variant="danger" onClick={onLoginGoogle}>
            <img src={googleIcon} width="32" alt="Google icon" /> Entrar com o
            Google
          </Button>

          <Button className="mb-3" variant="primary" onClick={onLoginFacebook}>
            <i className="bi bi-facebook"></i> Entrar com o Facebook
          </Button>

          <Button className="mb-3" variant="secondary" onClick={onLoginGitHub}>
            <i className="bi bi-github"></i> Entrar com o GitHub
          </Button>
        </div>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>
              <b>Email</b>
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Seu email"
              className={errors.email ? "is-invalid inputStyle" : "inputStyle"}
              {...register("email", { required: "Email é obrigatório" })}
            />
            <Form.Text className="invalid-feedback">
              {errors.email?.message}
            </Form.Text>
          </Form.Group>

          <Form.Label>
            <b>Senha</b>
          </Form.Label>

          <InputGroup className="mb-3 inputStyleSenha">
            <InputGroup.Text onClick={mudarTipo}>
              <i className={tipoIcone}></i>
            </InputGroup.Text>
            <Form.Control
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
          <div className="d-flex justify-content-center">
            <Button type="submit" className="btnSubmit">
              Entrar
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
}

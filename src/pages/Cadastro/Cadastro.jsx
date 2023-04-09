import { Button, Container, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import logoIcon from "../../assets/icons/livros.png";
import { useForm } from "react-hook-form";
import { cadastrarEmailSenha, loginFacebook, loginGitHub, loginGoogle } from "../../firebase/auth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { firebaseError } from "../../firebase/firebaseError";
import "./Cadastro.css";

export function Cadastro() {
  const tooltipGoogle = <Tooltip>Login com Google</Tooltip>;
  const tooltipFace = <Tooltip>Login com Facebook</Tooltip>;
  const tooltipGit = <Tooltip>Login com GitHub</Tooltip>;
  const tooltipCadastrar = <Tooltip>Clique para cadastrar!</Tooltip>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  function onSubmit(data) {
    const { email, senha } = data;
    cadastrarEmailSenha(email, senha)
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

  function onLoginGoogle() {
    // then = quando der certo o processo
    loginGoogle()
      .then((user) => {
        toast.success(`Bem-vindo(a) ${user.email}`, {
          position: "bottom-right",
          duration: 2500,
        });
        navigate("/");
      })
      .catch((erro) => {
        // tratamento de erro
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

  return (
    
    <Container fluid className="d-flex align-items-center flex-column cadastroContainer">
      <div className="cadastro">
      <p className="text-center">
        <img src={logoIcon} width="256" alt="Logo do app" />
      </p>
      <h4>Faça parte da nossa plataforma</h4>
      <p className="text-muted">
        Já tem conta? <Link to="/login">Entre</Link>
      </p>
      <hr />
      <OverlayTrigger overlay={tooltipGoogle}>
        <Button className="mb-3 me-1" variant="danger" onClick={onLoginGoogle}>
          <i className="bi bi-google"></i> Cadastre com o
          Google
        </Button>
      </OverlayTrigger>

      <OverlayTrigger overlay={tooltipFace}>
        <Button className="mb-3 me-1 " variant="primary" onClick={onLoginFacebook}>
          <i className="bi bi-facebook"></i> Cadastre com o
          Facebook
        </Button>
      </OverlayTrigger>

      <OverlayTrigger overlay={tooltipGit}>
        <Button className="mb-3 " variant="secondary" onClick={onLoginGitHub}>
          <i className="bi bi-github"></i> Cadastre com o
          GitHub
        </Button>
      </OverlayTrigger>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            className={errors.email && "is-invalid"}
            placeholder="Seu email"
            {...register("email", { required: "O email é obrigatório" })}
          />
          <Form.Text className="invalid-feedback">
            {errors.email?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            className={errors.senha && "is-invalid"}
            placeholder="Sua senha"
            {...register("senha", { required: "A senha é obrigatória" })}
          />
          <Form.Text className="invalid-feedback">
            {errors.senha?.message}
          </Form.Text>
        </Form.Group>
        <OverlayTrigger overlay={tooltipCadastrar}>
          <Button type="submit" variant="success">
            Cadastrar
          </Button>
        </OverlayTrigger>
      </Form>
      </div>
    </Container>
    
  );
}
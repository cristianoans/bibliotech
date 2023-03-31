import "./Menu";
import { Container, Nav, Navbar } from "react-bootstrap";
import logoIcon from "./../../assets/icons/livros.png";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext"; //nome de usuario perto logout

export function Menu() {
  const navigate = useNavigate();

  const usuarioLogado = useContext(AuthContext); //nome de usuario perto logout

  function onLogout() {
    logout().then(() => {
      navigate("/login");
    });
  }

  return (
    <Navbar bg="success" variant="light" expand="lg">
      <Container fluid>
        <Navbar.Brand>
          <Link to="/">
            <img src={logoIcon} width="32" alt="Logo" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/livros">
              Livros
            </Nav.Link>
            <Nav.Link as={Link} to="/emprestimos">
              Emprestimos
            </Nav.Link>
            
              {usuarioLogado && ( //nome de usuario perto logout
                //className com BootStrap
                // Lembrar de estilizar
                <Nav.Link className="
                text-white-50 bg-dark
                border border-3
                rounded
                "
                >{usuarioLogado.email.split('@')[0]}</Nav.Link> ///nome de usuario perto logout
              )} 
            <Nav.Link onClick={onLogout}>
              <i className="bi bi-box-arrow-right"></i>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

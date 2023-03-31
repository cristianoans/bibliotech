
import "./Menu.css";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import logoIcon from "./../../assets/icons/livros.png";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../firebase/auth";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext"; //nome de usuario perto logout


export function Menu() {
  //Controle de execução do OffCanvas
  const [show, setShow] = useState(false);

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
        <Navbar.Toggle onClick={() => setShow(true)} />

        {/* Aqui é o Offcanvas - Ao diminuir a tela, a navbar renderiza um toogle(botão). Clicando nele, abre o Offcanvas, que é um tipo de modal lateral */}
        <Offcanvas
          className="offCanvas"
          show={show}
          onHide={() => setShow(false)}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu Bibliotech</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/livros">
                Livros
              </Nav.Link>
              <Nav.Link as={Link} to="/emprestimos">
                Emprestimos
              </Nav.Link>
            <Nav.Link as={Link} to="politica-privacidade">
              Política de Privacidade
            </Nav.Link>
              <Nav.Link

                onClick={() => {
                  onLogout();
                  setShow(false);
                }}
              >
                <i className="bi bi-box-arrow-right"></i> Logout
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>

        {/*Aqui eu fiz renderização condicional que, ao abrir o OffCanvas, o menu colapse não abre junto. Se eu voltar a um tamanho maior de tela, a Navbar mantém os componentes que estavam no Menu, só que sem um toggle(botão)  */}
        {!show && (
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
              <Nav.Link as={Link} to="politica-privacidade">
              Política de Privacidade
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
        )}
      </Container>
    </Navbar>
  );
}
import { useEffect, useState } from "react";
import { Button, Container, Table, Modal } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { deleteLivro, getLivros } from "../../firebase/livros";
import "./Livros.css";
import { ThemeColorContext } from "../../contexts/ThemeColorContext";
import { DetalhesLivroModal } from "../../components/DetalhesLivroModal/DetalhesLivroModal";

export function Livros() {

  const { temaEscuro } = ThemeColorContext();
  const [livros, setLivros] = useState(null);
  const [show, setShow] = useState(false);
  const [livro, setLivro] = useState(null);

  // Estado para mostrar ou ocultar o modal de detalhes do livro
  const [showDetalhesLivro, setShowDetalhesLivro] = useState(false);

  useEffect(() => {
    initializeTable();
  }, []);

  function initializeTable() {
    getLivros().then((resultados) => {
      setLivros(resultados);
    });
  }

  // Função que exibe o modal de detalhes do livro
  function openDetalhesLivro(livro) {
    setLivro(livro); // Atualiza o estado do Livro com o livro selecionado
    setShowDetalhesLivro(true); // Ativa o estado para mostrar o modal de detalhes do livro
  }

  // Função para fechar o modal de detalhes do livro
  function closeDetalhesLivro() {
    setShowDetalhesLivro(false); // Desative o estado para ocultar o modal de detalhes do livro
  }

  function onDeleteLivro(id, titulo) {
    const deletar = window.confirm(
      `Tem certeza que deseja excluir o livro ${titulo}?`
    );
    if (deletar) {
      deleteLivro(id).then(() => {
        toast.success(`${titulo} apagado com sucesso!`, {
          duration: 2000,
          position: "bottom-right",
        });
        initializeTable();
      });
    }
  }

  function handleShow(livro) {
    setLivro(livro);
    setShow(true);
  }
  function handleClose() {
    setShow(false);
    setLivro(null);
  }

  return (
    <div className={temaEscuro === "dark" ? "bg-secondary text-white" : ""}>
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <h1>Livros</h1>
          <Button as={Link} to="/livros/adicionar"
            className={temaEscuro === "dark" ? "bg-dark text-white" : "bg-success"}
            variant="bg-dark" >
            Adicionar Livro
          </Button>
        </div>
        <hr />
        {livros === null ? (
          <Loader />
        ) : (
          <Table striped bordered hover className={temaEscuro === "dark" ? "table table-dark table-striped" : ""}>
            <thead>
              <tr>
                <th>Título</th>
                <th>Autor</th>
                <th>Categoria</th>
                <th>ISBN</th>
                <th>Imagem</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {livros.map((livro) => {
                return (

                  <tr
                    key={livro.id}
                    className={
                      temaEscuro === "dark"
                        ? "themeDark-livros"
                        : "themeLight-livros"
                    }
                  >

                    <td>{livro.titulo}</td>
                    <td>{livro.autor}</td>
                    <td>{livro.categoria}</td>
                    <td>{livro.isbn}</td>
                    <td onClick={() => handleShow(livro)}>
                      <img src={livro.urlCapa} alt={livro.titulo} />
                    </td>
                    <td>
                      <Button as={Link} to={`/livros/editar/${livro.id}`} bsPrefix="btn btn-sm btn-warning me-1">
                        <i className="bi bi-pencil-fill"></i>
                      </Button>
                      <Button onClick={() => onDeleteLivro(livro.id, livro.titulo)} bsPrefix="btn btn-sm btn-danger me-1">
                        <i className="bi bi-trash3-fill"></i>
                      </Button>
                      <Button onClick={() => openDetalhesLivro(livro)} bsPrefix="btn btn-sm btn-success me-1">
                        <i className="bi bi-info-lg"></i>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Container>
      <>
        <Modal className="text-center" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title bsPrefix="modal-title text-center" >{livro?.titulo}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={livro?.urlCapa} />
          </Modal.Body>
        </Modal>
      </>
      <div>
        <DetalhesLivroModal livro={livro} show={showDetalhesLivro} handleClose={closeDetalhesLivro} />
      </div>
    </div>
  );
}

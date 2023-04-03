import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { deleteLivro, getLivros } from "../../firebase/livros";
import "./Livros.css";
import { ThemeColorContext } from "../../contexts/ThemeColorContext";

export function Livros() {
  const { temaEscuro } = ThemeColorContext();
  const [livros, setLivros] = useState(null);

  useEffect(() => {
    initializeTable();
  }, []);

  function initializeTable() {
    getLivros().then((resultados) => {
      setLivros(resultados);
    });
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

  return (
    <div className={temaEscuro === "dark" ? "bg-secondary text-white" : ""}>
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <h1>Livros</h1>
          <Button
            as={Link}
            to="/livros/adicionar"
            className={
              temaEscuro === "dark" ? "bg-dark text-white" : "bg-success"
            }
            variant="bg-dark"
          >
            Adicionar Livro
          </Button>
        </div>
        <hr />
        {livros === null ? (
          <Loader />
        ) : (
          <Table
            striped
            bordered
            hover
            className={
              temaEscuro === "dark" ? "table table-dark table-striped" : ""
            }
          >
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
                    <td>
                      <img src={livro.urlCapa} alt={livro.titulo} />
                    </td>
                    <td>
                      <Button
                        as={Link}
                        to={`/livros/editar/${livro.id}`}
                        variant="warning"
                        size="sm"
                        className="me-2"
                      >
                        <i className="bi bi-pencil-fill"></i>
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => onDeleteLivro(livro.id, livro.titulo)}
                      >
                        <i className="bi bi-trash3-fill"></i>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Container>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Badge, Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getEmprestimos } from "../../firebase/emprestimos";
import { Loader } from "../../components/Loader/Loader";
import "./Emprestimos.css";
import { ThemeColorContext } from "../../contexts/ThemeColorContext";

export function Emprestimos() {
  const { temaEscuro } = ThemeColorContext();
  const [emprestimos, setEmprestimos] = useState(null);

  useEffect(() => {
    getEmprestimos().then((busca) => {
      setEmprestimos(busca);
    });
  }, []);

  return (
    <div className={temaEscuro === "dark" ? "bg-secondary text-white emprestimosContainer" : ""}>
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <h1>Emprestimos</h1>
          <Button
            as={Link}
            to="/emprestimos/adicionar"
            variant="bg-dark"
            className={
              temaEscuro === "dark" ? "bg-dark text-white" : "bg-success"
            }
          >
            Adicionar emprestimo
          </Button>
        </div>
        <hr />
        {emprestimos === null ? (
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
                <th>Leitor</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Livro</th>
                <th>Status</th>
                <th>Data de Empréstimo</th>
                <th>Data de Devolução</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {emprestimos.map((emprestimo) => {
                const dataEmprestimo = emprestimo.dataEmprestimo
                  .toDate()
                  .toLocaleDateString("pt-br");

                const dataEntrega = emprestimo.dataEntrega
                  .toDate()
                  .toLocaleDateString("pt-br");
                const data1 = emprestimo.dataEntrega.toDate();

                const dataAtual = new Date();

                return (
                  <tr
                    key={emprestimo.id}
                    className={
                      temaEscuro === "dark"
                        ? "themeDark-emprestimos"
                        : "themeLight-emprestimos"
                    }
                  >
                    <td>{emprestimo.leitor}</td>
                    <td>{emprestimo.email}</td>
                    <td>{emprestimo.telefone}</td>
                    <td>{emprestimo.livro.titulo}</td>
                    <td>
                      {!(data1 > dataAtual) ?

                        <Badge bg={"danger"}>Atrasado</Badge>
                        :
                        <Badge bg={emprestimo.status === "Pendente" ? "warning" : "success"}>
                          {emprestimo.status}
                        </Badge>

                      }
                    </td>
                  
                    <td>{dataEmprestimo}</td>
                    <td>{dataEntrega}</td>
                    <td>
                      <Button
                        as={Link}
                        to={`/emprestimos/editar/${emprestimo.id}`}
                        variant="warning"
                        size="sm"
                      >
                        <i className="bi bi-pencil-fill"></i>
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

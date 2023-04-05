import { useEffect, useState } from "react";
import { Badge, Button, Container, Pagination, Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  avancarPagina,
  getEmprestimos,
  paginaInicial,
  voltarPagina,
} from "../../firebase/emprestimos";
import { Loader } from "../../components/Loader/Loader";
import "./Emprestimos.css";
import { ThemeColorContext } from "../../contexts/ThemeColorContext";

export function Emprestimos() {
  const { temaEscuro } = ThemeColorContext();
  const [emprestimos, setEmprestimos] = useState([]);
  const [firstObject, setFirstObject] = useState(null);
  const [lastObject, setLastObject] = useState(null);
  const [totalEmprestimos, setTotalEmprestimos] = useState(0);
  const [count, setCount] = useState(1);

  function avancarPag() {
    avancarPagina(lastObject).then((res) => {
      setEmprestimos(res);
      setFirstObject(res[0]);
      setLastObject(res[2]);
    });
  }

  function voltarPag() {
    voltarPagina(firstObject).then((res) => {
      setEmprestimos(res);
      setFirstObject(res[0]);
      setLastObject(res[2]);
    });
  }

  const tooltipAddEmprestimo = <Tooltip>Clique para fazer um novo emprestimo</Tooltip>;
  const tooltipEditarEmprestimo = <Tooltip>Clique para editar</Tooltip>;


  useEffect(() => {
    getEmprestimos().then((busca) => {
      setEmprestimos(busca);
      setTotalEmprestimos(busca.length);
    });

    paginaInicial().then((res) => {
      setFirstObject(res[0]);
      setLastObject(res[2]);
      setEmprestimos(res);
    });
  }, []);

  return (
    <div
      className={
        temaEscuro === "dark"
          ? "bg-secondary text-white emprestimosContainer"
          : ""
      }
    >
      <Container className="d-flex flex-column justify-content-between emprestimosContainer">

<div>
        <div className="d-flex justify-content-between align-items-center">
          <h1>Emprestimos</h1>
          <OverlayTrigger overlay={tooltipAddEmprestimo}>
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
          </OverlayTrigger>
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
                      {!(data1 > dataAtual) ? (
                        <Badge bg={"danger"}>Atrasado</Badge>
                      ) : (
                        <Badge
                          bg={
                            emprestimo.status === "Pendente"
                              ? "warning"
                              : "success"
                          }
                        >
                          {emprestimo.status}
                        </Badge>
                      )}
                    </td>

                    <td>{dataEmprestimo}</td>
                    <td>{dataEntrega}</td>
                    <td>
                    <OverlayTrigger overlay={tooltipEditarEmprestimo}>
                      <Button
                        as={Link}
                        to={`/emprestimos/editar/${emprestimo.id}`}
                        variant="warning"
                        size="sm"
                      >
                        <i className="bi bi-pencil-fill"></i>
                      </Button>
                      </OverlayTrigger>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
</div>


{/* PAGINAÇÃO */}

        <Pagination className="justify-content-center">
          <Pagination.First
            disabled={count <= 1}
            onClick={() => {
              voltarPag();
              setCount(count - 1);
            }}
          />

          <Pagination.Item>{count}</Pagination.Item>
          {/* <Button
          disabled={count <= 1}
          onClick={() => {
            voltarPag();
            setCount(count - 1);
          }}
        > */}
          {/*   Voltar
        </Button> */}

          <Pagination.Last
            disabled={count >= totalEmprestimos / 3}
            onClick={() => {
              avancarPag();
              setCount(count + 1);
            }}
          />
          {/* <Button
          disabled={count >= totalEmprestimos / 3}
          onClick={() => {
            avancarPag();
            setCount(count + 1);
          }}
        >
          Avançar
        </Button> */}
        </Pagination>
      </Container>
    </div>
  );
}



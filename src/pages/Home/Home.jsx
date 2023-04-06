import { useEffect, useRef, useState } from "react";
import { getLivros } from "../../firebase/livros";
import { getEmprestimos } from "../../firebase/emprestimos";
import { getUsers } from "../../firebase/users";
import { ThemeColorContext } from "../../contexts/ThemeColorContext";
import "./Home.css"
import EmprestimosGrafico from "../../components/ChartJS/EmprestimosGrafico";


export function Home() {
  const [totalLivros, setTotalLivros] = useState(0);
  const [totalEmprestimos, setTotalEmprestimos] = useState(0);
  const [emprestimosPendentes, setEmprestimosPendentes] = useState(0);
  const [emprestimosDevolvidos, setEmprestimosDevolvidos] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const { temaEscuro } = ThemeColorContext();


  useEffect(() => {
    getLivros().then((result) => {
      setTotalLivros(result.length);
    });
    getEmprestimos().then((result) => {
      setTotalEmprestimos(result.length);
      setEmprestimosPendentes(
        result.filter((emprestimo) => emprestimo.status === "Pendente").length
      );
      setEmprestimosDevolvidos(
        result.filter((emprestimo) => emprestimo.status === "Entregue").length
      );
      getUsers().then((result) => {
        setTotalUsers(result.length)
      });
    });

  }, []);

  useEffect(() => {
    if (totalUsers && emprestimosPendentes && emprestimosDevolvidos) {
      renderizaGrafico();
    }
  }, [totalUsers]);

  function renderizaGrafico() {
    return (
      <div>
        <EmprestimosGrafico emprestimos={{ pendentes: emprestimosPendentes, devolvidos: emprestimosDevolvidos, total: totalEmprestimos }} />
      </div>
    )
  }


  return (

    <div className={temaEscuro === 'dark' ? "dark bg-secondary" : ""}>
      <div className="container mt-4">
        <div className="row d-flex flex-wrap">
          <div className="col-md-4 col-sm-12">
          <div className="card h-100 d-flex justify-content-center align-items-center">
              <i className="bi bi-people-fill iconText"></i>
              <span className="fw-bold cardText">{totalUsers} usuários</span>
            </div>
          </div>
          <div className="col-md-4 col-sm-12">
            <div className="card h-100 d-flex justify-content-center align-items-center">
              <i className="bi bi-book iconText"></i>
              <span className="fw-bold cardText">{totalLivros} livros</span>
            </div>
          </div>
          <div className="col-md-4 col-sm-12">
            {renderizaGrafico()}
          </div>
        </div>

      </div>
    </div>
  );
}

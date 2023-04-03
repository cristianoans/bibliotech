import { useEffect, useState } from "react";
import { getLivros } from "../../firebase/livros";
import { getEmprestimos } from "../../firebase/emprestimos";
import { getUsers } from "../../firebase/users";

export function Home() {
  const [totalLivros, setTotalLivros] = useState(0);
  const [totalEmprestimos, setTotalEmprestimos] = useState(0);
  const [emprestimosPendentes, setEmprestimosPendentes] = useState(0);
  const [emprestimosDevolvidos, setEmprestimosDevolvidos] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

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
    });
    getUsers().then((result) => {
      setTotalUsers(result.length)
    });
  }, []);
  

  return (
    <div>
      <div className="container mt-4">
        <div className="row">
        <div className="col-md-4">
            <div className="card" style={{height: '200px'}}>
              <div className="card-header">
                <h5 className="card-title">Usuários</h5>
              </div>
              <div className="card-body d-flex align-items-center justify-content-center">
                <span className="fs-1 d-flex">{totalUsers}</span>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card" style={{height: '200px'}}>
              <div className="card-header">
                <h5 className="card-title">Livros</h5>
              </div>
              <div className="card-body d-flex align-items-center justify-content-center">
                <span className="fs-1 d-flex">{totalLivros}</span>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card" style={{height: '200px'}}>
              <div className="card-header">
                <h5 className="card-title">Empréstimos</h5>
              </div>
              <div className="card-body d-flex flex-column justify-content-center fs-4">
                <span className="d-flex">{`Pendentes: ${emprestimosPendentes}`}</span>
                <span className="d-flex">{`Devolvidos: ${emprestimosDevolvidos}`}</span>
                <span className="d-flex">{`Total: ${totalEmprestimos}`}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

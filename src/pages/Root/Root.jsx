import "./Root.css"
import { useContext, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Menu } from "../../components/Menu/Menu";
import { AuthContext } from "../../contexts/AuthContext";
import { Footer } from "../../components/Footer/Footer";


// Layout principal do App com Navbar Fixa
// As páginas com Navbar fixa: home, livros, empréstimos, etc
export function Root() {
  const usuarioLogado = useContext(AuthContext);
  const [usuario, setUsuario] = useState(false)

  if (usuarioLogado === null) {
    // se está deslogado
    // redireciona para a página de login
    return <Navigate to="/login" />;
  } else if (usuarioLogado.emailVerified === false){
    return <Navigate to="/verificacao" />
  }

  return (
    <div className="wrapper">
      <header>
        <Menu />
      </header>
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <footer className="mt-auto footerStyle">
        <Footer/>
      </footer>
    </div>
  );
}

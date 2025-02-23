import { BrowserRouter, Route, Routes} from "react-router-dom";
import { Cadastro } from "./pages/Cadastro/Cadastro";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Root } from "./pages/Root/Root";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { AuthContext } from "./contexts/AuthContext";
import { AdicionarLivro } from "./pages/AdicionarLivro/AdicionarLivro";
import { Livros } from "./pages/Livros/Livros";
import { EditarLivro } from "./pages/EditarLivro/EditarLivro";
import { AdicionarEmprestimo } from "./pages/AdicionarEmprestimo/AdicionarEmprestimo";
import { Emprestimos } from "./pages/Emprestimos/Emprestimos";
import { EditarEmprestimo } from "./pages/EditarEmprestimo/EditarEmprestimo";
import { Splash } from "./components/Splash/Splash";
import { Ajuda } from "./pages/Ajuda/Ajuda";
import { ThemeColorProvider } from "./contexts/ThemeColorContext";
import { PoliticaPrivacidade } from "./pages/PoliticaPrivacidade/PoliticaPrivacidade";
import { NotFound } from "./components/NotFound/NotFound";
import { Quiz } from "./pages/Quiz/Quiz";
import { EditProfile } from "./pages/EditProfile/EditProfile";
import { VerificarEmail } from "./pages/VerificarEmail/VerificarEmail";


export function App() {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [splash, setSplash] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUsuarioLogado(user);
     
      setTimeout(() => {
        setSplash(false);
      }, 1000);
    });
  }, []);

  return (
    <div>
      {splash ? (
        <Splash />
      ) : (
        <>
          <AuthContext.Provider value={usuarioLogado}>
            <ThemeColorProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Root />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/livros" element={<Livros />} />
                    <Route path="/livros/adicionar" element={<AdicionarLivro />} />
                    <Route path="/livros/editar/:id" element={<EditarLivro />} />
                    <Route path="/emprestimos" element={<Emprestimos />} />
                    <Route path="/emprestimos/adicionar" element={<AdicionarEmprestimo />} />
                    <Route path="/emprestimos/editar/:id" element={<EditarEmprestimo />} />
                    <Route path="/perfil" element={<EditProfile />} />
                    <Route path="/ajuda" element={<Ajuda />} />
                    <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
                  </Route>
                  <Route path="/login" element={<Login />} />
                  <Route path="/cadastro" element={<Cadastro />} />
                  <Route path="*" element={<NotFound />} />
                  <Route path="/quiz" element={<Quiz />} />
                  <Route path="/verificacao" element={<VerificarEmail />} />
                </Routes>
              </BrowserRouter>
            </ThemeColorProvider>
          </AuthContext.Provider>
          <Toaster />
        </>
      )}
    </div>
  );
}

import { useState} from "react";
import { createContext, useContext } from "react";

const ThemeContext = createContext();

export function ThemeColorProvider(props) {
  const temaLocalStorage = localStorage.getItem("temaEscuro");

  // State que irá controlar qual Tema a aplicação está usando
  const [temaEscuro, setTemaEscuro] = useState(
    temaLocalStorage === null ? "light" : temaLocalStorage
  );

  
  // Função responsável por Trocar o Tema
  function alterarTema(temaRecebido) {
    if (temaRecebido !== temaEscuro) {
      setTemaEscuro(temaRecebido);
      localStorage.setItem("temaEscuro", temaRecebido);
    }
  }

  return (
    // Construção dos Elementos para utilizarmos o Contexto em nossa Aplicação, tudo o que for contido no "value" será exportado e poderá ser utilizado em Componentes que utilizarem o Hook Customizado "ThemeColorContext"
    <ThemeContext.Provider value={{ temaEscuro, alterarTema }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

// Hook Personalizado que irá ser utilizado quando quisermos utilizar alguma das Funcionalidades contidas em nosso Contexto
export function ThemeColorContext() {
  const context = useContext(ThemeContext);
  return context;
}

import React, { useState } from "react";
import './Quiz.css';


export function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div id="container">
    <div className="quiz">
      {showScore ? (
        <div className="score-section">
          <span>
            Você fez {score} pontos de {questions.length}! Venha ler mais conosco e assine a BiblioTech!
            <br></br>
          </span>
        </div>
      ) : (
        <>
          <div className="question-section" id="questions">
            <div className="question-count">
              Question {currentQuestion + 1}/{questions.length}
            </div>
            <div className="question-text">
              {questions[currentQuestion].question}
            </div>
          </div>
          <div className="answer-section">
            <ul>
              {questions[currentQuestion].answers.map((answer) => (
                <li key={answer}>
                  <button className="btn btn-light mt-3" onClick={() => handleAnswerClick(answer.isCorrect)}>
                    {answer.text}
                  </button> </li>

              ))} </ul>
          </div>
        </>
      )}
    </div>
    </div>
  );
}

const questions = [
  {
    question: "Quem escreveu Memórias Póstumas de Brás Cubas?",
    answers: [
      { text: "José de Alencar", isCorrect: false },
      { text: "Machado de Assis", isCorrect: true },
      { text: "Aluísio Azevedo", isCorrect: false },
      { text: "Eça de Queiroz", isCorrect: false }
    ]
  },
  {
    question: "Qual obra machadiana marcou o início do Realismo no Brasil?",
    answers: [
      { text: "A mão e a luva", isCorrect: false },
      { text: "Dom Casmurro", isCorrect: false },
      { text: "Quincas Borba", isCorrect: false },
      { text: "Memórias póstumas de Brás Cubas", isCorrect: true }
    ]
  },
  {
    question: "Cecília Meireles poetisa, escreveu, além de obras poéticas excelentes e atuar na literatura infantil escreveu uma obra de cunho histórico belíssimo. Qual foi?"
    , answers: [
      { text: "Romanceiro da Inconfidência", isCorrect: true },
      { text: "Os Sertões", isCorrect: false },
      { text: "Navio negreiro", isCorrect: false },
      { text: "Espectros", isCorrect: false }
    ]
  },
  {
    question: "Não sabem governar sua cozinha /E podem governar mundo inteiro. A qual poeta pertencem esses versos extremamente críticos?",
    answers: [
      { text: "Padre Antônio Vieira", isCorrect: false },
      { text: "Cruz e Souza", isCorrect: false },
      { text: "Carlos Drummond de Andrade", isCorrect: false },
      { text: "Gregório de Matos Guerra", isCorrect: true }
    ]
  },
  {
    question: "A primeira faze do Romantismo Brasileiro, que tem entre seus autores Gonçalves Dias e José de Alencar, tem como tema recorrente e gritante característica, simultaneamente:"
    , answers: [
      { text: "A morte como alívio para alma e a idealização da mulher ", isCorrect: false },
      { text: "Os sonhos e o uso de sinestesia nos textos", isCorrect: false },
      { text: "O nacionalismo ufanista e a idealização do índio", isCorrect: true },
      { text: "A critíca a escravidão e a forma perfeita", isCorrect: false }
    ]
  },
  {
    question: "Dentre as seguintes obras, qual tem fundamento ideológico na teoria Darwinista da Seleção Natural, onde o meio tem influencia direta sobre o indivíduo?"
    , answers: [
      { text: "Dom Casmurro", isCorrect: false },
      { text: "O cortiço", isCorrect: true },
      { text: "Amar: Verbo intransitivo", isCorrect: false },
      { text: "Pauliceia Desvairada", isCorrect: false }
    ]
  },
  {
    question: "A cachorra Baleia é personagem do romance:"
    , answers: [
      { text: "Capitães da Areia", isCorrect: false },
      { text: "O crime do padre Amaro", isCorrect: false },
      { text: "Vidas Secas", isCorrect: true },
      { text: "Os sertões", isCorrect: false }
    ]
  },
  {
    question: "Qual dessas alternativas apresenta o livro e seu escritor corretamente?"
    , answers: [
      { text: "Lucíola- Guimarrães Rosa", isCorrect: false },
      { text: "Canção de Exílio- Gonçalves Dias", isCorrect: true },
      { text: "Grande Sertão: Veredas- Jorge Amado", isCorrect: false },
      { text: "Capitães de Areia- José de Alencar", isCorrect: false }
    ]
  },
  {
    question: "Qual desses é um livro de José de Alencar?"
    , answers: [
      { text: "O Guarani", isCorrect: true },
      { text: "Macunaima", isCorrect: false },
      { text: "Os Sertões", isCorrect: false },
      { text: "A moreninha", isCorrect: false }
    ]
  },
  {
    question: "Qual desses livros de Monteiro Lobato foi lançado primeiro?"
    , answers: [
      { text: "O Pica-pau amarelo", isCorrect: false },
      { text: "Reinações de Narizinho", isCorrect: true },
      { text: "Caçadas de Pedrinho", isCorrect: false },

    ]
  },
];





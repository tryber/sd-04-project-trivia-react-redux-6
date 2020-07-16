import React, { useState, useEffect } from 'react';
import { getQuestions } from '../services/api';

export default function Game() {
  const [questions, setQuestions] = useState([]);
  const [indice, setIndice] = useState(0);
  const [perguntaNaTela, setPerguntaNaTela] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('@trivia-game/token');
    getQuestions(token).then((response) => {
      setQuestions(response.results);
      setPerguntaNaTela(response.results[0]);
    });
  }, []);

  useEffect(() => {
    setPerguntaNaTela(questions[0]);
    setIndice(0);
  }, [questions]);

  useEffect(() => {
    setPerguntaNaTela(questions[indice]);
    console.log(perguntaNaTela);
    console.log(indice);
  }, [indice]);

  const nextQuestion = () => {
    setIndice(indice + 1);
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <div className="col">
          <div className="card">
            <nav className="navbar navbar-light bg-light">
              <div className="row justify-content-between align-items-center w-100">
                <div className="col">
                  <a className="navbar-brand" href="#">
                    Lucas
                  </a>
                </div>
                <div className="col-2">Pontos: 10</div>
              </div>
            </nav>
            <div className="container">
              <div className="row mt-5">
                <div className="col-5">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">
                        {perguntaNaTela ? perguntaNaTela.category : ''}
                      </h5>
                      <p className="card-text">{perguntaNaTela ? perguntaNaTela.question : ''}</p>
                    </div>
                  </div>
                </div>
                <div className="col">
                  {perguntaNaTela ? perguntaNaTela.incorrect_answers.concat(perguntaNaTela.correct_answer).map((resposta)=>(
                    <button key={resposta} className="btn btn-success btn-block">{resposta}</button>
                  )) : '' }
                </div>
                <button className="btn btn-primary btn-block mt-5" onClick={nextQuestion}>
                  Próxima
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

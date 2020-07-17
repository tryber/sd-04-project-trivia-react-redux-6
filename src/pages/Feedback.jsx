import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function Feedback() {
  const state = localStorage.getItem('state');
  const user = JSON.parse(state).player;
  console.log(user);

  const messageFeedback = (questions) => {
    if (questions >= 3) return <h1 data-testid="feedback-test">Mandou Bem!</h1>;
      return <h1 data-testid="feedback-test">Podia ser melhor...</h1>;
  };

  return (
    <div data-testid="feedback-text" className="container">
      <div className="row justify-content-center align-items-center">
        <div className="col">
          <div className="card">
            <Header player={user} />
            <div className="container">
              <div className="col my-5 align-items-center">
                {messageFeedback(user.assertions)}
                <h3 data-testid="feedback-total-question">
                  Você acertou {user.assertions} questões
                </h3>
                <h3 data-testid="feedback-total-score">
                  Um total de {user.score} pontos
                </h3>
              </div>
              <Link
                to="/ranking"
                data-testid="btn-ranking"
                className="btn btn-primary btn-block mt-5 mx-3"
              >
                Ver Ranking
              </Link>
              <Link
                to="/"
                data-testid="btn-play-again"
                className="btn btn-primary btn-block mt-5 mx-3"
              >
                Jogar Novamente
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

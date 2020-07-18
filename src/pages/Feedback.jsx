import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import getImageUrl from '../services/gravatar';

export default function Feedback() {
  const state = localStorage.getItem('state');
  const user = JSON.parse(state).player;

  useEffect(() => {
    const storagedRanking = localStorage.getItem('ranking');
    const { name, score, gravatarEmail } = user; 
    if (storagedRanking) {
      localStorage.setItem(
        'ranking',
        JSON.stringify([
          ...JSON.parse(storagedRanking),
          { name, score, picture: getImageUrl(gravatarEmail) },
        ]),
      );
    } else {
      localStorage.setItem(
        'ranking',
        JSON.stringify([
          { name: name, score: score, picture: getImageUrl(gravatarEmail) },
        ]),
      );
    }
  }, [user]);

  const messageFeedback = (questions) => {
    if (questions >= 3) return <h1 data-testid="feedback-text">Mandou bem!</h1>;
    return <h1 data-testid="feedback-text">Podia ser melhor...</h1>;
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <div className="col">
          <div className="card">
            <Header player={user} />
            <div className="container">
              <div className="row my-5">
                <div className="col align-items-center text-center">
                  {messageFeedback(user.assertions)}
                  <h3 className="text-center">
                    Você acertou <span data-testid="feedback-total-question">{user.assertions}</span> questões
                  </h3>
                  <h3 className="text-center">
                    Um total de <span data-testid="feedback-total-score">{user.score}</span> pontos
                  </h3>
                </div>
              </div>
              <div className="row justify-content-center my-5">
                <div className="col-4 d-flex flex-column justify-content-center">
                  <Link
                    to="/ranking"
                    data-testid="btn-ranking"
                    className="btn btn-primary"
                  >
                    Ver Ranking
                  </Link>
                  <Link to="/" data-testid="btn-play-again" className="btn btn-primary mt-2">
                    Jogar Novamente
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

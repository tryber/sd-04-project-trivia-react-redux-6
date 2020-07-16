import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Ranking() {
  const [ranking] = useState(() => {
    const rankingLocalStorage = localStorage.getItem('@trivia-game/ranking');
    if (rankingLocalStorage) return JSON.parse(rankingLocalStorage);
    return [];
  });

  const handleBackButton = () => {
    //reseta o score e assertions do player
  };
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <div className="col">
          <div className="card">
            <h1 className="card-title text-center">Ranking</h1>
            <div className="card-body">
              <ul className="list-group">
                {ranking.length ? (
                  ranking
                    .sort((a, b) => a.score - b.score)
                    .map((player, index) => (
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center ">
                          <img
                            className="mr-2 rounded-circle"
                            height="50px"
                            src={player.picture}
                            alt=""
                          />
                          <p data-testid={`player-name-${index}`}>{player.name}</p>
                        </div>
                        <div className="d-flex align-items-center">
                          <small>Pontos: </small>
                          <span
                            data-testid={`player-score-${index}`}
                            className="badge badge-success badge-pill ml-2"
                          >
                            {player.score}
                          </span>
                        </div>
                      </li>
                    ))
                ) : (
                  <h5 className="text-center">Infelizmente o ranking está vazio :(</h5>
                )}
              </ul>
              <div className="d-flex justify-content-center mt-2">
                <Link
                  to="/"
                  onClick={handleBackButton}
                  data-testid="btn-go-home"
                  className="btn btn-danger"
                >
                  Voltar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

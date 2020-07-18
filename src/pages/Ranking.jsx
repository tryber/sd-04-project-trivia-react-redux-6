import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RankingTable(props) {
  const { ranking } = props;

  if (!ranking.length) return <h5 className="text-center">Infelizmente o ranking está vazio :(</h5>;

  return (
    <ul className="list-group">
      {ranking
        .sort((a, b) => b.score - a.score)
        .map((player, index) => (
          <li
            key={player.name + player.score + Math.floor(Math.random() * 100)}
            className="list-group-item"
          >
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center ">
                <img className="mr-2 rounded-circle" height="50px" src={player.picture} alt="" />
                <p className="mb-0" data-testid={`player-name-${index}`}>{player.name}</p>
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
            </div>
          </li>
        ))}
    </ul>
  );
}

RankingTable.propTypes = {
  ranking: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default function Ranking() {
  const [ranking] = useState(() => {
    const rankingLocalStorage = localStorage.getItem('ranking');
    if (rankingLocalStorage) return JSON.parse(rankingLocalStorage);
    return [];
  });

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <div className="col">
          <div className="card">
            <h1 className="card-title text-center mt-5 mb-4" data-testid="ranking-title">Ranking</h1>
            <div className="card-body">
              <RankingTable ranking={ranking} />
              <div className="d-flex justify-content-center mt-5 mb-4">
                <Link
                  to="/"
                  onClick={() => console.log('reseta o score e assertions do player')}
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


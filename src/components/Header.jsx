import React from 'react';
import PropTypes from 'prop-types';

import getImageUrl from '../services/gravatar';

export default function Header({ player }) {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="row justify-content-between align-items-center w-100">
        <div className="col">
          <div className="navbar-brand">
            <div className="d-flex align-items-center">
              <img
                data-testid="header-profile-picture"
                className="rounded-circle mr-2"
                src={getImageUrl(player.gravatarEmail)}
                alt=""
              />
              <strong className="mb-0" data-testid="header-player-name">{player.name}</strong>
            </div>
          </div>
        </div>
        <div className="col-2">Pontos: <span data-testid="header-score">{player.score}</span></div>
      </div>
    </nav>
  );
}

Header.propTypes = {
  player: PropTypes.shape({
    gravatarEmail: PropTypes.string,
    name: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,
};

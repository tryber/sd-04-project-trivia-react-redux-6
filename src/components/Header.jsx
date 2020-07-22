import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import getImageUrl from '../services/gravatar';

function Header({ name, score, gravatarEmail }) {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="row justify-content-between align-items-center w-100">
        <div className="col">
          <div className="navbar-brand">
            <div className="d-flex align-items-center">
              <img
                data-testid="header-profile-picture"
                className="rounded-circle mr-2"
                src={getImageUrl(gravatarEmail)}
                alt=""
              />
              <strong className="mb-0" data-testid="header-player-name">{name}</strong>
            </div>
          </div>
        </div>
        <div className="col-2">Pontos: <span data-testid="header-score">{score}</span></div>
      </div>
    </nav>
  );
}

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.playerReducer.name,
  gravatarEmail: state.playerReducer.gravatarEmail,
  score: state.playerReducer.score,
});

export default connect(mapStateToProps)(Header);

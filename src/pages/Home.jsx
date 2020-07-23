/* eslint class-methods-use-this: ["off"] */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchQuestions, setPlayer } from '../actions';

import { getToken } from '../services/api';

function EmailInput({ email, handleChange }) {
  return (
    <label htmlFor="mail" className="w-100">
      E-mail do Gravatar:
      <input
        name="email"
        className="form-control"
        onChange={(e) => handleChange(e.target.name, e.target.value)}
        value={email}
        type="mail"
        data-testid="input-gravatar-email"
        placeholder="Digite o seu e-mail"
      />
    </label>
  );
}

function NameInput({ name, handleChange }) {
  return (
    <label htmlFor="name" className="w-100">
      Nome do Jogador:
      <input
        name="name"
        className="form-control"
        onChange={(e) => handleChange(e.target.name, e.target.value)}
        value={name}
        type="text"
        data-testid="input-player-name"
        placeholder="Digite o seu nome"
      />
    </label>
  );
}

class Home extends React.Component {
  constructor() {
    const storagedState = localStorage.getItem('state');
    super();
    this.state = storagedState
      ? {
        name: JSON.parse(storagedState).player.name,
        email: JSON.parse(storagedState).player.gravatarEmail,
      }
      : {
        name: '',
        email: '',
      };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    getToken().then((value) => {
      localStorage.setItem('token', value);
    });
  }

  handleChange(key, value) {
    const inp = document.querySelector('input');
    if (inp.value.length >= 3) {
      this.setState((state) => ({
        ...state,
        [key]: value,
      }));
    } else {
      this.setState((state) => ({
        ...state,
        [key]: value,
      }));
    }
  }

  handleClick(email, name) {
    const { getQuestions, set, settings } = this.props;
    set({ name, gravatarEmail: email, assertions: 0, score: 0 });
    const token = localStorage.getItem('token');
    getQuestions(token, settings);
    const state = { player: { name, gravatarEmail: email } };
    localStorage.setItem('state', JSON.stringify(state));
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col">
            <div className="card">
              <div className="container">
                <div className="row mb-5 align-items-center justify-content-center">
                  <div className="col-4">
                    <h1 className="text-center my-5">
                      Bem-vindo ao <strong>Trivia Game</strong>
                    </h1>
                    <form>
                      <div className="row justify-content-center">
                        <div className="form-group w-100">
                          <EmailInput email={this.state.email} handleChange={this.handleChange} />
                        </div>
                        <div className="form-group w-100">
                          <NameInput name={this.state.name} handleChange={this.handleChange} />
                        </div>
                      </div>
                      <div className="row justify-content-between">
                        <Link to="/settings">
                          <button data-testid="btn-settings" className="btn btn-secondary">
                            Configurações
                          </button>
                        </Link>
                        <Link to="/play">
                          <button
                            className="btn btn-primary px-4"
                            disabled={!(!!this.state.name && !!this.state.email)}
                            data-testid="btn-play"
                            onClick={() =>
                              this.handleClick(this.state.email, this.state.name)
                            }
                          >
                            Jogar!
                          </button>
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.playerReducer.name,
  settings: state.settingsReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token, settings) => dispatch(fetchQuestions(token, settings)),
  set: (player) => dispatch(setPlayer(player)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

Home.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  set: PropTypes.func.isRequired,
};

NameInput.propTypes = {
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

EmailInput.propTypes = {
  email: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

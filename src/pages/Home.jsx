/* eslint class-methods-use-this: ["off"] */
import React from 'react';
import { Link } from 'react-router-dom';
import { getToken } from '../services/api';

function EmailInput({ email, handleChange }) {
  return (
    <label htmlFor="mail">
      E-mail do Gravatar:
      <input
        name="email"
        onChange={(e) => handleChange(e.target.name, e.target.value)}
        value={email}
        type="mail"
        data-testid="input-gravatar-email"
        placeholder="E-mail"
      />
    </label>
  );
}

function NameInput({ name, handleChange }) {
  return (
    <label htmlFor="name">
      Nome do Jogador:
      <input
        name="name"
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
    super();
    this.state = {
      name: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.addPlayerToLocalStorage = this.addPlayerToLocalStorage.bind(this);
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

  addPlayerToLocalStorage(email, name) {
    const state = { player: { name, assertions: 0, score: 0, gravatarEmail: email } };
    localStorage.setItem('state', JSON.stringify(state));
  }

  render() {
    return (
      <form>
        <EmailInput email={this.state.email} handleChange={this.handleChange} />
        <NameInput name={this.state.name} handleChange={this.handleChange} />
        <Link to="/play">
          <button
            disabled={!(!!this.state.name && !!this.state.email)}
            data-testid="btn-play"
            onClick={() => this.addPlayerToLocalStorage(this.state.email, this.state.name)}
          >
            Jogar!
          </button>
        </Link>
        <Link to="/settings">
          <button data-testid="btn-settings">Configurações</button>
        </Link>
      </form>
    );
  }
}

export default Home;

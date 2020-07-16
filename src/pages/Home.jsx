import React from 'react';
import { Link } from 'react-router-dom';
import { getToken } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      disabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.token = this.token.bind(this);
  }

  token() {
    getToken().then((value) => {
      localStorage.setItem('@trivia-game/token', value);
    });
  }

  handleChange() {
    const inp = document.querySelector('input');
    if (inp.value.length >= 3) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  render() {
    return (
      <form>
        <label htmlFor="mail" >
          E-mail do Gravatar:
          <input
            id="mail" type="mail" data-testid="input-gravatar-email" placeholder="E-mail"
          />
        </label>
        <label htmlFor="name">
          Nome do Jogador:
          <input
            id="name"
            data-testid="input-player-name"
            placeholder="Digite o seu nome"
            onChange={this.handleChange}
          />
        </label>
        <Link to="/play">
          <button data-testid="btn-play" disabled={this.state.disabled} onClick={this.token}>
            Jogar!
          </button>
        </Link>
        <Link to="/settings">
          <button data-testid="btn-settings">
            Configurações
          </button>
        </Link>
      </form>
    );
  }
}

export default Home;

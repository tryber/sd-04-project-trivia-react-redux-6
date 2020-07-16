import React from 'react';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      disabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.settings = this.settings.bind(this);
    this.play = this.play.bind(this);
  }

  settings() {
    this.alert('tela de config');
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

  play() {
    this.alert('tela de jogo');
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
        <button data-testid="btn-play" disabled={this.state.disabled} onClick={this.play}>
          Jogar!
        </button>
        <button data-testeid="btn-settings" onClick={this.settings}>
          Configurações
        </button>
      </form>
    );
  }
}

export default Home;

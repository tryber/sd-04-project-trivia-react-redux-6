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
    alert('tela de config');
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
    alert('tela de jogo');
  }

  render() {
    return (
      <div>
        <label>
          E-mail do Gravatar:
          <input
          type="mail" data-testid="input-gravatar-email" placeholder="Digite o seu e-mail" />
        </label>
        <label>
          Nome do Jogador:
          <input
            data-testid="input-player-name"
            placeholder="Digite o seu nome"
            onChange={this.handleChange} />
        </label>
        <button data-testid="btn-play" disabled={this.state.disabled} onClick={this.play}>
          Jogar!
        </button>
        <button data-testeid="btn-settings" onClick={this.settings}>
          <img
            src="https://image.freepik.com/vetores-gratis/ilustracao-de-engrenagem-doodle-icone_53876-5596.jpg"
            alt="gear picture"
            width="20"
            height="20"
          />
        </button>
      </div>
    );
  }
}

export default Home;

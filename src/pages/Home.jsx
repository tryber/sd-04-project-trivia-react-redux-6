import React from "react";

class Home extends React.Component {
  state = {
    disabled: true,
  };

  handleChange = () => {
    const inp = document.querySelector("input");
    if (inp.value.length >= 3) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  };

  settings = () => {
    alert("tela de config");
  };

  play = () => {
    alert("tela de jogo")
  }

  render() {
    return (
      <form>
        <label>
          E-mail do Gravatar:
          <input
            id="inp"
            type="mail"
            data-testid="input-gravatar-email"
            placeholder="Digite o seu e-mail"
          ></input>
        </label>
        <label>
          Nome do Jogador:
          <input
            id="inp2"
            type="text"
            data-testid="input-player-name"
            placeholder="Digite o seu nome"
            onChange={this.handleChange}
          ></input>
        </label>
        <button data-testid="btn-play" disabled={this.state.disabled} onClick={this.play}>
          Jogar!
        </button>
        <button data-testeid="btn-settings">
          <img
            src="https://image.freepik.com/vetores-gratis/ilustracao-de-engrenagem-doodle-icone_53876-5596.jpg"
            width="20"
            height="20"
            onClick={this.settings}
          />
        </button>
      </form>
    );
  }
}

export default Home;

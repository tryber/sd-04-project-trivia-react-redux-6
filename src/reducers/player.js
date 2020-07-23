const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  assertions: 0,
  score: 0,
};

function playerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_PLAYER':
      return {
        ...state,
        name: action.player.name,
        gravatarEmail: action.player.gravatarEmail,
        assertions: action.player.assertions,
        score: action.player.score,
      };
    default:
      return state;
  }
}

export default playerReducer;

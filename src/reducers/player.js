const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  assertions: 0,
  score: 0,
};

function playerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_ELEMENT':
      return [...state, action.value];
    default:
      return state;
  }
}

export default playerReducer;

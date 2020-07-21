const INITIAL_STATE = {
  categories: 'none',
  difficulty: 'none',
  type: 'none',
};

function settingsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_ELEMENT':
      return [...state, action.value];
    default:
      return state;
  }
}

export default settingsReducer;

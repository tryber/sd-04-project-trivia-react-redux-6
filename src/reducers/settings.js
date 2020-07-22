const INITIAL_STATE = {
  categories: 'none',
  difficulty: 'none',
  type: 'none',
};

function settingsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SELECT_CATEGORY':
      return { ...state, categories: action.category };
    case 'SELECT_DIFFICULTY':
      return { ...state, difficulty: action.difficulty };
    case 'SELECT_TYPE':
      return { ...state, type: action.value };
    default:
      return state;
  }
}

export default settingsReducer;

const INITIAL_STATE_QUESTIONS = {
  isFetching: false,
  questions: [],
};

function questionReducer(state = INITIAL_STATE_QUESTIONS, action) {
  switch (action.type) {
    case 'REQUEST_QUESTIONS':
      return { ...state, isFetching: true };
    case 'RECEIVE_QUESTIONS':
      return { ...state, isFetching: false, questions: action.questions };
    default:
      return state;
  }
}

export default questionReducer;

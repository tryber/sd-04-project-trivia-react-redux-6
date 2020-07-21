import fetchQuestions from './questions';

const SET_PLAYER = 'SET_PLAYER';

function setPlayer(player) {
  return {
  type: SET_PLAYER,
  player,
  };
};
/* eslint-disable */
export { fetchQuestions, setPlayer };
/* eslint-enable */

import { getQuestions } from '../services/api';

export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';

const requestQuestions = () => {
  return { type: REQUEST_QUESTIONS };
};

const receiveQuestions = (questions) => {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
};

export default function fetchQuestions(token, settings = null) {
  return async (dispatch) => {
    dispatch(requestQuestions());
    const questions = await getQuestions(token, settings);
    console.log(questions)
    return dispatch(receiveQuestions(questions));
  };
}

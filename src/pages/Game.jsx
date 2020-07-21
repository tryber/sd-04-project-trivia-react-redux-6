import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { decode } from 'he';
import PropTypes from 'prop-types';

// import { getQuestions, resetToken } from '../services/api';
import Header from '../components/Header';

import '../css/answerButtons.css';
import { setPlayer } from '../actions';

const Answers = ({ answers, handleAnswer, isActive, correctAnswer }) => (
  <div className="col">
    {answers &&
      answers.map((resposta, index) => (
        <button
          disabled={!isActive}
          key={resposta}
          onClick={handleAnswer}
          className={
            correctAnswer === resposta
              ? 'btn btn-primary btn-block correct'
              : 'btn btn-primary btn-block incorrect'
          }
          data-testid={correctAnswer === resposta ? 'correct-answer' : `wrong-answer-${index}`}
        >
          {decode(resposta)}
        </button>
      ))}
  </div>
);

const Question = ({ question, timer, isActive }) => (
  <div className="col-5">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title" data-testid="question-category">
          {question && decode(question.category)}
        </h5>
        <p className="card-text" data-testid="question-text">
          {question && decode(question.question)}
        </p>
      </div>
    </div>
    {isActive && (
      <div className="d-flex justify-content-center mt-2">
        <p>
          Tempo: <strong>{timer}s</strong>
        </p>
      </div>
    )}
  </div>
);

function Game({ name, gravatarEmail, assertions, score, questions, setPlayer }) {

  const [questionOnScreen, setQuestionOnScreen] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [index, setIndex] = useState(() => {
    const storagedIndex = localStorage.getItem('index');
    if (storagedIndex) return Number(storagedIndex);
    return 0;
  });

  const [isFinished, setIsFinished] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [timer, setTimer] = useState(30);

  const shuffle = (arr) => {
    const array = Array.from(arr);
    let currentIndex = array.length;
    let temporaryValue = 0;
    let randomIndex = 0;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  useEffect(() => {
    if (questionOnScreen) {
      setAnswers(
        shuffle(questionOnScreen.incorrect_answers.concat(questionOnScreen.correct_answer)),
      );
      setTimer(30);
      setIsActive(true);
    }
  }, [questionOnScreen]);

  useEffect(() => {
    let t;
    if (timer) {
      t = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    } else {
      setIsActive(false);
    }
    return () => clearTimeout(t);
  }, [timer]);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   const settings = localStorage.getItem('settings');
  //   getQuestions(token, JSON.parse(settings)).then((response) => {
  //     if (response.response_code === 4) resetToken(token);
  //     setQuestions(response.results);
  //     setQuestionOnScreen(response.results[0]);
  //   });
  // }, []);

  useEffect(() => {
    if (index < 5) {
      if (questions.length) setQuestionOnScreen(questions[index]);
      localStorage.setItem('index', index);
    } else {
      localStorage.setItem('index', 0);
      setIsFinished(true);
    }
  }, [index, questions]);

  const handleAnswer = (e) => {
    if (e.target.innerHTML === questionOnScreen.correct_answer) {
      if (questionOnScreen.difficulty === 'hard') {
        setPlayer({
          name, gravatarEmail,
          assertions: assertions + 1,
          score: score + 10 + (timer * 3),
        });
      }
      if (questionOnScreen.difficulty === 'medium') {
        setPlayer({
          name, gravatarEmail,
          assertions: assertions + 1,
          score: score + 10 + (timer * 2),
        });
      }
      if (questionOnScreen.difficulty === 'easy') {
        setPlayer({
          name, gravatarEmail,
          assertions: assertions + 1,
          score: score + 10 + timer,
        });
      }
    }
    setIsActive(false);
  };

  const nextQuestion = () => {
    setIndex(index + 1);
  };
  return (
    <div className="container">
      {isFinished && <Redirect to="/results" />}
      <div className="row justify-content-center align-items-center">
        <div className="col">
          <div className="card">
            <Header player={{ name, gravatarEmail, score, assertions }} />
            <div className="container">
              <div className="row my-5 align-items-center">
                <Question question={questionOnScreen} timer={timer} isActive={isActive} />
                <Answers
                  handleAnswer={handleAnswer}
                  answers={answers}
                  isActive={isActive}
                  correctAnswer={questionOnScreen ? questionOnScreen.correct_answer : ''}
                />
                {!isActive && (
                  <button
                    data-testid="btn-next"
                    className="btn btn-primary btn-block mt-5 mx-3"
                    onClick={nextQuestion}
                  >
                    Próxima
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Game.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string,
      category: PropTypes.string,
    }),
  ).isRequired,
};

Answers.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleAnswer: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  correctAnswer: PropTypes.string.isRequired,
};

Question.propTypes = {
  question: PropTypes.shape({
    question: PropTypes.string,
    category: PropTypes.string,
  }),
  timer: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
};

Question.defaultProps = {
  question: { question: '', category: '' },
};

const mapStateToProps = (state) => ({
  name: state.playerReducer.name,
  gravatarEmail: state.playerReducer.gravatarEmail,
  assertions: state.playerReducer.assertions,
  score: state.playerReducer.score,
  questions:
  state.questionReducer.questions.response_code === 0
    ? state.questionReducer.questions.results
    : [],
})

const mapDispatchToProps = (dispatch) => ({
  setPlayer: (player) => dispatch(setPlayer(player)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Game);

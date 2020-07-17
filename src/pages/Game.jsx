import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { decode } from 'he';
import { getQuestions } from '../services/api';
import Header from '../components/Header';

import '../css/answerButtons.css';

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

export default function Game() {
  const [questions, setQuestions] = useState([]);

  const [player, setPlayer] = useState(() => {
    const state = localStorage.getItem('state');
    if (state) return JSON.parse(state).player;
    return {};
  });
  const [questionOnScreen, setQuestionOnScreen] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [index, setIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    const state = { player };
    localStorage.setItem('state', JSON.stringify(state));
  }, [player]);

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
    if (timer) {
      const t = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearTimeout(t);
    } else {
      setIsActive(false);
    }
  }, [timer]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    getQuestions(token).then((response) => {
      setQuestions(response.results);
      setQuestionOnScreen(response.results[0]);
    });
  }, []);

  useEffect(() => {
    if (index < 5) {
      if (questions.length) setQuestionOnScreen(questions[index]);
    } else {
      setIsFinished(true);
    }
  }, [index, questions]);

  const handleAnswer = (e) => {
    if (e.target.innerHTML === questionOnScreen.correct_answer) {
      if (questionOnScreen.difficulty === 'hard') {
        setPlayer({ ...player, score: player.score + 10 + timer * 3 });
      }
      if (questionOnScreen.difficulty === 'medium') {
        setPlayer({ ...player, score: player.score + 10 + timer * 2 });
      }
      if (questionOnScreen.difficulty === 'easy') {
        setPlayer({ ...player, score: player.score + 10 + timer });
      }
    }
    setIsActive(false);
  };

  const nextQuestion = () => {
    setIndex(index + 1);
  };

  const shuffle = (array) => {
    var currentIndex = array.length;

    let temporaryValue = 0;
    let randomIndex = 0;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  return (
    <div className="container">
      {isFinished && <Redirect to="/results" />}
      <div className="row justify-content-center align-items-center">
        <div className="col">
          <div className="card">
            <Header player={player} />
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

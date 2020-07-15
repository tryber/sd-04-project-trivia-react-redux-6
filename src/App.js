import React from 'react';
import logo from './trivia.png';
import './App.css';
import {getToken, getQuestions} from './services/api';
import getImageUrl from './services/gravatar';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          SUA VEZ TESTANDOOOOOOOOOOOO
        </p>
      </header>
    </div>
  );
}

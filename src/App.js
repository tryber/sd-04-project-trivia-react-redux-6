import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import logo from './trivia.png';
import './App.css';
import Home from './pages/Home';
import Game from './pages/Game';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import Settings from './pages/Settings';
import { Provider } from 'react-redux';
import store from './store';
// import {  getToken, getQuestions } from './services/api';
// import getImageUrl from './services/gravatar';

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/play" component={Game} />
          <Route exact path="/results" component={Feedback} />
          <Route exact path="/ranking" component={Ranking} />
          <Route exact path="/settings" component={Settings} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

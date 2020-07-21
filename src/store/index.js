import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { settingsReducer, playerReducer, questionReducer } from '../reducers';

const rootReducer = combineReducers({ settingsReducer, playerReducer, questionReducer });

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

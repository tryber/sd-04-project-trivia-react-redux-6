import { createStore, combineReducers } from 'redux';
import { playerReducer } from '../reducers';

const rootReducer = combineReducers({ playerReducer });

const store = createStore(rootReducer);

export default store;

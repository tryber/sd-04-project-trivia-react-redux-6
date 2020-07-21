import { createStore, combineReducers } from 'redux';
import { settingsReducer } from '../reducers';

const rootReducer = combineReducers({ settingsReducer });

const store = createStore(rootReducer);

export default store;

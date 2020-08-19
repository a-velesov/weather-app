
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { appReducer } from './reducers/appReducer';
import { weatherReducer } from './reducers/weatherReducer';

const rootReducer = combineReducers({
  app: appReducer,
  weather: weatherReducer,
});


const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
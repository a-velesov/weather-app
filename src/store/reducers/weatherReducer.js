import * as actionTypes from '../actionTypes';

const initialState = {
  weatherData: {},
  currentWeather: null,
  extendedWeatherData: [],
  isError: false,
};

export const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_WEATHER_START:
      return state;
    case actionTypes.FETCH_LIST_WEATHER_SUCCESS:
      return {
        ...state,
        weatherData: {...state.weatherData, [action.id]: action.payload.weather },
      };
    case actionTypes.FETCH_CURRENT_WEATHER_SUCCESS:
      return {
        ...state,
        currentWeather: action.payload.weather,
      };
    case actionTypes.FETCH_WEATHER_ERROR:
      return {
        ...state,
        isError: true,
      };
    default:
      return state;
  }
};
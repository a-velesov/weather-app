import * as actionTypes from '../actionTypes';

const initialState = {
  weatherData: {
    main: {
      feels_like: 0,
      humidity: 0,
      pressure: 0,
      temp: 0,
      temp_max: 0,
      temp_min: 0,
    },
    name: '',
    sys: {
      country: '',
      sunrise: 0,
      sunset: 0,
    },
    weather: {
      id: 200,
      main: '',
      description: '',
      icon: '',
    },
    wind: {
      deg: 0,
      speed: 0,
    },
  },
  extendedWeatherData: [],
  isError: false,
};

export const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_WEATHER_START:
      return state;
    case actionTypes.FETCH_WEATHER_SUCCESS:
      return {
        ...state,
        weatherData: {...state.weatherData, [action.id]: action.payload.weather },
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
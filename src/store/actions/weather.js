import { fetchWeatherData } from '../../api/weather';
import * as actionTypes from '../actionTypes';
import { setIsInitialState, setIsLoading } from './app';
import { kelvinToCelcius } from '../../utils/unitConversion';

export const fetchWeatherStart = () => ({
  type: actionTypes.FETCH_WEATHER_START,
});

export const fetchWeatherSuccess = (weather) => ({
  type: actionTypes.FETCH_WEATHER_SUCCESS,
  payload: { weather },
});

export const fetchWeatherFail = (error) => ({
  type: actionTypes.FETCH_WEATHER_ERROR,
  payload: error,
});

export const fetchWeatherFromApi = (city, lat, lng) => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    dispatch(fetchWeatherStart());

    Promise.all([fetchWeatherData(city)])
      .then((res) => {
        return Promise.all([res[0].json()]);
      })
      .then((res) => {
        const { weather } = transformWeatherData(res);
        dispatch(fetchWeatherSuccess(weather));
        dispatch(setIsInitialState(false));
        dispatch(setIsLoading(false));
      })
      .catch((err) => {
        dispatch(fetchWeatherFail(err));
        dispatch(setIsLoading(false));
      });
  };
};

const transformWeatherData = (res) => {
  const weather = res[0];

  weather.weather = res[0].weather[0];
  weather.main = {
    ...weather.main,
    temp: kelvinToCelcius(weather.main.temp),
    feels_like: kelvinToCelcius(weather.main.feels_like),
    temp_max: kelvinToCelcius(weather.main.temp_max),
    temp_min: kelvinToCelcius(weather.main.temp_min),
  };
  weather.wind.speed = Math.round(weather.wind.speed * 3.6);

  return {
    weather,
  };
};
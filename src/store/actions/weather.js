import { fetchWeatherData } from '../../api/weather';
import * as actionTypes from '../actionTypes';
import { setIsInitialState, setIsLoading } from './app';
import { hPaToMMHg, kelvinToCelcius, localeTime } from '../../utils/unitConversion';

export const fetchWeatherStart = () => ({
  type: actionTypes.FETCH_WEATHER_START,
});

export const fetchCurrentWeatherSuccess = (weather) => ({
  type: actionTypes.FETCH_CURRENT_WEATHER_SUCCESS,
  payload: { weather }
});

export const fetchWeatherSuccess = (weather, id) => ({
  type: actionTypes.FETCH_LIST_WEATHER_SUCCESS,
  payload: { weather }, id
});

export const fetchWeatherFail = (error) => ({
  type: actionTypes.FETCH_WEATHER_ERROR,
  payload: error,
});

const transformWeatherData = (res) => {
  const weather = res[0];

  weather.weather = res[0].weather[0];
  weather.main = {
    ...weather.main,
    temp: kelvinToCelcius(weather.main.temp),
    feels_like: kelvinToCelcius(weather.main.feels_like),
    temp_max: kelvinToCelcius(weather.main.temp_max),
    temp_min: kelvinToCelcius(weather.main.temp_min),
    pressure: hPaToMMHg(weather.main.pressure),
  };
  weather.sys = {
    ...weather.sys,
    sunrise: localeTime(weather.sys.sunrise),
    sunset: localeTime(weather.sys.sunset),
  };
  weather.wind.speed = Math.round(weather.wind.speed * 3.6);

  return {
    weather,
  };
};

export const fetchCurrentWeatherFromApi = (city) => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    dispatch(fetchWeatherStart());

    Promise.all([fetchWeatherData(city)])
      .then((res) => {
        return Promise.all([res[0].json()]);
      })
      .then((res) => {
        console.log(res, 'res');
        const { weather } = transformWeatherData(res);
        dispatch(fetchCurrentWeatherSuccess(weather));
        dispatch(setIsInitialState(false));
        dispatch(setIsLoading(false));
      })
  }
}

export const fetchWeatherFromApi = (city, id, lat, lng) => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    dispatch(fetchWeatherStart());

    Promise.all([fetchWeatherData(city)])
      .then((res) => {
        return Promise.all([res[0].json()]);
      })
      .then((res) => {
        const { weather } = transformWeatherData(res);
        dispatch(fetchWeatherSuccess(weather, id));
        dispatch(setIsInitialState(false));
        dispatch(setIsLoading(false));
      })
      .catch((err) => {
        dispatch(fetchWeatherFail(err));
        dispatch(setIsLoading(false));
      });
  };
};
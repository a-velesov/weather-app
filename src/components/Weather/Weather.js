import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import WeatherIcon from './WeatherIcon';
import classes from './Weather.module.css'
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

const Weather = () => {

  const { currentWeather, isInitial, isError } = useSelector((store) => ({
    currentWeather: store.weather.currentWeather,
    isInitial: store.app.isInitial,
    isError: store.weather.isError,
  }));

  useEffect(() => {
    if (isError) {
      console.log('Cannot load weather for this place');
    }
    console.log(currentWeather, 'currentWeather');
  }, [isError]);

  return (
    <div className={classes.WeatherContainer }>
      <div className={classes.CurrentWeatherContainer}>
          <h4 className={classes.CurrentWeatherTitle}>{currentWeather?.name}</h4>

          <div className={classes.CurrentWeatherInfo}>
            <div>
              <WeatherIcon code={currentWeather?.weather?.id} big />
            </div>
            <table>
              <tbody>
              <tr>
                <td>
                </td>
              </tr>
              <tr>
                <td>Температура</td>
                <td>{currentWeather?.main?.temp}<sup>&deg;</sup></td>
              </tr>
              <tr>
                <td>Чувствуется как</td>
                <td>{currentWeather?.main?.feels_like}<sup>&deg;</sup></td>
              </tr>
              <tr>
                <td>Влажность</td>
                <td>{currentWeather?.main?.humidity}%</td>
              </tr>
              <tr>
                <td>Давление</td>
                <td>{currentWeather?.main?.pressure} мм рт.</td>
              </tr>
              </tbody>
            </table>
            <table>
              <tbody>
              <tr>
                <td>
                </td>
              </tr>
              <tr>
                <td>Осадки</td>
                <td>{currentWeather?.weather?.description}</td>
              </tr>
              <tr>
                <td>Ветер</td>
                <td>{currentWeather?.wind?.speed} м/с</td>
              </tr>
              <tr>
                <td>Восход солнца</td>
                <td>{currentWeather?.sys?.sunrise.toLocaleString()}</td>
              </tr>
              <tr>
                <td>Заход солнца</td>
                <td>{currentWeather?.sys?.sunset.toLocaleString()}</td>
              </tr>
              </tbody>
            </table>
          </div>
      </div>
    </div>
  );
};

export default withRouter(Weather);
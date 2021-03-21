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
        <div className={classes.CurrentWeather}>
          <h4>{currentWeather?.name}</h4>

          <div style={{ display: 'flex' }}>
            <WeatherIcon code={currentWeather?.weather?.id} big />
            <table>
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
                <td>{currentWeather?.main?.pressure}мм рт.</td>
              </tr>
            </table>
            <table>
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
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Weather);
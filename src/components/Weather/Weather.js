import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import WeatherIcon from './WeatherIcon';
import classes from './Weather.module.css'
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

const Weather = (props) => {

  const { weather, isInitial, isError } = useSelector((store) => ({
    weather: store.weather.weatherData,
    isInitial: store.app.isInitial,
    isError: store.weather.isError,
  }));

  console.log(weather);


  useEffect(() => {
    if (isError) {
      console.log('Cannot load weather for this place');
    }
  }, [isError]);

  if (isInitial) return <div>Please select city</div>;

  return (
    <div className={classes.WeatherContainer }>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link to='/'>вернуться к поиску</Link>
        <h4>Current Weather</h4>

      </div>

      <div className={classes.CurrentWeatherContainer}>
        <div className={classes.CurrentWeather}>
          <h4>{weather.name}</h4>

          <div style={{ display: 'flex' }}>
            <WeatherIcon code={weather.id} big />
            <span>
              {weather.main.temp}
              <sup>&deg;</sup>
            </span>
          </div>
        </div>

        <h6>{weather.description}</h6>





      </div>

    </div>
  );
};


export default withRouter(Weather);
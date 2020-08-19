import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WeatherIcon from './WeatherIcon';
import classes from './Weather.module.css'
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

const Weather = (props) => {

  const { weather, degreeType, isInitial, isError } = useSelector((store) => ({
    weather: store.weather.weatherData,
    degreeType: store.app.tempUnit,
    isInitial: store.app.isInitial,
    isError: store.weather.isError,
  }));


  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      console.log('Cannot load weather for this place');
    }
  }, [isError]);

  if (isInitial) return <></>;

  return (
    <div className={classes.WeatherContainer }>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/*<button onClick={props.history.goBack}>вернуться к поиску</button>*/}
        <Link to='/'>вернуться к поиску</Link>
        <h4>Current Weather</h4>

      </div>

      <div className={classes.CurrentWeatherContainer}>
        <div className={classes.CurrentWeather}>
          <h4>{weather.name}</h4>

          <div style={{ display: 'flex' }}>
            <WeatherIcon code={weather.weather.id} big />
            <span>
              {weather.main.temp}
              <sup>&deg;</sup>
            </span>
          </div>
        </div>

        <h6>{weather.weather.description}</h6>





      </div>

    </div>
  );
};


export default withRouter(Weather);
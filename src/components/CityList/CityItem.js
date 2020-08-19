import React from 'react';
import classes from './CityItem.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherFromApi } from '../../store/actions/weather';

export const CityItem = (props) => {

  const { weather } = useSelector((store) => ({
    weather: store.weather.weatherData,
  }));


  const dispatch = useDispatch();

  const onClickWeather = (key) => {
    dispatch(fetchWeatherFromApi(key.split(',')[0]));
  }

  return (
    <>
      <li className={classes.CityItem} onClick={() => onClickWeather(props.city)}>
        { props.children }
      </li>
    </>
  );
};

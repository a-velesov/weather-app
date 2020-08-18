import React from 'react';
import classes from './CityItem.module.css';
import { useDispatch } from 'react-redux';
import { fetchWeatherFromApi } from '../../store/actions/weather';

export const CityItem = (props) => {

  const dispatch = useDispatch();

  const onClickWeather = (key) => {
    /* let local = new Array(key);
     console.log(clickWeather.join(' '));*/
    console.log(key);

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

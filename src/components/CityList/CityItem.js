import React from 'react';
import classes from './CityItem.module.css';
import { useDispatch } from 'react-redux';
import { fetchWeatherFromApi } from '../../store/actions/weather';
import { withRouter } from 'react-router';

const CityItem = (props) => {

  const dispatch = useDispatch();

  const onClickWeather = (key) => {
    dispatch(fetchWeatherFromApi(key.split(',')[0]));
    props.history.push('/weather')
  }

  return (
    <>
      <li className={classes.CityItem} onClick={() => onClickWeather(props.city)}>
        <i className="fas fa-map-marker-alt"/>
        { props.children }
      </li>
    </>
  );
};


export default withRouter(CityItem)
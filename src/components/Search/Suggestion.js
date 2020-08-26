import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherFromApi } from '../../store/actions/weather';
import classes from './Suggestion.module.css';
import { setCityList } from '../../store/actions/app';
import { Route, withRouter } from 'react-router';
import { useEffect } from 'react';
import Weather from '../Weather/Weather';

const Suggestion = ({label, searchTerm, inputActually, hideSuggestionFn, weather, history }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWeatherFromApi(label, label));
  }, [ searchTerm ]);

  const onClick = () => {
    dispatch(fetchWeatherFromApi(label, label));
    dispatch(setCityList(label));


    setTimeout(() => {
      inputActually(label);
      hideSuggestionFn();
    }, 400);
  };

  return (
    <div className={classes.SuggestionBlock}>
      <span className={ classes.SuggestionLink } onClick={ onClick }><i className="fas fa-map-marker-alt" /> { label }</span>
      {weather ? <span>{weather.main.temp} °C</span> : ''}
    </div>
  );
};

export default withRouter(Suggestion);
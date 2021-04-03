import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherFromApi, fetchCurrentWeatherFromApi } from '../../store/actions/weather';
import classes from './Suggestion.module.css';
import { setCityList } from '../../store/actions/app';
import { Route, withRouter } from 'react-router';
import { useEffect } from 'react';
import Weather from '../Weather/Weather';

const Suggestion = ({
  label,
  searchTerm,
  inputActually,
  hideSuggestionFn,
  weather,
  history,
}) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWeatherFromApi(label, label));
  }, [ searchTerm ]);

  const onClick = (value) => {
    dispatch(fetchCurrentWeatherFromApi(value, value));
    dispatch(setCityList(value));


    setTimeout(() => {
      inputActually(value);
      hideSuggestionFn();
    }, 400);
  };

  return (
    <>
      { weather
        ? (<div className={ classes.SuggestionBlock }>
          <span className={ classes.SuggestionLink } onClick={ () => onClick(label) }>
            <i className="fas fa-map-marker-alt" /> { label }
          </span>
          <span className={classes.SuggestionTemp}>{ weather.main.temp } °C</span>
        </div>)
        : null }
    </>
  );
};

export default withRouter(Suggestion);
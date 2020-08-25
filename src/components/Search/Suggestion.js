import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherFromApi } from '../../store/actions/weather';
import classes from './Suggestion.module.css';
import { setCityList } from '../../store/actions/app';
import { withRouter } from 'react-router';
import { useEffect } from 'react';

const Suggestion = ({label, searchTerm, inputActually, hideSuggestionFn, weather }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWeatherFromApi(label.split(',')[0], label));
  }, [ searchTerm ]);

  const onClick = () => {
    dispatch(fetchWeatherFromApi(label.split(',')[0], label));
    dispatch(setCityList(label));
    /*props.history.push('/weather')*/

    setTimeout(() => {
      inputActually(label.split(',')[0]);
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
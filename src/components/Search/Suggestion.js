import * as React from 'react';
import { useDispatch } from 'react-redux';
import { fetchWeatherFromApi } from '../../store/actions/weather';
import classes from './Suggestion.module.css'
import { setCityList } from '../../store/actions/app';
import { withRouter } from 'react-router';


const Suggestion = (props) => {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(fetchWeatherFromApi(props.label.split(',')[0]));
    dispatch(setCityList(props.label));

    props.history.push('/weather')

    setTimeout(() => {
      props.hideSuggestionFn();
    }, 400);

  };

  return <a className={classes.SuggestionLink} onClick={onClick}>{props.label}</a>;
};

export default withRouter(Suggestion);
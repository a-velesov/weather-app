import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchWeatherFromApi } from '../../store/actions/weather';
import { withRouter } from 'react-router';

const HistoryItem = (props) => {

  const dispatch = useDispatch();

  const onClickWeather = (key) => {
    dispatch(fetchWeatherFromApi(key.split(',')[0]));
    /*props.history.push('/weather')*/
  }

  return (
    <>
      <li className={'bm-item'} onClick={() => onClickWeather(props.city)}>
        <i className="fas fa-map-marker-alt"/>
        { props.children }
      </li>
    </>
  );
};


export default withRouter(HistoryItem)
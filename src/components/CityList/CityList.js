import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './CityList.module.css'
import { CityItem } from './CityItem';
import { fetchWeatherFromApi } from '../../store/actions/weather';

export const CityList = (props) => {

  const local = useSelector((state) => state.app.cityList)
  const dispatch = useDispatch();



  const onClickWeather = (key, i) => {
   /* let local = new Array(key);
    console.log(clickWeather.join(' '));*/

    //dispatch(fetchWeatherFromApi(clickWeather));
  }

  return (
    <>
    {local
      ? <div className={classes.Storage}>
        <ul className={classes.StorageList}>
          <h2>Избранное</h2>
          { local.map((key, i) => (
            <CityItem city={key} key={i}>{key}</CityItem>
          )) }
        </ul>
      </div>
      : []
    }
    </>
  );
};

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './CityList.module.css'
import { CityItem } from './CityItem';
import { selectedSearchHistory } from '../Search/searchHistory';

export const CityList = (props) => {

  const local = useSelector((state) => state.app.cityList)

  const { weather } = useSelector((store) => ({
    weather: store.weather.weatherData,
  }));

  const searchHistory = useSelector(selectedSearchHistory);


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
          <h2 className={classes.StorageTitle}>История поиска</h2>
          { local.map((key, i) => (
            <CityItem temp={weather.main.temp} city={key} key={i}>{key}</CityItem>
          )) }
        </ul>
      </div>
      : []
    }
    </>
  );
};

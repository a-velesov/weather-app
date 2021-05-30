import React from 'react';
import classes from './Layout.module.css';
import Search from '../Search/Search';
import { HistoryList } from '../HistoryList/HistoryList';
import { Header } from '../Header/Header';
import Weather from '../Weather/Weather';
import { useSelector } from 'react-redux';

export const Layout = () => {
  const darkMode = useSelector((state) => state.app.darkMode);
  const currentWeather = useSelector((state) => state.weather.currentWeather);
  const isInitial = useSelector((state) => state.app.isInitial);

  const style = [];
  if(darkMode) {
    style.push('Dark')
  } else {
    style.push('Light')
  }

  return (
    <div className={classes[style.join('.')]}>
      <Header />
      <main className={classes.Main}>
        <Search />
        {
          currentWeather ? <Weather style={style} /> : null
        }
      </main>
      <HistoryList />
    </div>
  );
};

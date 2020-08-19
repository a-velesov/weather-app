import React from 'react';
import classes from './Layout.module.css';
import Search from '../Search/Search';
import { CityList } from '../CityList/CityList';
import { Header } from '../Header/Header';
import Weather from '../Weather/Weather';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router';
import { useSelector } from 'react-redux';

export const Layout = (props) => {
  const darkMode = useSelector((state) => state.app.darkMode);

  const style = []
  if(darkMode) {
    style.push('Dark')
  } else {
    style.push('Light')
  }

  return (
    <div className={classes[style.join('.')]}>

      <Header />
      <Switch>
      <Route path='/weather' component={ Weather } />
      <Route path='/' exact component={ Search } />
      </Switch>
      <CityList />
    </div>
  );
};

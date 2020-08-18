import React from 'react';
import classes from './Layout.module.css';
import Search from '../Search/Search';
import { CityList } from '../CityList/CityList';
import { Header } from '../Header/Header';

export const Layout = (props) => {
  return (
    <div className={classes.Container}>
      <Header />
      <Search />
      <CityList />
    </div>
  );
};

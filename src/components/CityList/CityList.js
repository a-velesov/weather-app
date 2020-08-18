import React from 'react';
import { useSelector } from 'react-redux';
import classes from './CityList.module.css'

export const CityList = (props) => {

  const local = useSelector((state) => state.app.cityList)

  return (
    <div className={classes.Storage}>
      <ul className={classes.StorageList}>
        { local.map(key => (
          <li key={key}>{ key }</li>
        )) }

      </ul>
    </div>
  );
};

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CityItem from './HistoryItem';
import { selectedSearchHistory } from '../Search/searchHistory';
import { fetchWeatherFromApi } from '../../store/actions/weather';
import './HistoryList.css'
import { slide as Menu } from 'react-burger-menu';

export const HistoryList = () => {

  const local = useSelector((state) => state.app.cityList);

  return (
    <>
      { local
        ? <>
          <Menu pageWrapId={ "page-wrap" } isOpen={false}>
          <div className={'bm-menu-wrap'} id='page-wrap'>
            <div className='bm-menu'>
            <ul className='bm-item-list'>
              <h2>История поиска</h2>
              { local.map((key, i) => (
                <CityItem city={ key } key={ i }>{ key }</CityItem>
              )) }
            </ul>
            </div>
          </div>
          </Menu>
        </>
        : []
      }
    </>
  );
};

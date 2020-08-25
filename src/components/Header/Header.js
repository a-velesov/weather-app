import React from 'react';
import classes from './Header.module.css';
import DarkModeToggle from 'react-dark-mode-toggle';
import { toggleDarkMode } from '../../store/actions/app';
import { useDispatch, useSelector } from 'react-redux';

export const Header = (props) => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.app.darkMode);

  return (
    <>
      <div className={classes.Header}>
        <div className={ classes.Toggle }>
          <DarkModeToggle checked={ isDarkMode } onChange={ () => dispatch(toggleDarkMode()) } size={ 60 } />
        </div>
      </div>
    </>
  );
};

import React from 'react';
import { useSelector } from 'react-redux';
import { celciusToFahrenheit } from '../../utils/unitConversion';
import * as actionTypes from '../../store/actionTypes';


export const Temperature = (props) => {
  const { degreeType } = useSelector((state) => ({
    degreeType: state.app.tempUnit,
  }));

  if(degreeType === actionTypes.FAHRENHEIT) {
    return <>{ celciusToFahrenheit(props.value) }</>;
  }
  return <>{ props.value }</>;
};

import * as actionTypes from '../actionTypes';

export const changeDegreeType = () => ({
  type: actionTypes.CHANGE_TEMP_UNIT,
  payload: {},
});

export const setIsInitialState = (state) => ({
  type: actionTypes.SET_IS_INITIAL,
  payload: state,
});

export const setIsLoading = (loading) => ({
  type: actionTypes.SET_IS_LOADING,
  payload: loading,
});

export const toggleDarkMode = () => ({
  type: actionTypes.TOGGLE_DARK_MODE,
});

export const setCityList = (city) => ({
  type: actionTypes.SET_CITY_LIST,
  payload: city
})
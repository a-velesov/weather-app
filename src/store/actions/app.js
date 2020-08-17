import * as actionTypes from '../actionTypes';

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

export const cityList = (city) => ({
  type: actionTypes.CITY_LIST,
  payload: city
})
import {createSelector} from 'reselect';

export const selectSearchHistory = state => state.app.cityList;

export const selectedSearchHistory = createSelector(
  selectSearchHistory,
  cityList => cityList
);
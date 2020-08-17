import * as actionTypes from '../actionTypes';

const initialState = {
  isLoading: false,
  isInitial: true,
  cityList: JSON.parse(localStorage.getItem('city')),
  darkMode: JSON.parse(localStorage.getItem('darkMode')),
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_DARK_MODE:
      localStorage.setItem('darkMode', (!state.darkMode).toString());
      return {
        ...state,
        darkMode: !state.darkMode,
      };

    case actionTypes.CITY_LIST:
      localStorage.setItem('city', JSON.stringify(state.cityList))

      // доп код
      let getData = JSON.parse(localStorage.getItem('city')).split()
      if(getData == null) getData = [];
      let actionPayload = [ ...action.payload ].join('');
      getData.push(actionPayload)
      localStorage.setItem('city', JSON.stringify(getData))

      return {
        ...state,
        cityList: action.payload
      }

    case actionTypes.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case actionTypes.SET_IS_INITIAL:
      return {
        ...state,
        isInitial: action.payload,
      };
    default:
      return state;
  }
};
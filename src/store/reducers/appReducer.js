import * as actionTypes from '../actionTypes';

const initialState = {
  isLoading: false,
  isInitial: true,
  cityList: JSON.parse(window.localStorage.getItem('city')),
  darkMode: JSON.parse(localStorage.getItem('darkMode')),
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_DARK_MODE:
      window.localStorage.setItem('darkMode', (!state.darkMode).toString());
      return {
        ...state,
        darkMode: !state.darkMode,
      };

    case actionTypes.SET_CITY_LIST:
      let getData = JSON.parse(window.localStorage.getItem('city'))
      let actionPayload = new Array(action.payload)
      let result = []
      if(getData !== null) {
        //console.log(getData);
        result = getData.concat(actionPayload)
    } else {
      result = actionPayload
    }
      window.localStorage.setItem('city', JSON.stringify(result))
      return {
        ...state,
        cityList: result
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
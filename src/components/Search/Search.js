import React, { useEffect, useRef, useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { fetchCities } from '../../api/placeSuggestion';
import { useClickOutside } from '../../hooks/useClickOutside';
import Suggestion from './Suggestion';
import classes from './Seacrh.module.css';
import { ReactComponent as SearchIcon } from './../../assets/img/search.svg';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherFromApi } from '../../store/actions/weather';

const Search = () => {
  const suggestionRef = useRef(null);
  const [ suggestions, setSuggestions ] = useState([ { matching_full_name: '' } ]);
  const [ showSuggestions, setShowSuggestions ] = useState(false);
  const [ searchTerm, setSearchTerm ] = useState('');

  const dispatch = useDispatch();

  const { weather } = useSelector((store) => ({
    weather: store.weather.weatherData,
  }));

  useEffect(() => {
    if(!searchTerm) {
      return;
    }
    setShowSuggestions(true);
    fetchCities(searchTerm).then((res) => {
      setSuggestions(res);
    });
  }, [ searchTerm ]);

  /*  useEffect(() => {
   suggestions.slice(0, 6).map((s, i) => {
   dispatch(fetchWeatherFromApi(s.matching_full_name.split(',')[0]));
   });
   }, [ suggestions ]);*/


  useClickOutside(suggestionRef, () => setShowSuggestions(false));

  const onSearchInputChanged = (e) => {
    setSearchTerm(e.target.value);
  };

  const onBlurInput = (e) => {
    e.target.value = '';
  };

  const eventKeyDown = (e) => {
    if(e.key === 'Enter' || e.keyCode === 13) {
      e.preventDefault();
      dispatch(fetchWeatherFromApi(searchTerm, searchTerm))
    }
  };

  /*  const showPosition = (position) => {
   dispatch(
   fetchWeatherFromApi({
   lat: position.coords.latitude,
   lng: position.coords.longitude,
   })
   );
   };*/

  return (
    <div className={ classes.Container }>
      <div className={ classes.SearchContainer }>
        <SearchIcon style={ {
          width: '20px',
          position: 'absolute',
          bottom: '22px',
          right: '2rem',
          zIndex: 2,
          color: 'gray',
          opacity: .7,
        } }
        />
        <DebounceInput
          className={ classes.Input }
          value={ searchTerm }
          placeholder="Введите город..."
          onBlur={ (e) => onBlurInput(e) }
          element={ 'input' } debounceTimeout={ 300 }
          onChange={ onSearchInputChanged }
          onKeyDown={ (e) => eventKeyDown(e) }
        />
      </div>
      { showSuggestions && (
        <div className={ classes.CityList } ref={ suggestionRef }>
          { suggestions.slice(0, 6).map((s, i) => (
            <Suggestion
              key={ s.matching_full_name }
              weather={ weather[s.matching_full_name] }
              searchTerm={ searchTerm }
              label={ s.matching_full_name }
              inputActually={ (value) => {
                setSearchTerm(value);
              } }
              hideSuggestionFn={ () => {
                setShowSuggestions(false);
              } }
            />)) }
        </div>
      ) }
    </div>
  );
};

export default Search;
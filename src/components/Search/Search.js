import React, { useEffect, useRef, useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { fetchCities } from '../../api/placeSuggestion';
import { useClickOutside } from '../../hooks/useClickOutside';
import Suggestion from './Suggestion';
import classes from './Seacrh.module.css';
import { ReactComponent as SearchIcon } from './../../assets/img/search.svg';
import { useDispatch, useSelector } from 'react-redux';
import DarkModeToggle from 'react-dark-mode-toggle';
import { toggleDarkMode } from '../../store/actions/app';

const Search = () => {
  const suggestionRef = useRef(null);
  const [ suggestions, setSuggestions ] = useState([ { matching_full_name: '' } ]);
  const [ showSuggestions, setShowSuggestions ] = useState(false);
  const [ searchTerm, setSearchTerm ] = useState('');

  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.app.darkMode);

  useEffect(() => {
    if(!searchTerm) {
      return;
    }
    setShowSuggestions(true);
    fetchCities(searchTerm).then((res) => {
      setSuggestions(res);
    });
  }, [ searchTerm ]);

  useClickOutside(suggestionRef, () => setShowSuggestions(false));

  const onSearchInputChanged = (e) => {
    setSearchTerm(e.target.value);
  };

  const onBlurInput = (e) => {
    e.target.value = '';
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


      <div className={ classes.Toggle }>
        <DarkModeToggle checked={ isDarkMode } onChange={ () => dispatch(toggleDarkMode()) } size={ 60 } />
      </div>
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
        <DebounceInput value={ searchTerm } onBlur={ (e) => onBlurInput(e) } className={ classes.Input } element={ 'input' } debounceTimeout={ 300 } onChange={ onSearchInputChanged } placeholder="Введите город..." />
      </div>
      { showSuggestions && (
        <div className={ classes.CityList } ref={ suggestionRef }>
          { suggestions?.slice(0, 6)?.map((s, i) => (
            <Suggestion
              key={ i }
              label={ s.matching_full_name }
              inputActually={ (value) => {
                setSearchTerm(value);
              } }
              hideSuggestionFn={ () => {
                setShowSuggestions(false);
              } }
            />
          )) }
        </div>
      ) }
    </div>
  );
};

export default Search;
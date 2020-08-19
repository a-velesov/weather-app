import React, { useEffect, useRef, useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { fetchCities } from '../../api/placeSuggestion';
import { useClickOutside } from '../../hooks/useClickOutside';
import Suggestion from './Suggestion';
import classes from './Seacrh.module.css'

const Search = () => {
  const suggestionRef = useRef(null);
  const [suggestions, setSuggestions] = useState([{ matching_full_name: '' }]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!searchTerm) {
      return;
    }
    setShowSuggestions(true);
    fetchCities(searchTerm).then((res) => {
      setSuggestions(res);
    });
  }, [searchTerm]);

  useClickOutside(suggestionRef, () => setShowSuggestions(false));

  const onSearchInputChanged = (e) => {
    setSearchTerm(e.target.value);
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
    <div className={classes.Container}>
      <DebounceInput className={classes.Input} element={'input'} debounceTimeout={300} onChange={onSearchInputChanged} placeholder="Введите город..." />

      {showSuggestions && (
        <div className={classes.CityList} ref={suggestionRef}>
          {suggestions?.slice(0, 6)?.map((s, i) => (
            <Suggestion
              key={i}
              label={s.matching_full_name}
              hideSuggestionFn={() => {
                setShowSuggestions(false);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
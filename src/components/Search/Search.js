import React, { useEffect, useRef, useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { fetchCities } from '../../api/placeSuggestion';
import { useClickOutside } from '../../hooks/useClickOutside';
import Suggestion from './Suggestion';
import classes from './Seacrh.module.css';
import { ReactComponent as SearchIcon } from './../../assets/img/search.svg';
import { ReactComponent as TargetIcon } from './../../assets/img/target.svg';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherFromApi, fetchCurrentWeatherFromApi } from '../../store/actions/weather';
import { Route, withRouter } from 'react-router';
import Weather from '../Weather/Weather';

const Search = (props) => {
  const suggestionRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
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
      props.history.push('/weather')
    }
  };

  const geoHandler = () => {
    if (!navigator.geolocation) {
      return alert('Geolocation is not supported by your browser!');
    }

    navigator.geolocation.getCurrentPosition((position) => {
      dispatch(
        fetchCurrentWeatherFromApi({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      );
    })
  }

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
        <TargetIcon
          onClick={geoHandler}
          style={ {
          width: '24px',
          position: 'absolute',
          bottom: '20px',
          right: '5rem',
          zIndex: 2,
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
              key={ i }
              weather={ weather[s] }
              searchTerm={ searchTerm }
              label={ s }
              inputActually={ (value) => {
                setSearchTerm(value);
              } }
              hideSuggestionFn={ () => {
                setShowSuggestions(false);
              } }
            />)) }
        </div>
      ) }

      <Route path='/weather'
             exact
             render={(props) => (
               <Weather {...props} exact weather={ weather[searchTerm] } />
             )}
      />
    </div>
  );
};

export default withRouter(Search);
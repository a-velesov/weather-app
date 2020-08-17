const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const baseUrl = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherData = (city, lat, lng) => {
  let url = `${baseUrl}/weather?q=${city}&appid=${API_KEY}`;

  if (typeof city === 'object') {
    url = `${baseUrl}/weather?lat=${city.lat}&lon=${city.lng}&appid=${API_KEY}`;
  }
  return fetch(url);
};
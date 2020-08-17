export const fetchCities = async (search) => {
  const url = `https://api.teleport.org/api/cities/?search=${search}`;
  const res = await (await fetch(url)).json();
  return res._embedded['city:search-results'];
};

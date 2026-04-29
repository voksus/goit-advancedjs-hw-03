import axios from 'axios';

function getImagesByQuery(query) {
  const API_KEY = '55629704-0f43e8f048148a116b7a60f53';
  const BASE_URL = 'https://pixabay.com/api/';

  return axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });
}

export default getImagesByQuery;

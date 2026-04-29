import getImagesByQuery from './js/pixabay-api.js';
import {
  showLoader,
  hideLoader,
  clearGallery,
  createGallery,
  showTotalAmount,
} from './js/render-functions.js';
import './css/styles.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();
  const query = event.target.elements.query.value.trim();

  if (!query) {
    no_content_warning();
    return;
  }

  clearGallery();
  showLoader();

  getImagesByQuery(query)
    .then(response => {
      let { hits, total, totalHits } = response.data;
      if (hits.length === 0) {
        no_content_warning();
        return;
      }
      createGallery(hits);
      showTotalAmount(totalHits, total);
    })
    .catch(error => {
      console.log(error);
      iziToast.error(iziToastMessageGenerator(error.message, 'error'));
    })
    .finally(() => {
      hideLoader();
    });
});

// Утилітні методи
function iziToastMessageGenerator(msg, type = 'warning') {
  return {
    message: msg,
    position: 'topRight',
    theme: 'light',
    icon: type,
  };
}

function no_content_warning() {
  iziToast.warning(
    iziToastMessageGenerator(
      'Sorry, there are no images matching your search query. Please try again!'
    )
  );
}

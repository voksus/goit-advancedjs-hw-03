import SimpleLightbox from 'simplelightbox/dist/simple-lightbox.esm.js';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const searchStats = document.querySelector('.search-stats');
let lightBox;

function showLoader() {
  loader.classList.remove('is-hidden');
}

function hideLoader() {
  loader.classList.add('is-hidden');
}

function clearGallery() {
  searchStats.innerHTML = '';
  gallery.innerHTML = '';
}

function createGallery(images) {
  const markup = images
    .map(
      item =>
        `<li class="gallery-item">
      <a class="gallery-link" href="${item.largeImageURL}">
        <img class="gallery-image" src="${item.webformatURL}" alt="${item.tags}" />
      </a>
      <div class="image-info">
        <div class="info-item">
          <svg class="info-label" width="16" height="16">
            <use href="../images/icons.svg#likes"></use>
          </svg>
          <span class="info-value">${digitSeparatorFix(item.likes)}</span>
        </div>
        <div class="info-item">
          <svg class="info-label" width="16" height="16">
            <use href="../images/icons.svg#views"></use>
          </svg>
          <span class="info-value">${digitSeparatorFix(item.views)}</span>
        </div>
        <div class="info-item">
          <svg class="info-label" width="16" height="16">
            <use href="../images/icons.svg#comments"></use>
          </svg>
          <span class="info-value">${digitSeparatorFix(item.comments)}</span>
        </div>
        <div class="info-item">
          <svg class="info-label" width="16" height="16">
            <use href="../images/icons.svg#download"></use>
          </svg>
          <span class="info-value">${digitSeparatorFix(item.downloads)}</span>
        </div>
      </div>
    </li>`
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);

  // Працює, але з багом.
  // Причину багу з'ясував 29.04.2026 при перевірці файлів джерела фреймворку разом із ШІ.
  // Я вирішив не використовувати підхід `lightBox.refresh()`.

  // Обрано підхід з методом `destroy()` і повторним створенням нового екземпляра класу `SimpleLightbox`.
  if (lightBox) {
    lightBox.destroy();
  }
  lightBox = new SimpleLightbox('.gallery-link', {
    captionsData: 'alt',
    captionDelay: 250,
    overlayOpacity: 0.9,
  });
}

// Утилітні методи
function digitSeparatorFix(number) {
  return number.toLocaleString('de-CH'); // Розділення розрядів апострофами
  // return number.toLocaleString('en-US');  // ... комами
  // return number.toLocaleString('ua-UA');  // ... пробілами
}

function showTotalAmount(totalHits, total) {
  totalHits = digitSeparatorFix(totalHits);
  total = digitSeparatorFix(total);
  searchStats.innerHTML = `<div>Picked first:&nbsp;&nbsp;<span class="total-amount-number">${totalHits}</span></div><div>Total amount:&nbsp;&nbsp;<span class="total-amount-number">${total}</span></div>`;
}

export { showLoader, hideLoader, clearGallery, createGallery, showTotalAmount };

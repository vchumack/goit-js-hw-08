import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

// вытащили ul галереи
const refs = {
  gallery: document.querySelector('.gallery'),
};

// создали и зарендерили разметку
function createImagesGallery(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
      <a class="gallery__item" href="${original}">
        <img class="gallery__image" src="${preview}" alt="${description}" />
      </a >
        `;
    })
    .join('');
}
const listGallery = createImagesGallery(galleryItems);
console.log(listGallery);

// добавили разметку в ul
refs.gallery.innerHTML = listGallery;

// ...Открытие модального окна по клику на элементе галереи. Для этого ознакомься с документацией и примерами.
refs.gallery.addEventListener('click', onGalleryClick);

function onGalleryClick(event) {
  event.preventDefault();

  var lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
}

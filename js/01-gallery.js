import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

// Створення і рендер розмітки на підставі масиву даних galleryItems і наданого шаблону елемента галереї.

const galleryEl = document.querySelector('.gallery');

const makeGalleryCard =({
    preview,
    original,
    description,
}) => `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
   <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
 </div>`;

 const markupGallery = galleryItems.map((data) => makeGalleryCard(data)).join('');

 galleryEl.insertAdjacentHTML('afterbegin', markupGallery);

//  Реалізація делегування на div.gallery і отримання url великого зображення.

galleryEl.addEventListener('click', handleImageClick);

function handleImageClick(event) {
    event.preventDefault();

    if (event.target.nodeName !== 'IMG') {
        return;
    }

    const modalImg = event.target.dataset.source;
    console.log( modalImg);

    createModal(event.target).show();
}

// const instance = basicLightbox.create(`
//     <img src="assets/images/image.png" width="800" height="600">
// `)

// instance.show()


// Відкриття модального вікна по кліку на елементі галереї.

function createModal(event) {

  // Заміна значення атрибута src елемента <img> в модальному вікні перед відкриттям.

  const html = `<img src="${event.dataset.source}">`;

  let instance = basicLightbox.create(html, {
    onShow: () => {
      window.addEventListener('keydown', onKeyClose);
    },
    onClose: () => {
      window.removeEventListener('keydown', onKeyClose);
    },
  });
  return instance;

  // закриття модального вікна після натискання клавіші Escape

  function onKeyClose(event) {
    const ESC_KEY_CODE = 'Escape';

    if (event.code !== ESC_KEY_CODE) return;
    instance.close();
  }
}


import { DATA } from './data.js';
import { createBigPictureHeading } from './big-picture-heading.js';
import { addLoadMoreCommentsEvent, onLoadMoreCommentsButton } from './load-more-comments.js';
import { isEscapeKey } from './util.js';


const bigPictureBlock = document.querySelector('.big-picture');
const closeBigPictureModal = document.querySelector('.big-picture__cancel');
const bigPictureModal = document.querySelector('.big-picture');
const loadMoreCommentsButton = document.querySelector('.social__comments-loader');
const pictureBlock = document.querySelector('.pictures');


function addBigPictureEvent() {
  pictureBlock.addEventListener('click', onPictureClick);
}

function onPictureClick(evt) {
  const currentPicture = evt.target.closest('.picture');
  if(currentPicture) {
    evt.preventDefault();
    let currentImage;
    for(let i = 0; DATA.length > i; i++) {
      if(DATA[i].id === Number(currentPicture.dataset.pictureId)) {
        currentImage = DATA[i];
        break;
      }
    }
    bigPictureBlock.classList.remove('hidden');
    document.body.classList.add('modal-open');
    const bigPicture = document.querySelector('.big-picture__img img');
    bigPicture.src = currentImage.url;
    bigPicture.dataset.pictureId = currentPicture.dataset.pictureId;
    createBigPictureHeading(DATA);
    addLoadMoreCommentsEvent();
    closeBigPictureModal.addEventListener('click', onCloseButton);
    document.addEventListener('keydown', onEscKeydown);
  }
}


function onCloseButton() {
  bigPictureModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
  closeBigPictureModal.removeEventListener('click', onCloseButton);
  loadMoreCommentsButton.removeEventListener('click', onLoadMoreCommentsButton);
}

function onEscKeydown(evt) {
  if(isEscapeKey(evt)){
    evt.preventDefault();
    bigPictureModal.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onEscKeydown);
    closeBigPictureModal.removeEventListener('click', onCloseButton);
    loadMoreCommentsButton.removeEventListener('click', onLoadMoreCommentsButton);
  }
}

export {addBigPictureEvent};

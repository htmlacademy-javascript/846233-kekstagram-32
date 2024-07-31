import { createCommentsList } from './create-comments.js';
import { getDataElement } from './util.js';

function createBigPictureHeading(data) {
  const pictureId = getBigPictureDatasetId();
  const dataElement = getDataElement(data, pictureId);

  createSocialDescription(dataElement);
  createCommentsList(dataElement);
}

function createSocialDescription(dataElement) {
  const socialDescription = document.querySelector('.social__caption');
  const socialLikes = document.querySelector('.likes-count');

  socialDescription.textContent = dataElement.description;
  socialLikes.textContent = dataElement.likes;
}

function getBigPictureDatasetId() {
  const bigPicture = document.querySelector('.big-picture__img img');
  const pictureDatasetId = Number(bigPicture.dataset.pictureId);
  return pictureDatasetId;
}


export {createBigPictureHeading};

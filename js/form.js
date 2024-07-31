import { sendData } from './api.js';
import { pristine } from './pristine-validator.js';
import { isEscapeKey } from './util.js';
import { addEventOnScaleButton, removeEventOnScaleButton } from './edit-scale-image.js';
import { openSuccessSendDataMessage, openErrorSendDataMessage } from './messages.js';
import { removeOnEffectButtonEvent, addOnEffectButtonEvent } from './edit-effect-image.js';

const usersImagesUploadForm = document.querySelector('.img-upload__form');
const imageUploadBlock = usersImagesUploadForm.querySelector('.img-upload__overlay');
const imageUploadButton = usersImagesUploadForm.querySelector('.img-upload__input');
const hashtagsInput = usersImagesUploadForm.querySelector('.text__hashtags');
const descriptionInput = usersImagesUploadForm.querySelector('.text__description');
const submitButton = usersImagesUploadForm.querySelector('.img-upload__submit');
const effectButtons = usersImagesUploadForm.querySelectorAll('.effects__radio');
const effectPreviews = usersImagesUploadForm.querySelectorAll('.effects__preview');
const sliderRange = usersImagesUploadForm.querySelector('.img-upload__effect-level');
const usersImagePreviews = usersImagesUploadForm.querySelector('.img-upload__preview img');
const scaleImageValue = usersImagesUploadForm.querySelector('.scale__control--value');
const closeFormButton = usersImagesUploadForm.querySelector('.img-upload__cancel');

const FILE_TYPES = ['.jpg', '.jpeg', '.png', '.gif', '.jfif'];

const DEFAULT_IMAGE_SCALE = 100;

function onSubmitForm(evt) {
  evt.preventDefault();

  const isHashtagsInputValid = pristine.validate(hashtagsInput);
  const isDescriptionInputValid = pristine.validate(descriptionInput);

  if(isHashtagsInputValid && isDescriptionInputValid) {
    blockSubmitButton();
    const formData = new FormData(evt.target);
    sendData(formData)
      .then(() => {
        imageUploadBlock.classList.add('hidden');
        document.body.classList.remove('modal-open');
        document.removeEventListener('keydown', onEscKeydown);
        usersImagesUploadForm.removeEventListener('submit', onSubmitForm);
        closeFormButton.removeEventListener('click', onFromCloseButton);
        imageUploadButton.value = '';
        pristine.reset(hashtagsInput);
        removeEventOnScaleButton();
        openSuccessSendDataMessage();
        removeOnEffectButtonEvent();
        formReset();
      })
      .catch(() => {
        openErrorSendDataMessage();
      })
      .finally(() => {
        unlockSubmitButton();
      });
  }
}

function onImageUploadButton() {
  loadUsersImage();
  addEventOnScaleButton();
  imageUploadBlock.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
  usersImagesUploadForm.addEventListener('submit', onSubmitForm);
  closeFormButton.addEventListener('click', onFromCloseButton);
  addOnEffectButtonEvent();
}

function onFromCloseButton() {
  formReset();
  removeEventOnScaleButton();
  imageUploadBlock.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
  usersImagesUploadForm.removeEventListener('submit', onSubmitForm);
  closeFormButton.removeEventListener('click', onFromCloseButton);
  removeOnEffectButtonEvent();
  imageUploadButton.value = '';
  pristine.reset(hashtagsInput);
}

function loadUsersImage() {
  const file = imageUploadButton.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const url = URL.createObjectURL(file);
    usersImagePreviews.src = url;
    for (let i = 0; effectPreviews.length > i; i++) {
      effectPreviews[i].style.backgroundImage = `url(${url})`;
    }
  }
}

function onEscKeydown(evt) {
  if(isEscapeKey(evt)){
    if (evt.target === hashtagsInput || evt.target === descriptionInput) {
      return;
    }
    evt.preventDefault();
    formReset();
    pristine.reset(hashtagsInput);
    removeEventOnScaleButton();
    imageUploadBlock.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onEscKeydown);
    usersImagesUploadForm.removeEventListener('submit', onSubmitForm);
    closeFormButton.removeEventListener('click', onFromCloseButton);
    removeOnEffectButtonEvent();
    imageUploadButton.value = '';
  }
}

function formReset() {
  usersImagesUploadForm.reset();
  resetEffectButton(effectButtons, effectPreviews);
  sliderRange.classList.add('hidden');
  usersImagePreviews.style.filter = 'grayscale(0)';
  usersImagePreviews.style.transform = 'scale(1)';
  scaleImageValue.setAttribute('value', `${DEFAULT_IMAGE_SCALE}%`);
}

function resetEffectButton(effectsInput, effectImage) {
  effectsInput[0].checked = true;
  effectImage[0].style.backgroundImage = '';
  for(let i = 1; effectsInput.length > i; i++){
    effectsInput[i].checked = false;
    effectImage[i].style.backgroundImage = '';
  }
}

function blockSubmitButton() {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю данные';
}

function unlockSubmitButton() {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
}

function addEventOnSubmitForm() {
  usersImagesUploadForm.addEventListener('change', onImageUploadButton);
}

addEventOnSubmitForm();

export {addEventOnSubmitForm, onEscKeydown};

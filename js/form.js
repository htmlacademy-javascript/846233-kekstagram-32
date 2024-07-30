import { resetScale } from './scale.js';
import { resetEffects } from './effect.js';
import { showSuccessMessage, showErrorMessage } from './message.js';

// DOM элементы
const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const cancelButton = document.querySelector('#upload-cancel');
const fileField = document.querySelector('#upload-file');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');
const photoPreview = document.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');

// Константы
const MAX_HASHTAG_COUNT = 5;
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;
const UNVALID_SYMBOLS = /[^a-zA-Z0-9а-яА-ЯёЁ]/g;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const HASHTAG_ERRORS = {
  INVALID: 'Хэштег не соответствует требованиям!',
  QUANTITY: 'Превышено количество хэштегов!',
  REPEATING: 'Хэштеги не должны повторяться!',
};

const COMMENTS_ERRORS = {
  LENGTH: 'Длина комментария не должна быть больше 140 символов!'
};

// Настройка Pristine
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div'
});

// Функции
const showModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);
};

const hideModal = () => {
  form.reset();
  resetScale();
  resetEffects();
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
};

const isTextFieldFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

function onEscKeyDown(evt) {
  if (evt.key === 'Escape' && !isTextFieldFocused()) {
    evt.preventDefault();
    hideModal();
  }
}

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

const onCancelButtonClick = () => {
  hideModal();
};

const onFileInputChange = () => {
  const file = fileField.files[0];

  if (file && isValidType(file)) {
    photoPreview.src = URL.createObjectURL(file);
    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url('${photoPreview.src}')`;
    });
  }
  showModal();
};

// Валидация хэштегов
const startsWithHash = (string) => string[0] === '#';
const hasValidLength = (string) => string.length >= MIN_HASHTAG_LENGTH && string.length <= MAX_HASHTAG_LENGTH;
const hasValidSymbols = (string) => !UNVALID_SYMBOLS.test(string.slice(1));
const isValidTag = (tag) => startsWithHash(tag) && hasValidLength(tag) && hasValidSymbols(tag);

const getHashtags = (value) => value.trim().toLowerCase().split(' ').filter((tag) => tag.length > 0);

const validateHashtagInvalid = (value) => {
  const hashtags = getHashtags(value);
  return hashtags.every((hashtag) => isValidTag(hashtag));
};

const validateHashtagRepeating = (value) => {
  const hashtags = getHashtags(value);
  return new Set(hashtags).size === hashtags.length;
};

const validateHashtagLength = (value) => {
  const hashtags = getHashtags(value);
  return hashtags.length <= MAX_HASHTAG_COUNT;
};

const validateCommentLength = (value) => value.length <= MAX_COMMENT_LENGTH;

// Добавляем валидаторы
pristine.addValidator(hashtagField, validateHashtagInvalid, HASHTAG_ERRORS.INVALID);
pristine.addValidator(hashtagField, validateHashtagRepeating, HASHTAG_ERRORS.REPEATING);
pristine.addValidator(hashtagField, validateHashtagLength, HASHTAG_ERRORS.QUANTITY);
pristine.addValidator(commentField, validateCommentLength, COMMENTS_ERRORS.LENGTH);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const setOnFormSubmit = (cb) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      try {
        await cb(new FormData(form));
        showSuccessMessage();
        hideModal();
      } catch (error) {
        showErrorMessage();
      } finally {
        unblockSubmitButton();
      }
    }
  });
};

// События
fileField.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);

export { setOnFormSubmit, hideModal };

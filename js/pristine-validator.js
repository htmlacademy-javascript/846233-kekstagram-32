const MAX_DESCRIPTION_LENGTH = 140;
const MAX_HASHTAGS = 5;
const REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;

const DESCRIPTION_ERROR_MESSAGE = 'Должно быть не более 140 символов';
const ERROR_HASHTAGS_MESSAGES = [
  `Не более ${MAX_HASHTAGS} хештегов`,
  'Неправильно введен хештег',
  'Хештеги не должны повторяться',
];

const imageUploadForm = document.querySelector('.img-upload__form');
const hashtagsInput = imageUploadForm.querySelector('.text__hashtags');
const descriptionInput = imageUploadForm.querySelector('.text__description');

const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text__error'
});

function isDescriptionValidate(inputValue) {
  return inputValue.length <= MAX_DESCRIPTION_LENGTH;
}

function isHashtagValidate(inputValue) {
  const isValidate = {
    length: true,
    regular: true,
    repeated: true
  };
  const HASHTAGS = getHashtagsArray(inputValue);
  isValidate.length = checkHashtagsLength(HASHTAGS);
  isValidate.regular = checkValidateByRegular(HASHTAGS);
  isValidate.repeated = checkRepeatHashtags(HASHTAGS);
  return getValidateResult(isValidate);
}

function createErrorMessage(inputValue) {
  if (inputValue.length === 0) {
    return true;
  }

  const isValidate = {
    length: true,
    regular: true,
    repeated: true
  };
  const HASHTAGS = getHashtagsArray(inputValue);
  isValidate.length = checkHashtagsLength(HASHTAGS);
  isValidate.regular = checkValidateByRegular(HASHTAGS);
  isValidate.repeated = checkRepeatHashtags(HASHTAGS);
  return getErrorMessage(isValidate);
}

function checkHashtagsLength(hashtags) {
  return MAX_HASHTAGS >= hashtags.length;
}

function checkRepeatHashtags(hashtags) {
  const lowercasedHashtags = hashtags.map((hashtag) => hashtag.toLowerCase());
  const uniqueHashtags = new Set(lowercasedHashtags);
  return uniqueHashtags.size === hashtags.length;
}

function checkValidateByRegular(hashtags) {
  return hashtags.every((hashtag) => REGEXP.test(hashtag));
}

function getValidateResult(validateObject) {
  return Object.values(validateObject).every((value) => value);
}

function getHashtagsArray(hashtags) {
  return hashtags.toLowerCase().trim().split(/\s+/).filter((hashtag) => hashtag.length > 0);
}

function getErrorMessage(validateObject) {
  const keysValue = Object.values(validateObject);
  for (let i = 0; i < keysValue.length; i++) {
    if (keysValue[i] === false) {
      return ERROR_HASHTAGS_MESSAGES[i];
    }
  }
  return true;
}

pristine.addValidator(hashtagsInput, isHashtagValidate, createErrorMessage);
pristine.addValidator(descriptionInput, isDescriptionValidate, DESCRIPTION_ERROR_MESSAGE);

export { pristine };

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

const reduceSizeButton = document.querySelector('.scale__control--smaller');
const increaseSizeButton = document.querySelector('.scale__control--bigger');
const imageScaleInputValue = document.querySelector('input.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview img');

function onReduceSizeButtonClick() {
  if (imageScaleInputValue.value === `${MIN_SCALE}%`) {
    imageScaleInputValue.value = `${MIN_SCALE}%`;
    imageScaleInputValue.setAttribute('value', `${MIN_SCALE}%`);
    previewImage.style.transform = `scale(${parseInt(imageScaleInputValue.value, 10) / 100})`;
  } else {
    const currentValue = parseInt(imageScaleInputValue.value, 10) - SCALE_STEP;
    imageScaleInputValue.value = `${currentValue}%`;
    imageScaleInputValue.setAttribute('value', `${currentValue}%`);
    previewImage.style.transform = `scale(${parseInt(imageScaleInputValue.value, 10) / 100})`;
  }
}

function onIncreaseSizeButtonClick() {
  if (imageScaleInputValue.value === `${MAX_SCALE}%`) {
    imageScaleInputValue.value = `${MAX_SCALE}%`;
    imageScaleInputValue.setAttribute('value', `${MAX_SCALE}%`);
    previewImage.style.transform = `scale(${parseInt(imageScaleInputValue.value, 10) / 100})`;
  } else {
    const currentValue = parseInt(imageScaleInputValue.value, 10) + SCALE_STEP;
    imageScaleInputValue.value = `${currentValue}%`;
    imageScaleInputValue.setAttribute('value', `${currentValue}%`);
    previewImage.style.transform = `scale(${parseInt(imageScaleInputValue.value, 10) / 100})`;
  }
}

function addEventOnScaleButton() {
  reduceSizeButton.addEventListener('click', onReduceSizeButtonClick);
  increaseSizeButton.addEventListener('click', onIncreaseSizeButtonClick);
}

function removeEventOnScaleButton() {
  reduceSizeButton.removeEventListener('click', onReduceSizeButtonClick);
  increaseSizeButton.removeEventListener('click', onIncreaseSizeButtonClick);
}

export { addEventOnScaleButton, removeEventOnScaleButton };

const reducSizeButton = document.querySelector('.scale__control--smaller');
const increaseSizeButton = document.querySelector('.scale__control--bigger');
const imageScaleInputValue = document.querySelector('input.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview img');

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

function onReducSizeButton() {
  if (imageScaleInputValue.value === `${MIN_SCALE}%`) {
    imageScaleInputValue.value = `${MIN_SCALE}%`;
    imageScaleInputValue.setAttribute('value', `${MIN_SCALE}%`);
    previewImage.style.transform = `scale(${imageScaleInputValue.value})`;
  } else {
    const currenValue = parseInt(imageScaleInputValue.value, 10) - SCALE_STEP;
    imageScaleInputValue.value = `${currenValue}%`;
    imageScaleInputValue.setAttribute('value', `${currenValue}%`);
    previewImage.style.transform = `scale(${imageScaleInputValue.value})`;
  }
}


function onIncreaseSizeButton() {
  if (imageScaleInputValue.value === `${MAX_SCALE}%`) {
    imageScaleInputValue.value = `${MAX_SCALE}%`;
    imageScaleInputValue.setAttribute('value', `${MAX_SCALE}%`);
    previewImage.style.transform = `scale(${imageScaleInputValue.value})`;
  } else {
    const currenValue = parseInt(imageScaleInputValue.value, 10) + SCALE_STEP;
    imageScaleInputValue.value = `${currenValue}%`;
    imageScaleInputValue.setAttribute('value', `${currenValue}%`);
    previewImage.style.transform = `scale(${imageScaleInputValue.value})`;
  }
}

function addEventOnScaleButton() {
  reducSizeButton.addEventListener('click', onReducSizeButton);
  increaseSizeButton.addEventListener('click', onIncreaseSizeButton);
}

function removeEventOnScaleButton() {
  reducSizeButton.removeEventListener('click', onReducSizeButton);
  increaseSizeButton.removeEventListener('click', onIncreaseSizeButton);
}

export {addEventOnScaleButton, removeEventOnScaleButton};

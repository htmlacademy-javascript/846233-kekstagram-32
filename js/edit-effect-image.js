const sliderContainer = document.querySelector('.img-upload__effect-level');
const mainPicture = document.querySelector('.img-upload__preview img');
const listEffects = document.querySelectorAll('.effects__item');

const slider = document.querySelector('.effect-level__slider');

const effectChrome = document.querySelector('#effect-chrome');
const effectNone = document.querySelector('#effect-none');
const effectSepia = document.querySelector('#effect-sepia');
const effectMarvin = document.querySelector('#effect-marvin');
const effectPhobos = document.querySelector('#effect-phobos');
const effectHeat = document.querySelector('#effect-heat');
const effectValue = document.querySelector('.effect-level__value');

sliderContainer.classList.add('hidden');

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 0.1,
  step: 0,
  connect: 'lower',
});

function applyingEffects(target) {
  switch (target) {
    case effectNone:
      sliderContainer.classList.add('hidden');
      mainPicture.style.filter = 'none';
      effectValue.value = '';
      break;

    case effectChrome:
      sliderContainer.classList.remove('hidden');

      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });

      slider.noUiSlider.on('update', () => {
        const value = Number(slider.noUiSlider.get());
        mainPicture.style.filter = `grayscale(${value})`;
        effectValue.value = (value >= 1) ? 1 : value.toFixed(1);
      });
      break;

    case effectSepia:
      sliderContainer.classList.remove('hidden');

      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });

      slider.noUiSlider.on('update', () => {
        const value = Number(slider.noUiSlider.get());
        mainPicture.style.filter = `sepia(${value})`;
        effectValue.value = (value >= 1) ? 1 : value.toFixed(1);
      });
      break;

    case effectMarvin:
      sliderContainer.classList.remove('hidden');

      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });

      slider.noUiSlider.on('update', () => {
        const value = Number(slider.noUiSlider.get());
        mainPicture.style.filter = `invert(${value}%)`;
        effectValue.value = value.toFixed(0);
      });
      break;

    case effectPhobos:
      sliderContainer.classList.remove('hidden');

      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });

      slider.noUiSlider.on('update', () => {
        const value = Number(slider.noUiSlider.get());
        mainPicture.style.filter = `blur(${value}px)`;
        effectValue.value = value.toFixed(1);
      });
      break;

    case effectHeat:
      sliderContainer.classList.remove('hidden');

      slider.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });

      slider.noUiSlider.on('update', () => {
        const value = Number(slider.noUiSlider.get());
        mainPicture.style.filter = `brightness(${value})`;
        effectValue.value = value.toFixed(1);
      });
      break;
  }
}

function onEffectButton(evt) {
  if (evt.target.tagName === 'INPUT') {
    applyingEffects(evt.target);
  }
}

function addOnEffectButtonEvent() {
  listEffects.forEach((effectsItem) => {
    effectsItem.addEventListener('click', onEffectButton);
  });
}


function removeOnEffectButtonEvent() {
  listEffects.forEach((effectsItem) => {
    effectsItem.removeEventListener('click', onEffectButton);
  });
}

export {removeOnEffectButtonEvent, addOnEffectButtonEvent};

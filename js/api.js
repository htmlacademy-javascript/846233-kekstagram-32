const showError = (message) => {
  const errorTemplate = document.querySelector('#data-error').content.querySelector('.error');
  const errorElement = errorTemplate.cloneNode(true);
  errorElement.querySelector('.error__title').textContent = message;
  document.body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, 5000);
};

const getData = async (onSuccess, onFail) => {
  try {
    const response = await fetch('https://32.javascript.htmlacademy.pro/kekstagram/data');

    if (!response.ok) {
      throw new Error('Не удалось загрузить фотографии');
    }

    const offers = await response.json();
    onSuccess(offers);
  } catch (error) {
    showError('Не удалось загрузить фотографии. Попробуйте ещё раз');
    onFail(error.message);
  }
};

const sendData = async (onSuccess, onFail, body) => {
  try {
    const response = await fetch('https://32.javascript.htmlacademy.pro/kekstagram', {
      method: 'POST',
      body,
    });

    if (!response.ok) {
      throw new Error('Не удалось отправить форму. Попробуйте ещё раз');
    }

    onSuccess();
  } catch (error) {
    showError('Не удалось отправить форму. Попробуйте ещё раз');
    onFail(error.message);
  }
};

export { getData, sendData };

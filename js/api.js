const showError = (message) => {
  // Находим шаблон сообщения об ошибке
  const errorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
  // Создаем элемент сообщения из шаблона
  const errorElement = errorTemplate.cloneNode(true);
  // Устанавливаем текст сообщения
  errorElement.querySelector('.data-error__title').textContent = message;
  // Добавляем сообщение в body
  document.body.append(errorElement);

  // Удаляем сообщение через 5 секунд
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

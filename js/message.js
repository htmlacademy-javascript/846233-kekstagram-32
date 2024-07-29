// message.js

// Получаем шаблоны сообщений
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

// Функция для отображения сообщения
const showMessage = (template, onClose) => {
  const messageElement = template.cloneNode(true);
  document.body.append(messageElement);

  // Функция для удаления сообщения
  const removeMessage = () => {
    messageElement.remove();
    if (onClose) {
      onClose();
    }
  };

  // Обработчик нажатия клавиши Esc для закрытия сообщения
  const onMessageEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      removeMessage();
    }
  };

  // Обработчик клика вне сообщения для закрытия
  const onMessageOutsideClick = (evt) => {
    if (!evt.target.closest('.success__inner') && !evt.target.closest('.error__inner')) {
      removeMessage();
    }
  };

  // Добавляем обработчики событий
  messageElement.querySelector('.success__button, .error__button').addEventListener('click', removeMessage);
  document.addEventListener('keydown', onMessageEscKeyDown);
  document.addEventListener('click', onMessageOutsideClick);

  // Удаляем обработчики событий при закрытии
  const cleanup = () => {
    document.removeEventListener('keydown', onMessageEscKeyDown);
    document.removeEventListener('click', onMessageOutsideClick);
  };

  // Используем колбэк-функцию, чтобы обеспечить очистку
  messageElement.addEventListener('transitionend', cleanup);
};

// Функция для отображения сообщения об успешной отправке
const showSuccessMessage = () => {
  showMessage(successTemplate);
};

// Функция для отображения сообщения об ошибке
const showErrorMessage = () => {
  showMessage(errorTemplate);
};

export { showSuccessMessage, showErrorMessage };

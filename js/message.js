const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const showMessage = (template, onClose) => {
  const messageElement = template.cloneNode(true);
  document.body.append(messageElement);

  const removeMessage = () => {
    messageElement.remove();
    if (onClose) {
      onClose();
    }
  };

  const onMessageEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      removeMessage();
    }
  };

  const onMessageOutsideClick = (evt) => {
    if (!evt.target.closest('.success__inner') && !evt.target.closest('.error__inner')) {
      removeMessage();
    }
  };

  messageElement.querySelector('.success__button, .error__button').addEventListener('click', removeMessage);
  document.addEventListener('keydown', onMessageEscKeyDown);
  document.addEventListener('click', onMessageOutsideClick);

  const cleanup = () => {
    document.removeEventListener('keydown', onMessageEscKeyDown);
    document.removeEventListener('click', onMessageOutsideClick);
  };

  messageElement.addEventListener('transitionend', cleanup);
};

const showSuccessMessage = () => {
  showMessage(successTemplate);
};

const showErrorMessage = () => {
  showMessage(errorTemplate);
};

export { showSuccessMessage, showErrorMessage };

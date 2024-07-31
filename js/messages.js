import { isEscapeKey } from './util.js';
import { onEscKeydown } from './form.js';

const templateDataError = document.querySelector('#data-error')
  .content
  .querySelector('.data-error');

const templateErrorSendData = document.querySelector('#error')
  .content
  .querySelector('.error');

const templateSucceessSendData = document.querySelector('#success')
  .content
  .querySelector('.success');

const modalFragment = document.createDocumentFragment();
const modalError = templateErrorSendData.cloneNode(true);
const modalSuccess = templateSucceessSendData.cloneNode(true);

const ERROR_MODAL_TIME = 5000;

function getDataErrorMessage() {
  const errorModal = document.createDocumentFragment();
  const errorData = templateDataError.cloneNode(true);
  errorModal.appendChild(errorData);
  document.body.appendChild(errorModal);

  setTimeout(() => {
    errorData.remove();
  }, ERROR_MODAL_TIME);
}


function openErrorSendDataMessage() {
  modalFragment.appendChild(modalError);
  document.body.appendChild(modalFragment);
  const modalButton = document.querySelector('.error__button');
  document.removeEventListener('keydown', onEscKeydown);
  document.addEventListener('keydown', onEscKeydownError);
  modalButton.addEventListener('click', onErrorSendDataButton);
  document.addEventListener('click', onWindowClick);
}

function openSuccessSendDataMessage() {
  modalFragment.appendChild(modalSuccess);
  document.body.appendChild(modalFragment);
  const modalButton = document.querySelector('.success__button');
  modalButton.addEventListener('click', onSuccessSendDataButton);
  document.addEventListener('keydown', onEscKeydownSuccess);
  document.addEventListener('click', onWindowClick);
}

function onErrorSendDataButton() {
  const errorModal = document.querySelector('.error');
  errorModal.querySelector('.error__button').removeEventListener('click', onErrorSendDataButton);
  document.removeEventListener('keydown', onEscKeydownError);
  document.addEventListener('keydown', onEscKeydown);
  errorModal.remove();
}


function onSuccessSendDataButton() {
  const successModal = document.querySelector('.success');
  successModal.querySelector('.success__button').removeEventListener('click', onSuccessSendDataButton);
  document.removeEventListener('keydown', onEscKeydownSuccess);
  successModal.remove();
}

function onEscKeydownSuccess(evt) {
  if(isEscapeKey(evt)){
    const successModal = document.querySelector('.success');
    successModal.querySelector('.success__button').removeEventListener('click', onSuccessSendDataButton);
    document.removeEventListener('keydown', onEscKeydownSuccess);
    successModal.remove();
  }
}

function onEscKeydownError(evt) {
  if(isEscapeKey(evt)) {
    const errorModal = document.querySelector('.error');
    errorModal.querySelector('.error__button').removeEventListener('click', onErrorSendDataButton);
    document.removeEventListener('keydown', onEscKeydownError);
    document.addEventListener('keydown', onEscKeydown);
    errorModal.remove();
  }
}

function onWindowClick(evt) {
  const currentTarget = evt.target;
  if(currentTarget.classList.contains('success') && !currentTarget.classList.contains('success__inner')) {
    const successModal = document.querySelector('.success');
    successModal.querySelector('.success__button').removeEventListener('click', onSuccessSendDataButton);
    document.removeEventListener('keydown', onEscKeydownSuccess);
    document.removeEventListener('click', onWindowClick);
    successModal.remove();
  }
  if(currentTarget.classList.contains('error') && !currentTarget.classList.contains('error__inner')) {
    const errorModal = document.querySelector('.error');
    errorModal.querySelector('.error__button').removeEventListener('click', onErrorSendDataButton);
    document.removeEventListener('keydown', onEscKeydownError);
    document.addEventListener('keydown', onEscKeydown);
    document.removeEventListener('click', onWindowClick);
    errorModal.remove();
  }
}

export {getDataErrorMessage, openErrorSendDataMessage, openSuccessSendDataMessage};

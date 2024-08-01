import { isEscapeKey } from './util.js';
import { onEscKeydown } from './form.js';

const ERROR_MODAL_TIME = 5000;

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
  document.addEventListener('keydown', onErrorEscKeydown);
  modalButton.addEventListener('click', onErrorSendDataButtonClick);
  document.addEventListener('click', onWindowClick);
}

function openSuccessSendDataMessage() {
  modalFragment.appendChild(modalSuccess);
  document.body.appendChild(modalFragment);
  const modalButton = document.querySelector('.success__button');
  modalButton.addEventListener('click', onSuccessSendDataButtonClick);
  document.addEventListener('keydown', onSuccessEscKeydown);
  document.addEventListener('click', onWindowClick);
}

function onErrorSendDataButtonClick() {
  const errorModal = document.querySelector('.error');
  errorModal.querySelector('.error__button').removeEventListener('click', onErrorSendDataButtonClick);
  document.removeEventListener('keydown', onErrorEscKeydown);
  document.addEventListener('keydown', onEscKeydown);
  errorModal.remove();
}


function onSuccessSendDataButtonClick() {
  const successModal = document.querySelector('.success');
  successModal.querySelector('.success__button').removeEventListener('click', onSuccessSendDataButtonClick);
  document.removeEventListener('keydown', onSuccessEscKeydown);
  successModal.remove();
}

function onSuccessEscKeydown(evt) {
  if(isEscapeKey(evt)){
    const successModal = document.querySelector('.success');
    successModal.querySelector('.success__button').removeEventListener('click', onSuccessSendDataButtonClick);
    document.removeEventListener('keydown', onSuccessEscKeydown);
    successModal.remove();
  }
}

function onErrorEscKeydown(evt) {
  if(isEscapeKey(evt)) {
    const errorModal = document.querySelector('.error');
    errorModal.querySelector('.error__button').removeEventListener('click', onErrorSendDataButtonClick);
    document.removeEventListener('keydown', onErrorEscKeydown);
    document.addEventListener('keydown', onEscKeydown);
    errorModal.remove();
  }
}

function onWindowClick(evt) {
  const currentTarget = evt.target;
  if(currentTarget.classList.contains('success') && !currentTarget.classList.contains('success__inner')) {
    const successModal = document.querySelector('.success');
    successModal.querySelector('.success__button').removeEventListener('click', onSuccessSendDataButtonClick);
    document.removeEventListener('keydown', onSuccessEscKeydown);
    document.removeEventListener('click', onWindowClick);
    successModal.remove();
  }
  if(currentTarget.classList.contains('error') && !currentTarget.classList.contains('error__inner')) {
    const errorModal = document.querySelector('.error');
    errorModal.querySelector('.error__button').removeEventListener('click', onErrorSendDataButtonClick);
    document.removeEventListener('keydown', onErrorEscKeydown);
    document.addEventListener('keydown', onEscKeydown);
    document.removeEventListener('click', onWindowClick);
    errorModal.remove();
  }
}

export {getDataErrorMessage, openErrorSendDataMessage, openSuccessSendDataMessage};

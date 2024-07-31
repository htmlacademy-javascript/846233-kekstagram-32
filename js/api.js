import { getDataErrorMessage, openErrorSendDataMessage } from './messages.js';

const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const load = async(route, method = Method.GET, body = null) => {
  const response = await fetch(`${BASE_URL}${route}`, {method, body});
  return response.ok ? await response.json() : getError(method);
};

function getError(method) {
  if(method === Method.GET) {
    return Promise.reject(getDataErrorMessage());
  } else if(method === Method.POST) {
    return Promise.reject(openErrorSendDataMessage());
  }
}

const getData = async () => await load(Route.GET_DATA);

const sendData = async (body) => await load(Route.SEND_DATA, Method.POST, body);

export {getData, sendData};

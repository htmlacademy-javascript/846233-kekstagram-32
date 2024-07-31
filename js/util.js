const isEscapeKey = (evt) => evt.key === 'Escape';

function getDataElement (dataArray, datasetId) {
  let dataElement = '';
  for(let i = 0; dataArray.length > i; i++) {
    if(dataArray[i].id === datasetId){
      dataElement = dataArray[i];
      break;
    }
  }
  return dataElement;
}

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}


export {isEscapeKey, getDataElement, debounce};

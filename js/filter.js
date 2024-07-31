import { setPosts } from './create-filter-posts.js';
import { debounce } from './util.js';

const FILTERS = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed'
};

let currentFilter = FILTERS.default;
let pictures = [];

const filterElement = document.querySelector('.img-filters');
const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';

const debouncePosts = debounce(setPosts);

function filterConfig(dataArray) {
  if(dataArray) {
    filterElement.classList.remove('img-filters--inactive');
    filterElement.addEventListener('click', onFilterChange);
    pictures = dataArray;
  }
}

function onFilterChange(evt) {
  const targetButton = evt.target;
  const activeButton = document.querySelector(`.${ACTIVE_BUTTON_CLASS}`);

  if (!targetButton.matches('button')) {
    return;
  }

  if (activeButton === targetButton) {
    return;
  }

  activeButton.classList.toggle(ACTIVE_BUTTON_CLASS);
  targetButton.classList.toggle(ACTIVE_BUTTON_CLASS);
  currentFilter = targetButton.getAttribute('id');

  getCurrentFilter();
}

function getCurrentFilter() {
  let filteredPictures = [];

  switch(currentFilter) {
    case FILTERS.default:
      filteredPictures = pictures;
      break;

    case FILTERS.random:
      filteredPictures = getRandomPictures(pictures);
      break;

    case FILTERS.discussed:
      filteredPictures = getDiscussedPictures(pictures);
      break;
  }

  debouncePosts(filteredPictures);
}

function getRandomPictures(picturesArray) {
  return picturesArray.toSorted(() => 0.5 - Math.random()).slice(0, 10);
}

function getDiscussedPictures(picturesArray) {
  return picturesArray.toSorted((a, b) => b.comments.length - a.comments.length);
}


export {filterConfig};

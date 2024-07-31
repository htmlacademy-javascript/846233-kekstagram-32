const loadMoreCommentsButton = document.querySelector('.social__comments-loader');
const commentsShowCount = document.querySelector('.social__comment-shown-count');
const commentTotalCount = document.querySelector('.social__comment-total-count');

const COMMENT_SHOW_STEP = 5;

function addLoadMoreCommentsEvent() {
  loadMoreCommentsButton.addEventListener('click', onLoadMoreCommentsButton);
  if(commentsShowCount.textContent === commentTotalCount.textContent) {
    loadMoreCommentsButton.classList.add('hidden');
    loadMoreCommentsButton.removeEventListener('click', onLoadMoreCommentsButton);
  }else {
    loadMoreCommentsButton.classList.remove('hidden');
  }
}

function onLoadMoreCommentsButton() {
  const currentShownComments = document.querySelector('.social__comment-shown-count');
  const hiddenComments = document.querySelectorAll('.social__comment.hidden');
  if(hiddenComments.length <= COMMENT_SHOW_STEP) {
    currentShownComments.textContent = Number(currentShownComments.textContent) + hiddenComments.length;
    for(let i = 0; hiddenComments.length > i; i++) {
      hiddenComments[i].classList.remove('hidden');
      loadMoreCommentsButton.classList.add('hidden');
    }
  }else {
    currentShownComments.textContent = Number(currentShownComments.textContent) + COMMENT_SHOW_STEP;
    for(let i = 0; i < COMMENT_SHOW_STEP; i++) {
      hiddenComments[i].classList.remove('hidden');
    }
  }
  if(loadMoreCommentsButton.classList.contains('hidden')) {
    loadMoreCommentsButton.removeEventListener('click', onLoadMoreCommentsButton);
  }
}

export {addLoadMoreCommentsEvent, onLoadMoreCommentsButton};

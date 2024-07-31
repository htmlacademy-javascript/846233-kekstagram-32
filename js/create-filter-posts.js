import { createPostFragments } from './create-posts.js';

const picturesBlock = document.querySelector('.pictures');

function clearPosts() {
  picturesBlock.querySelectorAll('.picture').forEach((item) => item.remove());
}

function setPosts(dataArray) {
  let pictures = [];
  clearPosts();
  pictures = dataArray;
  createPostFragments(pictures);
}

export { setPosts };

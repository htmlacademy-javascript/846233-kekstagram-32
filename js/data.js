import { getData } from './api.js';
import { getDataErrorMessage } from './messages.js';
import { createPostFragments } from './create-posts.js';

async function createData() {
  try {
    const dataFiles = await getData();
    createPostFragments(dataFiles);
    return dataFiles;
  } catch {
    getDataErrorMessage();
  }
}

const imagesData = await createData();

export { imagesData };

import { getData } from './api.js';
import { getDataErrorMessage } from './messages.js';
import { createPostFragments } from './create-posts.js';

const imagesData = await createData();

async function createData() {
  try {
    const dataFiles = await getData();
    createPostFragments(dataFiles);
    return dataFiles;
  } catch {
    getDataErrorMessage();
  }
}

export { imagesData };

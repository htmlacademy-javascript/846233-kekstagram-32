import { getData } from './api.js';
import { getDataErrorMessage } from './messages.js';
import { createPostFragments } from './create-posts.js';

const createData = async () => {
  try {
    const dataFiles = await getData();
    createPostFragments(dataFiles);
    return dataFiles;
  } catch {
    getDataErrorMessage();
  }
};

const DATA = await createData();

export {DATA};

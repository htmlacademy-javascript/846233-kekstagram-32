import './form.js';
import { imagesData } from './data.js';
import { addBigPictureEvent } from './big-picture.js';
import { filterConfig } from './filter.js';
import './edit-effect-image.js';
import './edit-scale-image.js';

addBigPictureEvent();
filterConfig(imagesData);

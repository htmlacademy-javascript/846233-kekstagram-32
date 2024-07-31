import './form.js';
import { DATA } from './data.js';
import { addBigPictureEvent } from './big-picture.js';
import { filterConfig } from './filter.js';
import './edit-effect-image.js';
import './edit-scale-image.js';

addBigPictureEvent();
filterConfig(DATA);

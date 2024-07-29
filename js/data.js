import { getRandomInteger, getRandomElement } from './util.js';

const comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const description = [
  'Закат над океаном, золотистое солнце прячется за горизонт, оставляя небо окрашенным в розовые и оранжевые тона. #Закат #Океан #Природа #Романтика',
  'Симпатичный котенок, свернувшийся калачиком на пушистом ковре, наслаждается дневным сном. #Котенок #ДомашниеЖивотные #Милота #Сон',
  'Густой лес в тумане, деревья таинственно скрываются в дымке, создавая атмосферу мистики. #Лес #Туман #Природа #Мистика',
  'Живописное поле с яркими красными маками под ясным голубым небом.#ПолевыеЦветы #Мак #Природа #Красота',
  'Уличный художник рисует красочный мурал на стене старого здания в городском квартале. #УличноеИскусство #Граффити #Город #Творчество',
  'Две чашки кофе на столе в уютном кафе, вокруг которого мягкий свет и комфортная атмосфера. #Кофе #Кафе #Уют #Завтрак',
  'Стая птиц в полете на фоне закатного неба, образуя красивые узоры в воздухе. #Птицы #Закат #Небо #Свобода',
  'Крупный план сочного арбуза с капельками воды, только что нарезанного для летнего угощения. #Арбуз #Лето #Свежесть #Фрукты',
  'Старинный книжный магазин с высокими полками, заполненными редкими и антикварными книгами. #Книги #Антиквариат #КнижныйМагазин #Чтение',
  'Величественные горы, покрытые снегом, под ярким солнцем на фоне кристально голубого неба. #Горы #Зима #Снег #Пейзаж',
];

const names = ['Евгений', 'Роман', 'Иван', 'Алишер', 'Марк', 'Максим'];


const createMessage = () =>
  Array.from({ length: getRandomInteger(1, 2) }, () =>
    getRandomElement(comments)
  ).join(' ');

const createComment = (index) => ({
  id: index,
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: createMessage(),
  name: getRandomElement(names)
});

const createPicture = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomElement(description),
  likes: getRandomInteger(15, 200),
  comments: Array.from(
    { length: getRandomInteger(0, 6) },
    (_, commentIndex) => createComment(commentIndex + 1)
  ),
});


const getPictures = () =>
  Array.from({ length: 25 }, (_, pictureIndex) =>
    createPicture(pictureIndex + 1)
  );

export { getPictures };

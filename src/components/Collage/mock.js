import keys from 'lodash-es/keys';
import { Img } from 'helpers';

const images = {
  v1: {
    src: Img('v1.jpg'),
    aspectRatio: [1500, 2250],
  },
  v2: {
    src: Img('v2.jpg'),
    aspectRatio: [1500, 2250],
  },
  v3: {
    src: Img('v3.jpg'),
    aspectRatio: [750, 1125],
  },
  h1: {
    src: Img('h1.jpg'),
    aspectRatio: [1500, 999],
  },
  h2: {
    src: Img('h2.jpg'),
    aspectRatio: [994, 437],
  },
  h3: {
    src: Img('h3.jpg'),
    aspectRatio: [1500, 999],
  },
};

///////////////
//   ROW 1   //
///////////////

const row_1 = {
  row_1: {
    parent_id: null,
    type: 'row',
  },

  /////////////
  // column 1
  /////////////

  'row_1...col_1': {
    parent_id: 'row_1',
    type: 'col',
  },
  // column 1 image 1
  'row_1...col_1...img_1': {
    parent_id: 'row_1...col_1',
    type: 'img',
    ...images.v3,
  },
  // column 1 image 2
  'row_1...col_1...img_2': {
    parent_id: 'row_1...col_1',
    type: 'img',
    ...images.v2,
  },

  /////////////
  // column 2
  /////////////

  'row_1...col_2': {
    parent_id: 'row_1',
    type: 'col',
  },
  // column 2 image 1
  'row_1...col_2...img_1': {
    parent_id: 'row_1...col_2',
    type: 'img',
    ...images.h3,
  },
  // column 2 image 2
  'row_1...col_2...img_2': {
    parent_id: 'row_1...col_2',
    type: 'img',
    ...images.v1,
  },

  /////////////
  // column 3
  /////////////

  'row_1...col_3': {
    parent_id: 'row_1',
    type: 'col',
  },
  'row_1...col_3...row_1': {
    parent_id: 'row_1...col_3',
    type: 'row',
  },
  'row_1...col_3...row_1...col_1': {
    parent_id: 'row_1...col_3...row_1',
    type: 'col',
  },
  'row_1...col_3...row_1...col_1...img_1': {
    parent_id: 'row_1...col_3...row_1...col_1',
    type: 'img',
    ...images.h2,
  },
  'row_1...col_3...row_1...col_2': {
    parent_id: 'row_1...col_3...row_1',
    type: 'col',
  },
  'row_1...col_3...row_1...col_2...img_1': {
    parent_id: 'row_1...col_3...row_1...col_2',
    type: 'img',
    ...images.v3,
  },
  'row_1...col_3...row_1...col_3': {
    parent_id: 'row_1...col_3...row_1',
    type: 'col',
  },
  'row_1...col_3...row_1...col_3...img_1': {
    parent_id: 'row_1...col_3...row_1...col_3',
    type: 'img',
    ...images.v1,
  },
  'row_1...col_3...img_1': {
    parent_id: 'row_1...col_3',
    type: 'img',
    ...images.v2,
  },
};

///////////////
//   ROW 2   //
///////////////

const row_2 = {
  row_2: {
    parent_id: null,
    type: 'row',
  },

  /////////////
  // column 1
  /////////////

  'row_2...col_1': {
    parent_id: 'row_2',
    type: 'col',
  },
  'row_2...col_1...img_1': {
    parent_id: 'row_2...col_1',
    type: 'img',
    ...images.v1,
  },
  'row_2...col_1...img_2': {
    parent_id: 'row_2...col_1',
    type: 'img',
    ...images.h1,
  },

  /////////////
  // column 2
  /////////////

  'row_2...col_2': {
    parent_id: 'row_2',
    type: 'col',
  },
  // 'row_2...col_2...img_1': {
  //   parent_id: 'row_2...col_2',
  //   type: 'img',
  //   ...images.h2,
  // },
  'row_2...col_2...img_2': {
    parent_id: 'row_2...col_2',
    type: 'img',
    ...images.v2,
  },
};

////////////////
//  COMBINED  //
////////////////

let collageElements = {
  ...row_1,
  ...row_2,
};

////////////////
//  ADD IDS   //
////////////////

keys(collageElements).forEach(id => {
  collageElements[id] = {
    ...collageElements[id],
    id,
  };
});

export { collageElements };

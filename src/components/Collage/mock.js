import { Img } from 'helpers';

const collageElements = {
  // top level row (parent_id must be null)
  10: {
    id: 10,
    parent_id: null,
    type: 'row',
  },
  20: {
    id: 20,
    parent_id: null,
    type: 'row',
  },

  // nested row  (parent_id must be col)
  21: {
    id: 21,
    parent_id: 40,
    type: 'row',
  },
  22: {
    id: 22,
    parent_id: 50,
    type: 'row',
  },

  // col (parent_id must be a row)
  40: {
    id: 40,
    parent_id: 10,
    type: 'col',
  },
  // RIGHT COLUMN
  50: {
    id: 50,
    parent_id: 10,
    type: 'col',
  },
  60: {
    id: 60,
    parent_id: 20,
    type: 'col',
  },

  61: {
    id: 61,
    parent_id: 21,
    type: 'col',
  },
  62: {
    id: 62,
    parent_id: 21,
    type: 'col',
  },
  63: {
    id: 63,
    parent_id: 22,
    type: 'col',
  },
  64: {
    id: 64,
    parent_id: 22,
    type: 'col',
  },
  65: {
    id: 65,
    parent_id: 21,
    type: 'col',
  },

  // img (parent_id must be a col)
  70: {
    id: 70,
    parent_id: 40,
    type: 'img',
    src: Img('v2.jpg'),
    aspectRatio: [1500, 2250],
  },
  80: {
    id: 80,
    parent_id: 40,
    type: 'img',
    src: Img('h2.jpg'),
    aspectRatio: [1000, 666],
  },
  90: {
    id: 90,
    parent_id: 50,
    type: 'img',
    src: Img('v1.jpg'),
    aspectRatio: [1500, 2250],
  },
  100: {
    id: 100,
    parent_id: 60,
    type: 'img',
    src: Img('h3.jpg'),
    aspectRatio: [1500, 999],
  },

  101: {
    id: 101,
    parent_id: 61,
    type: 'img',
    src: Img('h1.jpg'),
    aspectRatio: [1500, 999],
  },

  102: {
    id: 102,
    parent_id: 62,
    type: 'img',
    src: Img('h2.jpg'),
    aspectRatio: [1000, 666],
  },

  103: {
    id: 103,
    parent_id: 63,
    type: 'img',
    src: Img('v2.jpg'),
    aspectRatio: [1500, 2250],
  },

  104: {
    id: 104,
    parent_id: 64,
    type: 'img',
    src: Img('h3.jpg'),
    aspectRatio: [1500, 999],
  },

  105: {
    id: 105,
    parent_id: 65,
    type: 'img',
    src: Img('v1.jpg'),
    aspectRatio: [1500, 2250],
  },
};

export { collageElements };

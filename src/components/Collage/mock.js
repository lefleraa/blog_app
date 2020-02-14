// import { concat } from 'lodash-es';

// const marginRow = {
//   top: 0,
//   left: 0,
//   right: 0,
//   bottom: 30,
// };

const collageElements = {
  // top level row (parent_id must be null)
  10: {
    parent_id: null,
    type: 'row',
  },
  20: {
    parent_id: null,
    type: 'row',
  },

  // nested row  (parent_id must be col)
  21: {
    parent_id: 40,
    type: 'row',
  },
  22: {
    parent_id: 50,
    type: 'row',
  },
  23: {
    parent_id: 60,
    type: 'row',
  },

  // col (parent_id must be a row)
  40: {
    parent_id: 10,
    type: 'col',
  },
  50: {
    parent_id: 10,
    type: 'col',
  },
  60: {
    parent_id: 20,
    type: 'col',
  },

  61: {
    parent_id: 21,
    type: 'col',
  },
  62: {
    parent_id: 21,
    type: 'col',
  },
  63: {
    parent_id: 22,
    type: 'col',
  },
  64: {
    parent_id: 22,
    type: 'col',
  },

  // img (parent_id must be a col)
  70: {
    parent_id: 40,
    type: 'img',
    src:
      'https://content1.getnarrativeapp.com/static/77f33015-d1b5-478f-8667-86c04c42ec7b/ali-matt-new-hampshire-backyard-wedding-741.jpg?w=1500',
  },
  80: {
    parent_id: 40,
    type: 'img',
    src:
      'https://content1.getnarrativeapp.com/static/163fbbdc-b114-479b-acf0-3b86acf6a6f4/Mitch-Savanna-51.jpg?w=1500',
  },
  90: {
    parent_id: 50,
    type: 'img',
    src:
      'https://content1.getnarrativeapp.com/static/6cc8e8c1-8d8c-4e20-952f-a4dd2ba18864/ali-matt-new-hampshire-backyard-wedding-289.jpg?w=1500',
  },
  100: {
    parent_id: 60,
    type: 'img',
    src:
      'https://content1.getnarrativeapp.com/static/2331dbd5-9fd4-4412-85b9-10147db96dbd/iceland-2019-24.jpg?w=1000',
  },

  101: {
    parent_id: 61,
    type: 'img',
    src:
      'https://content1.getnarrativeapp.com/static/2331dbd5-9fd4-4412-85b9-10147db96dbd/iceland-2019-24.jpg?w=1000',
  },

  102: {
    parent_id: 62,
    type: 'img',
    src:
      'https://content1.getnarrativeapp.com/static/14f62c9e-60c9-4de9-8ddb-03c69f68323c/DSCF1236.jpg?w=1500',
  },

  103: {
    parent_id: 63,
    type: 'img',
    src:
      'https://content1.getnarrativeapp.com/static/76caebbe-58c8-4809-a395-349035bb98cd/Jess-John-Valley-of-Fire-Zion-Elopement-71.jpg?w=750',
  },

  104: {
    parent_id: 64,
    type: 'img',
    src:
      'https://content1.getnarrativeapp.com/static/74680269-c818-41fa-897c-f83c89501249/Micah-Ellen-Wedding-355.jpg?w=1000',
  },
};

export { collageElements };

import { concat } from 'lodash-es';

const photoArray = [
  {
    label: 'primary',
    used: true,
    src:
      'https://content1.getnarrativeapp.com/static/77f33015-d1b5-478f-8667-86c04c42ec7b/ali-matt-new-hampshire-backyard-wedding-741.jpg?w=1500',
  },
  {
    active: true,
    label: 'tertiary',
    src:
      'https://content1.getnarrativeapp.com/static/14f62c9e-60c9-4de9-8ddb-03c69f68323c/DSCF1236.jpg?w=1500',
  },
  {
    label: 'primary',
    src:
      'https://content1.getnarrativeapp.com/static/83aabd2c-751c-4ba9-b2c1-6e600272a106/Micah-Ellen-Wedding-193.jpg?w=1500',
  },
  {
    label: 'primary',
    src:
      'https://content1.getnarrativeapp.com/static/7df51e09-074a-482f-8730-11b22fe3d519/iceland-2019-36.jpg?w=1000',
  },
  {
    label: 'tertiary',
    src:
      'https://content1.getnarrativeapp.com/static/2331dbd5-9fd4-4412-85b9-10147db96dbd/iceland-2019-24.jpg?w=1000',
  },
  {
    label: 'tertiary',
    used: true,
    src:
      'https://content1.getnarrativeapp.com/static/43d2089f-c24c-4ea9-9a9a-5bf812374022/Mandi-Chris-Engagement-114.jpg?w=750',
  },
  {
    label: 'tertiary',
    src:
      'https://content1.getnarrativeapp.com/static/df498be7-b836-4fa3-80a4-ecf554ef7920/Ben-Mads-RoanMountain-Home-Session-20.jpg?w=1500',
  },
  {
    label: 'quat',
    used: true,
    src:
      'https://content1.getnarrativeapp.com/static/77f33015-d1b5-478f-8667-86c04c42ec7b/ali-matt-new-hampshire-backyard-wedding-741.jpg?w=1500',
  },
  {
    label: 'quin',
    used: true,
    src:
      'https://content1.getnarrativeapp.com/static/8164d98c-5cf1-476b-8254-7c7f0a3acec5/Mandi-Chris-Engagement-56.jpg?w=750',
  },
  {
    used: true,
    src:
      'https://content1.getnarrativeapp.com/static/14f62c9e-60c9-4de9-8ddb-03c69f68323c/DSCF1236.jpg?w=1500',
  },
  {
    src:
      'https://content1.getnarrativeapp.com/static/83aabd2c-751c-4ba9-b2c1-6e600272a106/Micah-Ellen-Wedding-193.jpg?w=1500',
  },
  {
    src:
      'https://content1.getnarrativeapp.com/static/7df51e09-074a-482f-8730-11b22fe3d519/iceland-2019-36.jpg?w=1000',
  },
  {
    used: true,
    src:
      'https://content1.getnarrativeapp.com/static/8164d98c-5cf1-476b-8254-7c7f0a3acec5/Mandi-Chris-Engagement-56.jpg?w=750',
  },
  {
    used: true,
    src:
      'https://content1.getnarrativeapp.com/static/43d2089f-c24c-4ea9-9a9a-5bf812374022/Mandi-Chris-Engagement-114.jpg?w=750',
  },
  {
    src:
      'https://content1.getnarrativeapp.com/static/2331dbd5-9fd4-4412-85b9-10147db96dbd/iceland-2019-24.jpg?w=1000',
  },
  {
    src:
      'https://content1.getnarrativeapp.com/static/df498be7-b836-4fa3-80a4-ecf554ef7920/Ben-Mads-RoanMountain-Home-Session-20.jpg?w=1500',
  },
];

let stressPhotoArray = [];

for (let i = 0; i < 30; i++) {
  stressPhotoArray = concat(stressPhotoArray, photoArray);
}

export { photoArray, stressPhotoArray };

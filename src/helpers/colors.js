import { concat } from 'lodash-es';

const coreColorArray = [
  'product',
  'product-dark',
  'product-darker',
  'primary',
  'primary-dark',
  'primary-darker',
  'secondary',
  'secondary-dark',
  'secondary-darker',
  'tertiary',
  'tertiary-dark',
  'tertiary-darker',
  'quat',
  'quat-dark',
  'quat-darker',
  'quin',
  'quin-dark',
  'quin-darker',
  'success',
];

const feedbackColorArray = ['error', 'confirm', 'success', 'warning'];

const extendedColorArray = concat(coreColorArray, feedbackColorArray, [
  'gray-darkest',
  'gray-darker',
  'gray-dark',
  'gray',
  'gray-light',
  'gray-lighter',
  'gray-lightest',
  'white',
]);

const btnColorArray = concat(coreColorArray, ['subtle', 'default']);

const abbreviatedColorArray = [
  'product',
  'primary',
  'secondary',
  'tertiary',
  'quat',
  'quin',
];

export {
  coreColorArray,
  extendedColorArray,
  btnColorArray,
  abbreviatedColorArray,
  feedbackColorArray,
};

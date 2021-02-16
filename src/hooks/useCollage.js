import cloneDeep from 'lodash-es/cloneDeep';
import keys from 'lodash-es/keys';
import groupBy from 'lodash-es/groupBy';
import sumBy from 'lodash-es/sumBy';
import {
  directionalSumOfDimensions,
  isValidAspectRatio,
  getRatio,
} from 'helpers';

const collectAspectRatio = ({ item, childrenLookup }) => {
  if (!item) {
    console.warn('collectAspectRatio: No item provided.');
    return;
  }

  if (!childrenLookup || !keys(childrenLookup).length) {
    console.error('collectAspectRatio: Failed to access children.');
    return;
  }

  const children = childrenLookup[item.id];
  const itemHasChildren = !!(children && children.length);

  if (!itemHasChildren) {
    console.warn('collectAspectRatio: Skipping because item has no children.');
    return;
  }

  if (isValidAspectRatio(item.dimensions)) {
    console.warn(
      'collectAspectRatio: Skipping because item already has dimensions.'
    );
  } else {
    const ratios = children.map(child =>
      isValidAspectRatio(child.dimensions)
        ? child.dimensions
        : collectAspectRatio({ item: child, childrenLookup })
    );
    item.dimensions = directionalSumOfDimensions({
      arr: ratios,
      type: item.type,
    });
  }

  return item.dimensions;
};

const normalizeRatios = ({ collageArray = [], childrenLookup }) => {
  collageArray.forEach(item => {
    const children = childrenLookup[item.id];
    if (!children) {
      return;
    }
    let totalWidthBasis = sumBy(children, child => getRatio(child.dimensions));
    if (!totalWidthBasis) {
      return;
    }
    children.forEach(child => {
      if (isValidAspectRatio(child.dimensions)) {
        child.widthRatio = getRatio(child.dimensions) * (1 / totalWidthBasis);
      }
    });
  });
};

export const useCollage = ({ items, bypass = false }) => {
  if (!items) {
    return;
  }

  if (bypass) {
    return { collage: items };
  }

  let collage = cloneDeep(items);
  let collageIds = keys(collage);
  let collageArray = collageIds.map(id => collage[id]);

  collageArray.forEach(item => {
    item.dimensions = collectAspectRatio({
      item,
      childrenLookup: groupBy(collageArray, 'parent_id'),
    });
  });

  normalizeRatios({
    collageArray,
    childrenLookup: groupBy(collageArray, 'parent_id'),
  });

  return { collage };
};

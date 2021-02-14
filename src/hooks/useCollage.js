import cloneDeep from 'lodash-es/cloneDeep';
import keys from 'lodash-es/keys';
import compact from 'lodash-es/compact';
import groupBy from 'lodash-es/groupBy';
import { sumArrayOfFractions, isValidAspectRatio } from 'helpers';

const collectAspectRatio = ({ item, childrenLookup }) => {
  if (!item) {
    console.warn('collectAspectRatio: No item provided.');
    return;
  }

  if (!childrenLookup || !keys(childrenLookup).length) {
    console.warn('collectAspectRatio: Failed to access children.');
    return;
  }

  const children = childrenLookup[item.id];
  const itemHasChildren = !!(children && children.length);

  if (!itemHasChildren) {
    console.warn('collectAspectRatio: Skipping because item has no children.');
    return;
  }

  if (isValidAspectRatio(item.aspectRatio)) {
    console.warn(
      'collectAspectRatio: Skipping because item already has aspectRatio.'
    );
    return item.aspectRatio;
  }

  let ratios = [];

  children.forEach(child => {
    ratios.push(
      isValidAspectRatio(child.aspectRatio)
        ? child.aspectRatio
        : collectAspectRatio({ item: child, childrenLookup })
    );
  });

  if (ratios.length) {
    item.aspectRatio = sumArrayOfFractions(ratios);
  }
  return item.aspectRatio;
};

export function useCollage(passedElements, bypass) {
  let collage = cloneDeep(passedElements);
  if (bypass) {
    return { collage };
  }

  let collageIds = keys(collage);
  let collageArray = compact(collageIds.map(id => collage[id]));

  collageArray.map(item =>
    collectAspectRatio({
      item,
      childrenLookup: groupBy(collageArray, 'parent_id'),
    })
  );

  return {
    collage,
    collageArray,
  };
}

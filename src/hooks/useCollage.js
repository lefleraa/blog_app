import cloneDeep from 'lodash-es/cloneDeep';
import keys from 'lodash-es/keys';
import groupBy from 'lodash-es/groupBy';
import { directionalSumOfDimensions, isValidAspectRatio } from 'helpers';

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

  if (isValidAspectRatio(item.aspectRatio)) {
    console.warn(
      'collectAspectRatio: Skipping because item already has aspectRatio.'
    );
  } else {
    const ratios = children.map(child =>
      isValidAspectRatio(child.aspectRatio)
        ? child.aspectRatio
        : collectAspectRatio({ item: child, childrenLookup })
    );
    item.aspectRatio = directionalSumOfDimensions({
      arr: ratios,
      type: item.type,
    });
  }

  return item.aspectRatio;
};

export const useCollage = (passedElements, bypass) => {
  if (bypass) {
    return { collage: passedElements };
  }

  let collage = cloneDeep(passedElements);
  let collageIds = keys(collage);
  let collageArray = collageIds.map(id => collage[id]);

  collageArray.forEach(item => {
    item.aspectRatio = collectAspectRatio({
      item,
      childrenLookup: groupBy(collageArray, 'parent_id'),
    });
  });

  return { collage };
};

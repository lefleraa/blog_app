import { clone, keys, compact, groupBy, filter, max } from 'lodash-es';
import lcm from 'compute-lcm';

function getCommonRatios(images) {
  let denominators = images.map(image => image.aspectRatio[1]);
  let leastCommonDenominator = lcm(denominators) || denominators[1];
  let numerators = images.map(
    image =>
      (image.aspectRatio[0] * leastCommonDenominator) / image.aspectRatio[1]
  );
  return {
    numerators,
    denominators: images.map(() => leastCommonDenominator),
  };
}

export function setElementSizing(elements) {
  let clonedElements = clone(elements);

  // Find and group all rows by using unique
  // column parent ids.
  let rows = groupBy(
    compact(
      keys(clonedElements).map(id => {
        const element = clonedElements[id];
        if (element.type === 'col') {
          element.id = id;
          return element;
        }
      })
    ),
    'parent_id'
  );

  console.log('================');
  console.log('================');
  console.log('================');
  console.log('================');
  console.log('================');
  console.log('================');
  console.log('================');
  console.log('================');
  console.log('================');
  console.log('================');

  // Loop through all the unique rows.
  keys(rows).forEach(id => {
    const row = rows[id];

    console.log('================');
    console.log('================');
    console.log('ROW :::::::::: row: ', row);

    // Loop through all cols in this row.
    row.forEach(col => {
      console.log('================');
      console.log('COL :::::::::: col: ', col);

      // Find each image or stack of images in each
      // col in this row.
      const images = filter(
        keys(elements).map(id => {
          return elements[id];
        }),
        el => {
          return Number(el.parent_id) === Number(col.id) && el.type === 'img';
        }
      );

      // Set total column aspect ratio
      const { numerators, denominators } = getCommonRatios(images);
      col.aspectRatio = [
        // add up numerators
        numerators.reduce((a, b) => a + b, 0),
        // add up denominators
        denominators.reduce((a, b) => a + b, 0),
      ];
    });
  });

  return clonedElements;
}

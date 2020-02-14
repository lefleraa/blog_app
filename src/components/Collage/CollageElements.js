import React from 'react';
import { keys, compact, clone } from 'lodash-es';
import { element } from 'prop-types';

///////////////////////////////////////////////
// COLLAGE ELEMENTS
///////////////////////////////////////////////

const CollageImg = ({ imgSrc, zoom }) => {
  return (
    <div className="Collage--ImgWrap">
      <img className="Collage--Img" src={imgSrc} alt="" />
    </div>
  );
};

const CollageCol = ({ width, children, zoom }) => {
  return (
    <div className="Collage--Col" style={{ width }}>
      {children}
    </div>
  );
};

const CollageRow = ({ children, zoom }) => {
  return (
    <div className="Collage--Row">
      <div className="Collage--Row--Inner">{children}</div>
      <div
        className="Collage--Row--Margin"
        style={{ height: 20 * zoom.level }}
      ></div>
    </div>
  );
};

const CollageLockup = ({ elements, parent = {}, zoom }) => {
  if (!elements || !keys(elements).length) {
    return null;
  }

  let reducedElements = clone(elements);

  function getChildElements() {
    let result = keys(elements).map(id => {
      const element = clone(elements[id]);
      if (!parent.id) {
        if (!element.parent_id) {
          delete reducedElements[id];
          return {
            id,
            ...element,
          };
        }
      } else {
        if (Number(element.parent_id) === Number(parent.id)) {
          delete reducedElements[id];
          return {
            id,
            ...element,
          };
        }
      }
    });
    return {
      result: compact(result),
      remainingElements: reducedElements,
    };
  }

  const { result, remainingElements } = getChildElements();

  return !!(result && result.length)
    ? result.map(element => {
        const { type } = element;

        let Element;
        switch (type) {
          case 'row':
            Element = CollageRow;
            break;
          case 'col':
            Element = CollageCol;
            break;
          case 'img':
            Element = CollageImg;
            break;
          default:
            Element = null;
        }

        return (
          <Element key={element.id} imgSrc={element.src} zoom={zoom}>
            <CollageLockup
              elements={remainingElements}
              parent={element}
              zoom={zoom}
            />
          </Element>
        );
      })
    : null;
};

export { CollageLockup, CollageImg, CollageCol, CollageRow };

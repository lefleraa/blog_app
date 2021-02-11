import React from 'react';
import classNames from 'classnames';
import { keys, compact, clone } from 'lodash-es';

///////////////////////////////////////////////
// COLLAGE ELEMENTS
///////////////////////////////////////////////

const CollageImg = ({ src, zoom, spacing, ...rest }) => {
  return (
    <div
      className={classNames(
        'Collage--ImgWrap',
        rest.active && 'u-border-3 u-border-color-primary'
      )}
      style={{
        marginTop: spacing,
        marginBottom: spacing,
      }}
    >
      <img className="Collage--Img" src={src} alt="" />
    </div>
  );
};

const CollageCol = ({ id, children, zoom, spacing, ...rest }) => {
  return (
    <div
      className={classNames(
        'Collage--Col',
        rest.active && 'u-border-3 u-border-color-primary'
      )}
      style={{
        paddingLeft: spacing,
        paddingRight: spacing,
      }}
    >
      {children}
    </div>
  );
};

const CollageRow = ({ children, zoom, spacing, ...rest }) => {
  return (
    <div
      className={classNames(
        'Collage--Row',
        rest.active && 'u-border-3 u-border-color-primary'
      )}
      style={{
        marginRight: -spacing,
        marginLeft: -spacing,
      }}
    >
      {children}
    </div>
  );
};

const CollageLockup = ({ elements, parent = {}, zoom, spacing }) => {
  if (!elements || !keys(elements).length) {
    return null;
  }

  let reducedElements = clone(elements);

  const getChildElements = () => {
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
  };

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
          <Element key={element.id} {...element} zoom={zoom} spacing={spacing}>
            <CollageLockup
              elements={remainingElements}
              parent={element}
              zoom={zoom}
              spacing={spacing}
            />
          </Element>
        );
      })
    : null;
};

export { CollageLockup, CollageImg, CollageCol, CollageRow };

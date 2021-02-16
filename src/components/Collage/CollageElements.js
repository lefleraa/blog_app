import React from 'react';
import classNames from 'classnames';
import clone from 'lodash-es/clone';
import keys from 'lodash-es/keys';
import compact from 'lodash-es/compact';
import round from 'lodash-es/round';

let borderWidth = 1;

///////////////////////////////////////////////
// LAYOUT DEBUG
///////////////////////////////////////////////

const DebugBadge = ({ element = {}, depth }) => {
  const { type, widthRatio } = element;

  if (!widthRatio) {
    return null;
  }

  if (type === 'row') {
    return null;
  }

  let debugColor;
  switch (type) {
    case 'col':
      debugColor = 'blue';
      break;
    case 'img':
      debugColor = 'green';
      break;
    default:
      debugColor = 'gray';
  }

  return (
    <div
      className="small u-pos-absolute u-color-white u-z-index-10 u-border-radius-3 u-nowrap"
      style={{
        background: debugColor,
        top: -5,
        left: 0,
        marginLeft: 5 * (depth - 1),
        marginTop: 10 * (depth - 1),
        padding: '0px 3px',
      }}
    >
      <span className="small u-text-bold">{round(widthRatio, 3)}</span>
    </div>
  );
};

///////////////////////////////////////////////
// COLLAGE ELEMENTS
///////////////////////////////////////////////

const CollageImg = ({
  element = {},
  metaData = {},
  className,
  children,
  style,
}) => {
  const { src, id } = element;
  return (
    <div
      id={`${id}_CollageImg`}
      className={classNames('Collage--ImgWrap', className)}
      style={{
        ...style,
      }}
    >
      <img className="Collage--Img" src={src} alt="" />
      {children}
    </div>
  );
};

const CollageCol = ({
  element = {},
  metaData = {},
  className,
  children,
  style,
}) => {
  const { id, widthRatio } = element;
  return (
    <div
      id={`${id}_CollageCol`}
      className={classNames('Collage--Col', className)}
      style={{
        ...style,
        width: widthRatio ? `${widthRatio * 100}%` : '100%',
      }}
    >
      {children}
    </div>
  );
};

const CollageRow = ({
  element = {},
  metaData = {},
  className,
  children,
  style,
}) => {
  const { id } = element;
  return (
    <div
      id={`${id}_CollageRow`}
      className={classNames('Collage--Row', className)}
      style={{
        ...style,
      }}
    >
      {children}
    </div>
  );
};

///////////////////////////////////////////////
// COLLECT CHILDREN
///////////////////////////////////////////////

const getChildElements = (elements, parent) => {
  let remainingElements = clone(elements);
  let children = keys(elements).map(id => {
    const element = elements[id];

    if (!parent.id) {
      if (!element.parent_id) {
        delete remainingElements[id];
        return {
          id,
          ...element,
        };
      }
    } else {
      if (element.parent_id === parent.id) {
        delete remainingElements[id];
        return {
          id,
          ...element,
        };
      }
    }
  });

  return {
    children: compact(children),
    remainingElements,
  };
};

///////////////////////////////////////////////
// COLLAGE RECURSIVE ELEMENT BUILDING
///////////////////////////////////////////////

const CollageLockup = ({ collage, parent = {}, zoom, spacing, depth = 0 }) => {
  if (!collage || !keys(collage).length) {
    return null;
  }

  const { children, remainingElements } = getChildElements(collage, parent);

  if (!children || !children.length) {
    return null;
  }

  return children.map(element => {
    const { id, type } = element;

    let debug = true;

    const metaData = {
      spacing,
      depth: depth + 1,
      zoom,
    };

    let Element;
    let debugStyle;
    switch (type) {
      case 'row':
        Element = CollageRow;
        debugStyle = { border: `${borderWidth}px solid red` };
        break;
      case 'col':
        Element = CollageCol;
        debugStyle = { border: `${borderWidth}px solid blue` };
        break;
      case 'img':
        Element = CollageImg;
        debugStyle = { border: `${borderWidth}px solid green` };
        break;
      default:
        Element = null;
        debugStyle = { border: `${borderWidth}px solid gray` };
    }

    return (
      <Element
        key={id}
        element={element}
        metaData={metaData}
        // style={!!debug ? debugStyle : undefined}
      >
        <CollageLockup
          collage={remainingElements}
          parent={element}
          {...metaData}
        />
        {!!debug && <DebugBadge element={element} {...metaData} />}
      </Element>
    );
  });
};

export { CollageLockup, CollageImg, CollageCol, CollageRow };

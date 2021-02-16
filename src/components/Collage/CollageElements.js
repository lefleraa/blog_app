import React from 'react';
import classNames from 'classnames';
import { keys, compact, clone } from 'lodash-es';
import { getRatio, isValidAspectRatio } from 'helpers';

let borderWidth = 1;

const calculateFlexStyles = aspectRatio => {
  let flexGrow = 1;
  if (isValidAspectRatio(aspectRatio)) {
    flexGrow = getRatio(aspectRatio) * 10;
  }
  return {
    flexGrow,
    flexBasis: 0,
  };
};

const DebugBadge = ({ element = {}, depth }) => {
  const { type, aspectRatio = [] } = element;

  if (!isValidAspectRatio(aspectRatio)) {
    return null;
  }

  let debugColor = 'gray';
  switch (type) {
    case 'row':
      Element = CollageRow;
      debugColor = 'red';
      break;
    case 'col':
      Element = CollageCol;
      debugColor = 'blue';
      break;
    case 'img':
      Element = CollageImg;
      debugColor = 'green';
      break;
    default:
      Element = null;
  }

  return (
    <div
      className="small u-pos-absolute u-color-white u-z-index-10 u-border-radius-3 u-nowrap"
      style={{
        background: debugColor,
        top: 0,
        left: 0,
        marginLeft: 3 * depth,
        marginTop: 20 * depth,
        padding: '0px 3px',
      }}
    >
      <span className="small u-text-bold">
        {getRatio(aspectRatio).toFixed(2)}
        {/* : [{aspectRatio[0]}, {aspectRatio[1]}] */}
      </span>
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
  const { spacing } = metaData;
  return (
    <div
      id={`${id}_CollageImg`}
      className={classNames('Collage--ImgWrap', className)}
      style={{
        ...style,
        marginTop: spacing,
        marginBottom: spacing,
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
  const { id, aspectRatio } = element;
  const { spacing } = metaData;
  return (
    <div
      id={`${id}_CollageCol`}
      className={classNames('Collage--Col', className)}
      style={{
        ...style,
        ...calculateFlexStyles(aspectRatio),
        paddingLeft: spacing,
        paddingRight: spacing,
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
  const { spacing } = metaData;
  return (
    <div
      id={`${id}_CollageRow`}
      className={classNames('Collage--Row', className)}
      style={{
        ...style,
        marginRight: -spacing,
        marginLeft: -spacing,
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

    let debug = false;

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
        style={!!debug ? debugStyle : undefined}
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

import React from 'react';
import classNames from 'classnames';
import { keys, compact, clone } from 'lodash-es';
import { getRatio } from 'helpers';

let borderWidth = 1;

const calculateFlexStyles = (aspectRatio = []) => {
  const flexGrow = getRatio(aspectRatio);
  if (!flexGrow) {
    return;
  }
  return {
    flexGrow,
    flexBasis: 0,
  };
};

const DebugBadge = ({ element = {}, spacing, depth, debug }) => {
  if (!debug) {
    return null;
  }
  const { type, id, aspectRatio = [] } = element;
  let debugColor = 'gray';
  let offset = spacing * (depth + 1);
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
      offset = offset - spacing / 2;
      break;
    default:
      Element = null;
  }

  return (
    <div
      className="small u-pos-absolute u-color-white u-z-index-10 u-border-radius-3 u-nowrap"
      style={{
        background: debugColor,
        top: offset,
        left: offset,
        marginTop: offset + 10 * depth,
        padding: '0px 3px',
      }}
    >
      {id}: {getRatio(aspectRatio).toFixed(2)}
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
    const element = clone(elements[id]);

    if (!parent.id) {
      if (!element.parent_id) {
        delete remainingElements[id];
        return {
          id,
          ...element,
        };
      }
    } else {
      if (Number(element.parent_id) === Number(parent.id)) {
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
    const { id, type, aspectRatio } = element;

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

    const metaData = {
      spacing,
      depth: depth + 1,
      zoom,
      debug: false,
    };

    if (metaData.debug) {
      let depthCarets = '';
      for (let i = 0; i <= depth; i++) {
        depthCarets = depthCarets + '>>>';
      }
      console.log(depthCarets, `${type} ${id}`, aspectRatio);
    }

    return (
      <Element
        key={id}
        element={element}
        metaData={metaData}
        style={!!metaData.debug ? debugStyle : undefined}
      >
        <CollageLockup
          collage={remainingElements}
          parent={element}
          {...metaData}
        />
        <DebugBadge element={element} {...metaData} />
      </Element>
    );
  });
};

export { CollageLockup, CollageImg, CollageCol, CollageRow };

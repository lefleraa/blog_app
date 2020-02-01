import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { extendedColorArray } from 'helpers/colors';

const FontAwesomeIcon = ({
  icon,
  size,
  border,
  className,
  fixedWidth,
  fw,
  inverse,
  flip,
  listItem,
  pull,
  pulse,
  rotation,
  spin,
  title,
  transform,
  color,
  shrink,
  layer,
  ...props
}) => {
  let library = 'fal';
  let iconName = '';
  if (Array.isArray(icon)) {
    library = icon[0] ? icon[0] : 'fas';
    iconName = 'fa-' + icon[1];
  } else if (typeof icon === 'string') {
    iconName = 'fa-' + icon;
  }
  if (transform) {
    console.warn(
      'WIP - Icon Component:',
      'The transform property is not fully functional. If you are attempting to rotate, please use rotation property (90, 180, 270) instead.'
    );
  }
  const classes = classNames('u-icon', library, iconName, className, {
    'fa-spin': spin,
    'fa-pulse': pulse,
    'fa-fw': fixedWidth || fw,
    'fa-inverse': inverse,
    'fa-border': border,
    'fa-li': listItem,
    'fa-flip-horizontal': flip === 'horizontal' || flip === 'both',
    'fa-flip-vertical': flip === 'vertical' || flip === 'both',
    [`fa-${size}`]: size !== null,
    [`fa-rotate-${rotation}`]: rotation !== null,
    [`fa-pull-${pull}`]: pull !== null,
    [`shrink-${shrink}`]: shrink,
    [`u-color-${color}`]: color,
    [`fa-${transform}`]: transform,
    [`fa-stack-${layer === 1 ? '2x' : '1x'}`]: layer,
  });
  const propsToPass = {};
  propsToPass.className = classes;
  propsToPass['aria-labelledby'] = title;
  propsToPass['aria-hidden'] =
    typeof props['aria-hidden'] !== 'undefined' ? props['aria-hidden'] : true;
  return <span {...propsToPass} />;
};

const fa_library_list = ['fal', 'far', 'fas', 'fab', 'fa'];
const validateIcon = (
  propValue,
  key,
  componentName,
  location,
  propFullName
) => {
  let errorMessage = '';
  function addToMessage(msg) {
    if (errorMessage) {
      errorMessage = errorMessage + '\n' + msg;
    } else {
      errorMessage = msg;
    }
  }
  propValue.forEach((value, index) => {
    /* Check to make sure values in array are strings. */
    if (typeof value !== 'string') {
      addToMessage(
        `Invalid prop ${propFullName} supplied to ${componentName}. Property value must be a string.`
      );
    }
    /* Check to make sure first item is a library string we support. */
    if (index === 0 && !fa_library_list.includes(value)) {
      addToMessage(
        `Invalid prop ${propFullName} supplied to ${componentName}. ${value} is not a valid FontAwesome Library name. Valid library names are:\n${fa_library_list.join(
          ', '
        )}`
      );
    }
  });
  if (errorMessage) {
    console.error(errorMessage);
    return new Error('');
  }
  return null;
};

const IconLayers = ({ children, className }) => {
  return <span className={classNames('fa-stack', className)}>{children}</span>;
};

FontAwesomeIcon.defaultProps = {
  border: false,
  className: '',
  mask: null,
  fixedWidth: false,
  inverse: false,
  flip: null,
  icon: null,
  listItem: false,
  pull: null,
  pulse: false,
  rotation: null,
  size: null,
  spin: false,
  transform: '',
};

FontAwesomeIcon.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(validateIcon)])
    .isRequired,
  size: PropTypes.oneOf([
    'lg',
    'xs',
    'sm',
    '1x',
    '2x',
    '3x',
    '4x',
    '5x',
    '6x',
    '7x',
    '8x',
    '9x',
    '10x',
  ]),
  border: PropTypes.bool,
  className: PropTypes.string,
  fixedWidth: PropTypes.bool,
  inverse: PropTypes.bool,
  flip: PropTypes.oneOf(['horizontal', 'vertical', 'both']),
  listItem: PropTypes.bool,
  pull: PropTypes.oneOf(['right', 'left']),
  pulse: PropTypes.bool,
  rotation: PropTypes.oneOf([90, 180, 270, null]),
  spin: PropTypes.bool,
  title: PropTypes.string,
  transform: PropTypes.string,
  color: PropTypes.oneOf(extendedColorArray),
  layer: PropTypes.oneOf([1, 2, null]),
};

FontAwesomeIcon.displayName = 'Icon(FontAwesome)';

const Icon = React.memo(FontAwesomeIcon);
export { Icon, IconLayers };

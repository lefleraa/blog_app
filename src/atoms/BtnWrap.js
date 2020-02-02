import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import cleanProps from 'clean-react-props';

const propTypes = {
  type: PropTypes.oneOf(['button', 'reset', 'submit', null]),
  margin: PropTypes.string,
  disabled: PropTypes.bool,
  display: PropTypes.oneOf(['inline', 'inline-block', 'block', null]),
};

const defaultProps = {
  type: 'button',
  margin: 'm-0',
  disabled: false,
  display: 'inline-block',
};

const BtnWrap = React.forwardRef(
  (
    { className, children, type, margin, disabled, display, label, ...rest },
    ref
  ) => {
    const classes = classNames(
      'u-pos-vertical-align u-cursor-pointer',
      'u-text-left u-bg-none u-border-0 p-0',
      display && `d-${display}`,
      disabled && 'disabled',
      margin,
      className
    );

    return (
      <button
        ref={ref}
        {...cleanProps(rest)}
        aria-label={label}
        type={type}
        className={classes}
        disabled={disabled}
        aria-disabled={disabled}
      >
        {children}
      </button>
    );
  }
);

BtnWrap.displayName = 'BtnWrap';
BtnWrap.propTypes = propTypes;
BtnWrap.defaultProps = defaultProps;

export default BtnWrap;

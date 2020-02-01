import React from 'react';
import classNames from 'classnames';
import cleanProps from 'clean-react-props';

///////////////////////////////////////////////
// PANEL CONTROL
///////////////////////////////////////////////

const PanelControl = ({
  children,
  placement,
  clean,
  small,
  auto,
  white,
  ...rest
}) => {
  return (
    <div
      className={classNames(
        'PanelControl d-flex u-width-p-12 align-items-center',
        !!small && 'PanelControl--small',
        !!auto && 'PanelControl--auto',
        !!white && 'PanelControl--white',
        !clean &&
          (placement === 'bottom'
            ? 'PanelControl--bottom'
            : 'PanelControl--top')
      )}
      {...cleanProps(rest)}
    >
      {children}
    </div>
  );
};

export default PanelControl;

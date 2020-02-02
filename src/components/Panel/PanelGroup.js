import React from 'react';
import cleanProps from 'clean-react-props';
import classNames from 'classnames';

///////////////////////////////////////////////
// PANEL GROUP
///////////////////////////////////////////////

const PanelGroup = ({
  children,
  padding,
  className,
  components = {},
  ...rest
}) => {
  return (
    <div className={classNames('PanelGroup', className)} {...cleanProps(rest)}>
      {components.heading}
      <div className={classNames('PanelGroup--inner', padding)}>{children}</div>
    </div>
  );
};

export default PanelGroup;

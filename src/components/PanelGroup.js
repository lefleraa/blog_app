import React from 'react';
import cleanProps from 'clean-react-props';

///////////////////////////////////////////////
// PANEL GROUP
///////////////////////////////////////////////

const PanelGroup = ({ children, components = {}, ...rest }) => {
  return (
    <div className="PanelGroup" {...cleanProps(rest)}>
      {components.heading}
      <div className="PanelGroup--inner">{children}</div>
    </div>
  );
};

export default PanelGroup;

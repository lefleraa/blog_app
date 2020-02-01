import React from 'react';

import PerfectScrollbar from 'react-perfect-scrollbar';

const ScrollArea = ({ className, ...props }) => {
  return (
    <PerfectScrollbar className={className} {...props}>
      {props.children || ''}
    </PerfectScrollbar>
  );
};

export default ScrollArea;

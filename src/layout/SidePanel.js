import React, { useState } from 'react';
import classNames from 'classnames';
import cleanProps from 'clean-react-props';
import { Resizable } from 're-resizable';

///////////////////////////////////////////////
// SIDE PANEL
///////////////////////////////////////////////

const defaultProps = {
  defaultWidth: 300,
  maxWidth: '33.333333vw',
  minWidth: 225,
  resizable: false,
  placement: 'left',
};

const SidePanel = ({
  children,
  placement,
  resizable,
  minWidth,
  maxWidth,
  defaultWidth,
  onResize,
  ...rest
}) => {
  const [width, setWidth] = useState(defaultWidth);
  const height = '100%';
  const [isResizing, setIsResizing] = useState(false);

  const leftPanel = placement === 'left';
  const handleConfig = {
    top: false,
    right: false,
    bottom: false,
    left: false,
    topRight: false,
    bottomRight: false,
    bottomLeft: false,
    topLeft: false,
  };

  if (!!resizable) {
    if (leftPanel) {
      handleConfig.right = true;
    } else {
      handleConfig.left = true;
    }
  }

  return (
    <Resizable
      className={classNames(
        'SidePanel--resizewrap',
        !!leftPanel
          ? 'SidePanel--resizewrap--left'
          : 'SidePanel--resizewrap--right'
      )}
      handleWrapperClass="SidePanel--resizewrap--handle--wrapper"
      handleClasses={{
        left: classNames(
          'SidePanel--resizewrap--handle SidePanel--resizewrap--handle--left',
          !!isResizing && 'SidePanel--resizewrap--handle--resizing'
        ),
        right: classNames(
          'SidePanel--resizewrap--handle SidePanel--resizewrap--handle--right',
          !!isResizing && 'SidePanel--resizewrap--handle--resizing'
        ),
      }}
      size={{ width, height }}
      maxWidth={maxWidth}
      minWidth={minWidth}
      enable={handleConfig}
      onResizeStart={() => setIsResizing(true)}
      onResizeStop={(e, direction, ref, d) => {
        const newWidth = width + d.width;
        setWidth(newWidth);
        setIsResizing(false);
      }}
      onResize={(e, direction, ref, d) => {
        const newWidth = width + d.width;
        if (typeof onResize === 'function') {
          onResize(newWidth);
        }
      }}
    >
      <div
        className={classNames(
          'SidePanel',
          leftPanel ? 'SidePanel--left' : 'SidePanel--right'
        )}
        {...cleanProps(rest)}
      >
        {children}
      </div>
    </Resizable>
  );
};

SidePanel.defaultProps = defaultProps;

export default SidePanel;

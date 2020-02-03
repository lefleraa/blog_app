import React, { useState } from 'react';
import classNames from 'classnames';
import cleanProps from 'clean-react-props';
import { Resizable } from 're-resizable';

///////////////////////////////////////////////
// SIDE PANEL
///////////////////////////////////////////////

const defaultProps = {
  resizable: false,
  placement: 'left',
};

const OverlayPanel = ({
  children,
  placement,
  resizable,
  minWidth,
  maxWidth,
  width,
  minHeight,
  maxHeight,
  height,
  onResizeStop,
  onResize,
  ...rest
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const leftRightPlacement = placement === 'left' || placement === 'right';
  const topBottomPlacement = placement === 'top' || placement === 'bottom';

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
    if (placement === 'left') {
      handleConfig.right = true;
    } else if (placement === 'right') {
      handleConfig.left = true;
    } else if (placement === 'bottom') {
      handleConfig.top = true;
    } else if (placement === 'top') {
      handleConfig.bottom = true;
    }
  }

  return (
    <Resizable
      className={classNames(
        'SidePanel--resizewrap',
        `SidePanel--resizewrap--${placement}`
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
        top: classNames(
          'SidePanel--resizewrap--handle SidePanel--resizewrap--handle--top',
          !!isResizing && 'SidePanel--resizewrap--handle--resizing'
        ),
        bottom: classNames(
          'SidePanel--resizewrap--handle SidePanel--resizewrap--handle--bottom',
          !!isResizing && 'SidePanel--resizewrap--handle--resizing'
        ),
      }}
      size={{
        width: leftRightPlacement ? width : '100%',
        height: topBottomPlacement ? height : '100%',
      }}
      maxWidth={maxWidth}
      minWidth={minWidth}
      maxHeight={maxHeight}
      minHeight={minHeight}
      enable={handleConfig}
      onResizeStart={() => setIsResizing(true)}
      onResizeStop={(e, direction, ref, d) => {
        setIsResizing(false);
        if (typeof onResizeStop === 'function') {
          if (leftRightPlacement) {
            onResizeStop({ e, direction, ref, d, width: width + d.width });
          } else {
            onResizeStop({ e, direction, ref, d, height: height + d.height });
          }
        }
      }}
      onResize={(e, direction, ref, d) => {
        if (typeof onResize === 'function') {
          onResize({ e, direction, ref, d });
        }
      }}
    >
      <div
        className={classNames('SidePanel', `SidePanel--${placement}`)}
        {...cleanProps(rest)}
      >
        {children}
      </div>
    </Resizable>
  );
};

OverlayPanel.defaultProps = defaultProps;

export default OverlayPanel;

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
  visible: false,
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
  visible,
  ...rest
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const verticalPlacement = placement === 'left' || placement === 'right';
  const horizontalPlacement = placement === 'top' || placement === 'bottom';

  const handleConfig = {
    top: !!resizable && placement === 'bottom',
    right: !!resizable && placement === 'left',
    bottom: !!resizable && placement === 'top',
    left: !!resizable && placement === 'right',
    topRight: false,
    bottomRight: false,
    bottomLeft: false,
    topLeft: false,
  };

  const passedProps = {
    maxWidth,
    minWidth,
    maxHeight,
    minHeight,
  };

  const handleClass = 'SidePanel--resizewrap--handle';

  const hiddenStyles = {
    left: placement === 'left' && -width,
    right: placement === 'right' && -width,
    top: placement === 'top' && -height,
    bottom: placement === 'bottom' && -height,
  };

  return (
    <Resizable
      {...passedProps}
      enable={handleConfig}
      className={classNames(
        'SidePanel--resizewrap',
        `SidePanel--resizewrap--${placement}`,
        !!visible && `SidePanel--resizewrap--visible`
      )}
      handleWrapperClass={`${handleClass}--wrapper`}
      handleClasses={{
        left: classNames(
          `${handleClass} ${handleClass}--left`,
          !!isResizing && `${handleClass}--resizing`
        ),
        right: classNames(
          `${handleClass} ${handleClass}--right`,
          !!isResizing && `${handleClass}--resizing`
        ),
        top: classNames(
          `${handleClass} ${handleClass}--top`,
          !!isResizing && `${handleClass}--resizing`
        ),
        bottom: classNames(
          `${handleClass} ${handleClass}--bottom`,
          !!isResizing && `${handleClass}--resizing`
        ),
      }}
      size={{
        width: verticalPlacement ? width : '100%',
        height: horizontalPlacement ? height : '100%',
      }}
      style={visible ? undefined : hiddenStyles}
      onResizeStart={() => setIsResizing(true)}
      onResizeStop={(e, direction, ref, d) => {
        setIsResizing(false);
        if (typeof onResizeStop === 'function') {
          onResizeStop({
            width: width + d.width,
            height: height + d.height,
          });
        }
      }}
      onResize={(e, direction, ref, d) => {
        if (typeof onResize === 'function') {
          onResize({
            width: width + d.width,
            height: height + d.height,
          });
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

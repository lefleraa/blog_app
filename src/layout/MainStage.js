import React from 'react';
import classNames from 'classnames';
import cleanProps from 'clean-react-props';
import { ScrollArea } from 'components';

const ViewableAreaDebug = ({ viewable }) => {
  return (
    <div
      className="u-pos-absolute d-flex align-items-center justify-content-center"
      style={{
        width: !!viewable.width ? viewable.width - 40 : 0,
        height: !!viewable.height ? viewable.height - 40 : 0,
        top: !!viewable.offset.y ? viewable.offset.y + 20 : 20,
        left: !!viewable.offset.x ? viewable.offset.x + 20 : 20,
        zIndex: 1,
        transition: 'all 0.1s ease-in-out',
      }}
    >
      <div className="u-pos-absolute u-width-p-12 u-height-p-10 u-bg-primary u-opacity-2"></div>
      <div className="u-pos-relative">
        {viewable.width} x {viewable.height}
      </div>
    </div>
  );
};

///////////////////////////////////////////////
// MAIN STAGE
///////////////////////////////////////////////

const MainStage = ({
  children,
  scrollBarRightPosition,
  viewable,
  canvas,
  ...rest
}) => {
  console.log('rendered MainStage');
  return (
    <>
      {!!scrollBarRightPosition && (
        <style
          dangerouslySetInnerHTML={{
            __html: `.MainStage .ps__rail-y { right: ${scrollBarRightPosition}px !important }`,
          }}
        />
      )}
      <div
        className="MainStage u-pos-absolute u-width-p-12 u-height-p-10 u-overflow-hidden"
        {...cleanProps(rest)}
      >
        <ScrollArea className="u-width-p-12 u-height-p-10 u-pos-absolute justify-content-center">
          {!!canvas && (
            <div
              className="MainStage--Canvas"
              style={{
                width: canvas.width,
                height: canvas.height,
              }}
            ></div>
          )}
          {children}
        </ScrollArea>
        {!!viewable && <ViewableAreaDebug viewable={viewable} />}
      </div>
    </>
  );
};

export default MainStage;

import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import cleanProps from 'clean-react-props';
import { ScrollArea } from 'components';

const ViewableAreaDebug = ({ mainStage }) => {
  return (
    <div
      className="u-pos-absolute d-flex align-items-center justify-content-center"
      style={{
        width: !!mainStage.viewable.width ? mainStage.viewable.width - 40 : 0,
        height: !!mainStage.viewable.height
          ? mainStage.viewable.height - 40
          : 0,
        top: !!mainStage.viewable.offset.y
          ? mainStage.viewable.offset.y + 20
          : 20,
        left: !!mainStage.viewable.offset.x
          ? mainStage.viewable.offset.x + 20
          : 20,
        zIndex: 1,
        transition: 'all 0.1s ease-in-out',
      }}
    >
      <div
        className={classNames(
          'u-pos-absolute u-width-p-12 u-height-p-10 u-bg-primary u-opacity-2',
          !!mainStage.viewable.entered ? 'u-bg-quin' : 'u-bg-primary'
        )}
      ></div>
      <div
        className={classNames(
          'u-pos-relative',
          !!mainStage.viewable.entered ? 'u-color-quin' : 'u-color-primary'
        )}
      >
        {mainStage.viewable.width} x {mainStage.viewable.height}
      </div>
    </div>
  );
};

///////////////////////////////////////////////
// MAIN STAGE
///////////////////////////////////////////////

const MainStage = ({
  children,
  window,
  rightPanel,
  mainStage,
  onMount,
  onResize,
  ...rest
}) => {
  const MainStageRef = useRef();

  function getDimensions() {
    const { offsetHeight, offsetWidth } = MainStageRef.current;
    return {
      height: offsetHeight,
      width: offsetWidth,
    };
  }

  // Set MainStage width once on mount
  useEffect(() => {
    if (typeof onMount === 'function') {
      const { height, width } = getDimensions();
      onMount({ height, width });
    }
  }, [onMount]);

  // Set MainStage width on window resize
  useEffect(() => {
    if (typeof onResize === 'function') {
      const { height, width } = getDimensions();
      onResize({ height, width });
    }
  }, [onResize, window.height, window.width]);

  return (
    <>
      {!!rightPanel.visible && (
        <style
          dangerouslySetInnerHTML={{
            __html: `.MainStage .ps__rail-y { right: ${rightPanel.width}px !important }`,
          }}
        />
      )}
      <div
        ref={MainStageRef}
        className="MainStage u-pos-absolute u-width-p-12 u-height-p-10 u-overflow-hidden"
        {...cleanProps(rest)}
      >
        <ScrollArea className="APITable u-width-p-12 u-height-p-10 u-pos-absolute justify-content-center">
          {children}
        </ScrollArea>
        {/* <ViewableAreaDebug mainStage={mainStage} /> */}
      </div>
    </>
  );
};

export default MainStage;

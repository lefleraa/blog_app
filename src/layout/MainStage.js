import React, { useEffect, useRef } from 'react';
// import classNames from 'classnames';
import cleanProps from 'clean-react-props';
import { ScrollArea } from 'components';

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
        <div
          className="u-pos-absolute u-bg-primary u-opacity-2"
          style={{
            width: mainStage.viewable.width - 40,
            height: mainStage.viewable.height - 40,
            top: mainStage.viewable.offsetY + 20,
            left: mainStage.viewable.offsetX + 20,
            zIndex: 1,
            transition: 'all 0.1s ease-in-out',
          }}
        ></div>
        <ScrollArea className="APITable u-width-p-12 u-height-p-10 u-pos-absolute justify-content-center">
          {children}
        </ScrollArea>
      </div>
    </>
  );
};

export default MainStage;

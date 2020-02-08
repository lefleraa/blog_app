import React from 'react';
import cleanProps from 'clean-react-props';
import { Scrollbars } from 'components';

///////////////////////////////////////////////
// MAIN STAGE
///////////////////////////////////////////////

const Canvas = ({ height, width, viewable, zoom }) => {
  console.log('render canvas');

  let paddingVertical = 200;
  let paddingHorizontal = 200;

  let zoomWidth = width * zoom.level;
  let zoomHeight = height; // * zoom.level;

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        height:
          viewable.height > zoomHeight
            ? viewable.height
            : zoomHeight + paddingVertical,
        width:
          viewable.width > zoomWidth
            ? viewable.width
            : zoomWidth + paddingHorizontal,
      }}
    >
      <div
        className="u-bg-white"
        style={{ height: zoomHeight, width: zoomWidth }}
      ></div>
    </div>
  );
};

const MainStage = ({ mainStage, canvas, zoom, ...rest }) => {
  const { viewable } = mainStage;
  console.log('rendered MainStage');
  return (
    <div
      className="MainStage u-pos-absolute u-width-p-12 u-height-p-10 u-overflow-hidden"
      {...cleanProps(rest)}
    >
      <div
        className="u-pos-absolute"
        style={{
          left: viewable.offset.x,
          top: viewable.offset.y,
          width: viewable.width,
          height: viewable.height,
          transition: 'all 0.1s ease-in-out',
        }}
      >
        <Scrollbars>
          <Canvas {...canvas} viewable={viewable} zoom={zoom} />
        </Scrollbars>
      </div>
    </div>
  );
};

export default MainStage;

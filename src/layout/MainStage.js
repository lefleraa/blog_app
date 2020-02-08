import React, { useRef, useEffect } from 'react';
import cleanProps from 'clean-react-props';
import { Scrollbars } from 'components';

///////////////////////////////////////////////
// MAIN STAGE
///////////////////////////////////////////////

let paddingVertical = 200;
let paddingHorizontal = 400;

const Canvas = ({ height, width }) => {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        height: height + paddingVertical,
        width: width + paddingHorizontal,
      }}
    >
      <div className="u-bg-white" style={{ height, width }}></div>
    </div>
  );
};

const MainStage = ({ viewable, canvas, ...rest }) => {
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
          <Canvas {...canvas} />
        </Scrollbars>
      </div>
    </div>
  );
};

export default MainStage;

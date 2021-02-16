import React, { useContext } from 'react';
import { GlobalContext } from 'contexts';

///////////////////////////////////////////////
// ARTBOARD
///////////////////////////////////////////////

const Artboard = ({ children }) => {
  const { layout = {} } = useContext(GlobalContext);
  const { elements = {}, zoom = {} } = layout;
  const { artboard = {}, mainStage = {} } = elements;
  const { width } = artboard;
  const { viewable = {} } = mainStage;

  let zoomWidth = width * zoom.level;
  let margin = 200;

  return (
    <div
      className="Collage--Artboard--Space d-flex justify-content-center"
      style={{
        transition: 'all 100ms ease-in-out',
        width: viewable.width > zoomWidth ? viewable.width : zoomWidth + margin,
      }}
    >
      <div
        className="Collage--Artboard"
        style={{
          marginTop: margin / 2,
          marginBottom: margin / 2,
          width: zoomWidth,
          transition: 'all 100ms ease-in-out',
        }}
      >
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Artboard;

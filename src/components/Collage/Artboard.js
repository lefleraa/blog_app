import React from 'react';

///////////////////////////////////////////////
// ARTBOARD
///////////////////////////////////////////////

const Artboard = ({ width, viewable, zoom, spacing, children }) => {
  let zoomWidth = width * zoom.level;
  let padding = 200;

  // console.log('render Artboard');
  return (
    <div
      className="Collage--Artboard--Space d-flex justify-content-center"
      style={{
        transition: 'all 100ms ease-in-out',
        width:
          viewable.width > zoomWidth ? viewable.width : zoomWidth + padding,
        marginRight: -spacing,
      }}
    >
      <div
        className="Collage--Artboard"
        style={{
          marginTop: padding / 2,
          marginBottom: padding / 2,
          width: zoomWidth,
          transition: 'all 100ms ease-in-out',
        }}
      >
        <div
          style={{
            marginTop: -spacing,
            marginBottom: -spacing,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Artboard;
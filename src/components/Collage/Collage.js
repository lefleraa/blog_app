import React from 'react';
import cleanProps from 'clean-react-props';
import { Scrollbars } from 'components';
import { clamp } from 'lodash-es';
import { Artboard, CollageLockup } from 'components';

import { collageElements } from './mock';

///////////////////////////////////////////////
// COLLAGE
///////////////////////////////////////////////

const Collage = ({ mainStage, artboard, zoom, ...rest }) => {
  const { viewable } = mainStage;
  const defaultPadding = 1; // todo: hook up non statically

  function clampSpacing(value) {
    return clamp(value, 0.5, 500);
  }

  const spacing = clampSpacing((defaultPadding / 2) * zoom.level);

  // console.log('rendered Collage');
  return (
    <div
      className="Collage u-pos-absolute u-width-p-12 u-height-p-10 u-overflow-hidden"
      {...cleanProps(rest)}
    >
      <div
        className="Collage--ViewableArea u-pos-absolute"
        style={{
          left: viewable.offset.x,
          top: viewable.offset.y,
          width: viewable.width,
          height: viewable.height,
        }}
      >
        <Scrollbars>
          <Artboard
            {...artboard}
            viewable={viewable}
            zoom={zoom}
            spacing={spacing}
          >
            <CollageLockup
              elements={collageElements}
              zoom={zoom}
              spacing={spacing}
            />
          </Artboard>
        </Scrollbars>
      </div>
    </div>
  );
};

export default Collage;

import React, { useContext } from 'react';
import { Scrollbars } from 'components';
import { clamp } from 'lodash-es';
import { Artboard, CollageLockup } from 'components';
import { GlobalContext } from 'contexts';

import { collageElements } from './mock';
import { setElementSizing } from './setElementSizing';

///////////////////////////////////////////////
// COLLAGE
///////////////////////////////////////////////

function clampSpacing(value) {
  return clamp(value, 0.5, 500);
}

const Collage = () => {
  const { layout = {} } = useContext(GlobalContext);
  const { elements = {}, zoom = {} } = layout;
  const { mainStage = {}, artboard = {} } = elements;
  const { viewable } = mainStage;

  const defaultPadding = 1; // todo: hook up non statically
  const spacing = clampSpacing((defaultPadding / 2) * zoom.level);

  return (
    <div className="Collage u-pos-absolute u-width-p-12 u-height-p-10 u-overflow-hidden">
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
              elements={setElementSizing(collageElements)}
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

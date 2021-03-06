import React, { useContext } from 'react';
import { Scrollbars } from 'components';
import { clamp } from 'lodash-es';
import { Artboard, CollageLockup } from 'components';
import { GlobalContext } from 'contexts';
import { useCollage } from 'hooks';

import { collageElements } from './mock';

///////////////////////////////////////////////
// COLLAGE
///////////////////////////////////////////////

const Collage = () => {
  console.log('render Collage');
  const { layout = {} } = useContext(GlobalContext);
  const { elements = {}, zoom = {} } = layout;
  const { artboard = {}, mainStage = {} } = elements;
  const { viewable = {} } = mainStage;

  const spacing = !!artboard.spacing
    ? clamp(artboard.spacing * zoom.level, 0.5, 500)
    : 0;

  const { collage } = useCollage({
    items: collageElements,
    bypass: false,
  });

  const viewableAreaCoords = {
    left: viewable.offset.x,
    top: viewable.offset.y,
    width: viewable.width,
    height: viewable.height,
  };

  return (
    <div className="Collage u-pos-absolute u-width-p-12 u-height-p-10 u-overflow-hidden">
      <div
        className="Collage--ViewableArea u-pos-absolute"
        style={viewableAreaCoords}
      >
        <Scrollbars>
          <Artboard>
            <CollageLockup collage={collage} zoom={zoom} spacing={spacing} />
          </Artboard>
        </Scrollbars>
      </div>
    </div>
  );
};

export default Collage;

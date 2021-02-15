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
  const { layout = {} } = useContext(GlobalContext);
  const { elements = {}, zoom = {} } = layout;
  const { artboard = {}, mainStage = {} } = elements;
  const { viewable = {} } = mainStage;

  const spacing = !!artboard.spacing
    ? clamp((artboard.spacing / 2) * zoom.level, 0.5, 500)
    : 0;

  const { collage } = useCollage(collageElements, false);

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
          <Artboard spacing={spacing}>
            <CollageLockup collage={collage} zoom={zoom} spacing={spacing} />
          </Artboard>
        </Scrollbars>
      </div>
    </div>
  );
};

export default Collage;

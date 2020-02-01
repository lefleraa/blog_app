import React, { useState, useEffect, useRef } from 'react';
import cleanProps from 'clean-react-props';
import InputRange from 'react-input-range';
import { throttle, clamp } from 'lodash-es';

import { Panel, PanelControl, Thumbnail } from 'components';

// load in mock data for now
// TODO: remove
import { photoArrray } from './mock';

///////////////////////////////////////////////
// MEDIA POOL
///////////////////////////////////////////////

const defaultProps = {
  thumbnailMaxWidth: 300,
  hideThumbnailScale: false,
};

const MediaPool = ({
  leftPanelWidth,
  thumbnailMaxWidth,
  thumbnailWidth,
  hideThumbnailScale,
  ...rest
}) => {
  // state that is passed down to the thumbnails
  const [actualScale, setActualScale] = useState(thumbnailWidth);
  // state that allows the scale slider to drag smoothly
  const [activeScale, setActiveScale] = useState(actualScale);

  // Throttle the actualScale to every 100ms and let a css transition
  // on the thumbnails handle the animation between setting state.
  const throttled = useRef(
    throttle(newValue => setActiveScale(newValue), 100, {
      leading: true,
    })
  );
  useEffect(() => throttled.current(actualScale), [actualScale]);

  // Ensure thumbnail is within range and the max value
  // is never less than the min value.
  let mediaPoolPadding = 40;
  let thumbMin = 80;
  let thumbMax = clamp(
    thumbnailMaxWidth - mediaPoolPadding,
    thumbMin + 1,
    100000000
  );
  let thumbValue = clamp(actualScale, thumbMin, thumbMax);

  return (
    <div
      className="MediaPool d-flex flex-column p-0 u-width-p-12 u-height-p-10 u-pos-absolute"
      {...cleanProps(rest)}
    >
      <Panel auto={true}>
        <PanelControl white>
          <span className="u-text-bold">Library</span>
        </PanelControl>
      </Panel>

      <Panel>
        <div className="MediaPool--Thumbnail--Wrap d-flex flex-wrap justify-content-center">
          {photoArrray.map((photo, i) => (
            <Thumbnail scale={activeScale} photo={photo} key={i} />
          ))}
        </div>
      </Panel>

      {!hideThumbnailScale && (
        <Panel auto={true}>
          <PanelControl placement="bottom" small white>
            <InputRange
              minValue={thumbMin}
              maxValue={thumbMax}
              value={thumbValue}
              onChange={value => setActualScale(value)}
              draggableTrack={true}
            />
          </PanelControl>
        </Panel>
      )}
    </div>
  );
};

MediaPool.defaultProps = defaultProps;

export default MediaPool;

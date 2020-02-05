import React, { useState, useEffect, useRef } from 'react';
import cleanProps from 'clean-react-props';
import InputRange from 'react-input-range';
import { throttle, clamp } from 'lodash-es';
import classNames from 'classnames';

import { Icon, BtnWrap } from 'atoms';
import { Panel, PanelControl, Thumbnail } from 'components';

// load in mock data for now
// TODO: remove
import { stressPhotoArray } from './mock';
let photos = stressPhotoArray;

///////////////////////////////////////////////
// MEDIA POOL
///////////////////////////////////////////////

let thumbnailDefaultScale = 119; // try to be two columns on mount.

const MediaPool = ({ leftPanel, onReset, ...rest }) => {
  // state that is passed down to the thumbnails

  const [actualScale, setActualScale] = useState(thumbnailDefaultScale);
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
    leftPanel.width - mediaPoolPadding,
    thumbMin + 1,
    100000000
  );
  let thumbValue = clamp(actualScale, thumbMin, thumbMax);

  let hideElements = leftPanel.width <= leftPanel.minWidth;

  return (
    <div
      className="MediaPool d-flex flex-column p-0 u-width-p-12 u-height-p-10 u-pos-absolute"
      {...cleanProps(rest)}
    >
      {!hideElements && (
        <Panel auto={true}>
          <PanelControl white>
            <div className="d-flex u-width-p-12">
              <div className="col p-0">
                <span className="u-text-bold">Library</span>
              </div>
              <div className="col-auto p-0">{photos && photos.length}</div>
            </div>
          </PanelControl>
        </Panel>
      )}

      <Panel>
        <div className="MediaPool--Thumbnail--Wrap d-flex flex-wrap justify-content-center">
          {photos.map((photo, i) => (
            <Thumbnail scale={activeScale} photo={photo} key={i} />
          ))}
        </div>
      </Panel>

      <Panel auto={true}>
        <PanelControl placement="bottom" small white>
          <div className="d-flex align-items-center u-width-p-12">
            <div
              className={classNames(
                'p-0',
                !hideElements
                  ? 'col-auto'
                  : 'col d-flex u-width-p-12 justify-content-center'
              )}
            >
              <BtnWrap
                onDoubleClick={() => {
                  if (typeof onReset === 'function') {
                    onReset({ width: leftPanel.initialWidth });
                    setActualScale(thumbnailDefaultScale);
                  }
                }}
              >
                <Icon
                  icon={!hideElements ? ['fa', 'th'] : ['fa', 'arrow-to-right']}
                  color="gray-lighter"
                />
              </BtnWrap>
            </div>
            {!hideElements && (
              <div className="col pl-3 pr-0">
                <InputRange
                  minValue={thumbMin}
                  maxValue={thumbMax}
                  value={thumbValue}
                  onChange={value => setActualScale(value)}
                  draggableTrack={true}
                />
              </div>
            )}
            <div className="col-auto"></div>
          </div>
        </PanelControl>
      </Panel>
    </div>
  );
};

export default MediaPool;

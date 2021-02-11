import React, { useState, useContext } from 'react';
import cleanProps from 'clean-react-props';
import InputRange from 'react-input-range';
import { clamp } from 'lodash-es';
import classNames from 'classnames';

import { GlobalContext } from 'contexts';
import { Icon, BtnWrap } from 'atoms';
import { Panel, PanelControl, Thumbnail } from 'components';

// load in mock data for now
// TODO: remove
import { photoArray } from './mock';
let photos = photoArray;

let thumbnailDefaultScale = 119; // try to be two columns on mount.

const MediaPool = props => {
  const [activeScale, setActiveScale] = useState(thumbnailDefaultScale);

  const { layout = {} } = useContext(GlobalContext);
  const { elements = {} } = layout;
  const { leftPanel = {} } = elements;

  // Ensure thumbnail is within range and the max value
  // is never less than the min value.
  let mediaPoolPadding = 40;
  let thumbMin = 80;
  let thumbMax = clamp(
    leftPanel.width - mediaPoolPadding,
    thumbMin + 1,
    100000000
  );
  let thumbValue = clamp(activeScale, thumbMin, thumbMax);

  let hideElements = leftPanel.width <= leftPanel.minWidth;

  return (
    <div
      className="MediaPool d-flex flex-column p-0 u-width-p-12 u-height-p-10 u-pos-absolute"
      {...cleanProps(props)}
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

      <Panel scroll={true}>
        <div className="MediaPool--Thumbnail--Wrap d-flex flex-wrap justify-content-center">
          {!!photos && !!photos.length ? (
            <>
              {photos.map((photo, i) => (
                <Thumbnail scale={activeScale} photo={photo} key={i} />
              ))}
            </>
          ) : (
            'no photos'
          )}
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
                  leftPanel.resetSize();
                  setActiveScale(thumbnailDefaultScale);
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
                  onChange={value => setActiveScale(value)}
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

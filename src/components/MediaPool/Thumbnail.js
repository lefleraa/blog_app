import React from 'react';
import cleanProps from 'clean-react-props';
import classNames from 'classnames';

///////////////////////////////////////////////
// THUMBNAIL
///////////////////////////////////////////////

const Thumbnail = ({ scale, photo = {}, ...rest }) => {
  return (
    <div
      className={classNames(
        'MediaPool--Thumbnail',
        !!photo.used && 'MediaPool--Thumbnail--used',
        !!photo.active && 'MediaPool--Thumbnail--active'
      )}
      style={{ width: scale }}
      {...cleanProps(rest)}
    >
      <div className="content"></div>
      <div
        className="MediaPool--Thumbnail--Img"
        style={{ backgroundImage: `url('${photo.src}')` }}
      ></div>
      {!!photo.label && (
        <div className="MediaPool--Thumbnail--Decorations d-flex flex-wrap align-items-end">
          <div
            className={classNames(
              'MediaPool--Thumbnail--Badge',
              `u-bg-${photo.label}`
            )}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Thumbnail;

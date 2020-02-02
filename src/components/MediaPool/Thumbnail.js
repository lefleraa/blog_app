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
        'MediaPool--Thumbnail d-inline-flex justify-content-center align-items-center',
        !!photo.active && 'MediaPool--Thumbnail--active',
        !!photo.used && 'MediaPool--Thumbnail--used'
      )}
      style={{ width: scale }}
      {...cleanProps(rest)}
    >
      <div className="MediaPool--Thumbnail--ImgWrap d-inline-block">
        <img
          src={photo.src}
          className="MediaPool--Thumbnail--Img d-inline-block"
          style={{
            maxWidth: '100%',
            maxHeight: scale,
          }}
          alt=""
        />
        <div className="MediaPool--Thumbnail--Decorations d-flex flex-wrap align-items-center">
          {!!photo.label && (
            <div
              className={classNames(
                'MediaPool--Thumbnail--Badge',
                `u-bg-${photo.label}`
              )}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Thumbnail;

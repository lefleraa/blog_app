import React from 'react';
// import classNames from 'classnames';
import cleanProps from 'clean-react-props';
import { ScrollArea, APITable } from 'components';

///////////////////////////////////////////////
// POST STAGE
///////////////////////////////////////////////

const Stage = ({ children, ...rest }) => {
  return (
    <div className="PostBuilder--Stage p-5" {...cleanProps(rest)}>
      {children}
    </div>
  );
};

const PostBuilder = ({ layout, view, zoom, children, ...rest }) => {
  const { rightPanel } = layout;
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `.PostBuilder .ps__rail-y { right: ${rightPanel.width}px !important }`,
        }}
      />
      <div
        className="PostBuilder u-width-p-12 u-height-p-10 u-pos-absolute"
        {...cleanProps(rest)}
      >
        <ScrollArea className="u-width-p-12 u-height-p-10 u-pos-absolute justify-content-center">
          <div className="PostBuilder--inner d-flex flex-column align-items-center">
            <Stage>
              <APITable layout={layout} view={view} zoom={zoom} />
            </Stage>
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

export default PostBuilder;

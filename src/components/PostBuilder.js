import React from 'react';
import classNames from 'classnames';
import cleanProps from 'clean-react-props';
import { ScrollArea } from 'components';

///////////////////////////////////////////////
// POST STAGE
///////////////////////////////////////////////

const Stage = ({ children, ...rest }) => {
  return (
    <div className="PostBuilder--Stage u-text-center" {...cleanProps(rest)}>
      {children}
    </div>
  );
};

const PostBuilder = ({
  leftPanelWidth,
  rightPanelWidth,
  children,
  ...rest
}) => {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `.PostBuilder .ps__rail-y { right: ${rightPanelWidth}px !important }`,
        }}
      />
      <div
        className="PostBuilder u-width-p-12 u-height-p-10 u-pos-absolute"
        {...cleanProps(rest)}
      >
        <ScrollArea className="u-width-p-12 u-height-p-10 u-pos-absolute d-flex justify-content-center">
          <div className="PostBuilder--inner d-flex flex-column align-items-center">
            <Stage>
              <div>{leftPanelWidth}</div>
              <div>{rightPanelWidth}</div>
            </Stage>
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

export default PostBuilder;

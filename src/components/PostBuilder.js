import React from 'react';
import classNames from 'classnames';
import cleanProps from 'clean-react-props';
import { Panel } from 'components';

///////////////////////////////////////////////
// POST STAGE
///////////////////////////////////////////////

const Stage = ({ children, ...rest }) => {
  return <div className="PostBuilder--Stage" {...cleanProps(rest)}></div>;
};

const PostBuilder = ({ children, ...rest }) => {
  return (
    <Panel
      className="PostBuilder u-width-p-12 u-height-p-10 u-pos-absolute"
      {...cleanProps(rest)}
    >
      <div className="PostBuilder--inner d-flex flex-column align-items-center">
        <Stage></Stage>
      </div>
    </Panel>
  );
};

export default PostBuilder;

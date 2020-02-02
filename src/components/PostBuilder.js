import React from 'react';
// import classNames from 'classnames';
import cleanProps from 'clean-react-props';

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

const PostBuilder = ({ ...rest }) => {
  return (
    <div className="PostBuilder" {...cleanProps(rest)}>
      <div className="PostBuilder--inner d-flex flex-column align-items-center">
        <Stage></Stage>
      </div>
    </div>
  );
};

export default PostBuilder;

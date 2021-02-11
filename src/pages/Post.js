import React from 'react';
import { PostWrapper, TopBar } from 'layout';
import { MediaPool, APITable, Collage } from 'components';

//////////////////////////
// MAIN POST RENDER
//////////////////////////

const Post = () => {
  return (
    <PostWrapper
      components={{
        TopBar: <TopBar />,
        LeftPanel: <MediaPool />,
        RightPanel: <APITable />,
        MainStage: <Collage />,
      }}
    />
  );
};

export default Post;

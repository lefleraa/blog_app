import React, { useMemo } from 'react';
import { PostWrapper, TopBar } from 'layout';
import { MediaPool, APITable, Collage } from 'components';
import { useLayoutProvider } from 'hooks';

//////////////////////////
// MEMOIZE CHILDREN TO BE SPECIFIC
// ABOUT WHICH PROPS CAUSE A RE-RENDER
// (prevents onmousemove renders)
//////////////////////////

const PostMediaPool = props => {
  const { leftPanel } = props;
  return useMemo(() => <MediaPool {...props} />, [leftPanel.width]);
};

const PostCollage = props => {
  const { scrollBarRightPosition, mainStage, artboard, zoom } = props;
  const { viewable } = mainStage;
  const { height, width } = viewable;
  return useMemo(() => <Collage {...props} />, [
    artboard.width,
    artboard.height,
    scrollBarRightPosition,
    height,
    width,
    zoom.level,
  ]);
};

//////////////////////////
// MAIN POST RENDER
//////////////////////////

const Post = () => {
  const layoutProvider = useLayoutProvider();
  const { elements, zoom } = layoutProvider;
  const { leftPanel, mainStage, artboard } = elements;

  return (
    <PostWrapper
      elementData={elements}
      components={{
        TopBar: <TopBar {...layoutProvider} />,
        LeftPanel: (
          <PostMediaPool
            leftPanel={{
              initialWidth: leftPanel.initialWidth,
              width: leftPanel.width,
              minWidth: leftPanel.minWidth,
              maxWidth: leftPanel.maxWidth,
            }}
            onReset={() => leftPanel.resetSize()}
          />
        ),
        RightPanel: <APITable {...layoutProvider} />,
        MainStage: (
          <PostCollage mainStage={mainStage} artboard={artboard} zoom={zoom} />
        ),
      }}
    />
  );
};

export default Post;

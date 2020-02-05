import React, { useMemo } from 'react';
import { PostWrapper, MainStage, TopBar } from 'layout';
import { MediaPool, APITable } from 'components';
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

const PostMainStage = props => {
  const { scrollBarRightPosition, viewable } = props;
  const { height, width } = viewable;
  return useMemo(() => <MainStage {...props} />, [
    scrollBarRightPosition,
    height,
    width,
  ]);
};

//////////////////////////
// MAIN POST RENDER
//////////////////////////

const Post = () => {
  const layoutProvider = useLayoutProvider();
  const { elements } = layoutProvider;
  const { leftPanel, rightPanel, mainStage } = elements;

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
          <PostMainStage
            scrollBarRightPosition={
              rightPanel && rightPanel.visible && rightPanel.width
            }
            viewable={mainStage.viewable}
          />
        ),
      }}
    />
  );
};

export default Post;

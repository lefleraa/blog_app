import React from 'react';
import { PostWrapper, MainStage, TopBar } from 'layout';
import { MediaPool, APITable } from 'components';
import { useLayoutProvider } from 'hooks';

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
          <MediaPool
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
          <MainStage
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

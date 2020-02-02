import React from 'react';
import cleanProps from 'clean-react-props';
import { Panel, APITable, MediaPool, PostBuilder } from 'components';
import { MainStage, OverlayPanel, TopBar } from 'layout';
import { useLayoutProvider } from 'layout';

///////////////////////////////////////////////
// WRAPPER
///////////////////////////////////////////////

const Wrapper = ({ ...rest }) => {
  const layoutProvider = useLayoutProvider();
  const { layout } = layoutProvider;
  const { mainStage, leftPanel, rightPanel } = layout;

  return (
    <Panel
      className="u-width-p-12 u-height-p-10 u-pos-fixed"
      {...cleanProps(rest)}
    >
      <Panel auto={true}>
        {/* TOP BAR */}
        <TopBar {...layoutProvider} />
      </Panel>
      <Panel direction="row">
        <div className="u-pos-absolute u-width-p-12 u-height-p-10 u-overflow-hidden">
          {/* MAIN STAGE */}
          <MainStage
            {...layout}
            onMount={({ height, width }) => {
              mainStage.setWidth(width);
              mainStage.setHeight(height);
            }}
            onResize={({ height, width }) => {
              mainStage.setWidth(width);
              mainStage.setHeight(height);
            }}
          >
            {/* <APITable {...layoutProvider} /> */}
            <PostBuilder {...layoutProvider} />
          </MainStage>

          {/* LEFT PANEL */}
          <OverlayPanel
            placement="left"
            resizable={true}
            {...leftPanel}
            onResizeStop={({ width }) => leftPanel.setWidth(width)}
          >
            <MediaPool
              {...layout}
              thumbnailMaxWidth={leftPanel.width}
              hideThumbnailScale={leftPanel.width <= leftPanel.minWidth}
            />
          </OverlayPanel>

          {/* RIGHT PANEL */}
          <OverlayPanel
            placement="right"
            resizable={true}
            {...rightPanel}
            onResizeStop={({ width }) => rightPanel.setWidth(width)}
          >
            <APITable {...layoutProvider} />
          </OverlayPanel>
        </div>
      </Panel>
    </Panel>
  );
};

export default Wrapper;

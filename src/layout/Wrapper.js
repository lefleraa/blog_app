import React from 'react';
import cleanProps from 'clean-react-props';
import { Panel, APITable, MediaPool, PostBuilder } from 'components';
import { MainStage, OverlayPanel, TopBar } from 'layout';
import { useLayoutProvider } from 'hooks';

///////////////////////////////////////////////
// WRAPPER
///////////////////////////////////////////////

const Wrapper = ({ ...rest }) => {
  const layoutProvider = useLayoutProvider();
  const { layout } = layoutProvider;
  const { mainStage, leftPanel, rightPanel, topPanel, bottomPanel } = layout;

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
          {mainStage.visible && (
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
              {/* <PostBuilder {...layoutProvider} /> */}
            </MainStage>
          )}

          {/* LEFT PANEL */}
          <OverlayPanel
            config={{
              placement: 'left',
              ...leftPanel,
            }}
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
            config={{
              placement: 'right',
              ...rightPanel,
            }}
            onResizeStop={({ width }) => rightPanel.setWidth(width)}
          >
            <APITable {...layoutProvider} />
          </OverlayPanel>

          {/* TOP PANEL */}
          <OverlayPanel
            config={{
              placement: 'top',
              ...topPanel,
            }}
            onResizeStop={({ height }) => topPanel.setHeight(height)}
          ></OverlayPanel>

          {/* TOP PANEL */}
          <OverlayPanel
            config={{
              placement: 'bottom',
              ...bottomPanel,
            }}
            onResizeStop={({ height }) => bottomPanel.setHeight(height)}
          ></OverlayPanel>
        </div>
      </Panel>
    </Panel>
  );
};

export default Wrapper;

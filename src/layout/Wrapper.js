import React from 'react';
import cleanProps from 'clean-react-props';
import { Panel, PostBuilder, MediaPool } from 'components';
import { OverlayPanel, TopBar } from 'layout';
import { useLayoutProvider } from 'layout';

///////////////////////////////////////////////
// WRAPPER
///////////////////////////////////////////////

const Wrapper = ({ ...rest }) => {
  const layoutProvider = useLayoutProvider();
  const { layout } = layoutProvider;
  const {
    leftPanelWidth,
    rightPanelWidth,
    setLeftPanelWidth,
    setRightPanelWidth,
  } = layout;

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
          {/* MAIN CANVAS POST BUILDER */}
          <PostBuilder {...layoutProvider} />

          {/* LEFT PANEL */}
          <OverlayPanel
            placement="left"
            resizable={true}
            minWidth={120}
            width={leftPanelWidth}
            onResizeStop={({ width }) => setLeftPanelWidth(width)}
          >
            <MediaPool
              {...layout}
              thumbnailMaxWidth={leftPanelWidth}
              hideThumbnailScale={leftPanelWidth <= 120}
            />
          </OverlayPanel>

          {/* RIGHT PANEL */}
          <OverlayPanel
            placement="right"
            resizable={true}
            minWidth={250}
            maxWidth={320}
            width={rightPanelWidth}
            onResizeStop={({ width }) => setRightPanelWidth(width)}
          ></OverlayPanel>
        </div>
      </Panel>
    </Panel>
  );
};

export default Wrapper;

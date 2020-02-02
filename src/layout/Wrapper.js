import React from 'react';
import cleanProps from 'clean-react-props';
import { Panel, APITable, MediaPool } from 'components';
import { OverlayPanel, TopBar } from 'layout';
import { useLayoutProvider } from 'layout';

///////////////////////////////////////////////
// WRAPPER
///////////////////////////////////////////////

const Wrapper = ({ ...rest }) => {
  const layoutProvider = useLayoutProvider();
  const { layout } = layoutProvider;
  const { leftPanel, rightPanel } = layout;

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
          <APITable {...layoutProvider} />
          {/* <PostBuilder {...layoutProvider} /> */}

          {/* LEFT PANEL */}
          <OverlayPanel
            placement="left"
            resizable={true}
            minWidth={120}
            width={leftPanel.width}
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
            minWidth={250}
            maxWidth={320}
            width={rightPanel.width}
            onResizeStop={({ width }) => rightPanel.setWidth(width)}
          ></OverlayPanel>
        </div>
      </Panel>
    </Panel>
  );
};

export default Wrapper;

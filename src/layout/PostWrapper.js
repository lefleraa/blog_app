import React from 'react';
import cleanProps from 'clean-react-props';
import { Panel } from 'components';
import { OverlayPanel } from 'layout';

///////////////////////////////////////////////
// WRAPPER
///////////////////////////////////////////////

const PostWrapper = ({ children, elementData, components, ...rest }) => {
  const { leftPanel, rightPanel, topPanel, bottomPanel } = elementData || {};

  return (
    <Panel
      className="u-width-p-12 u-height-p-10 u-pos-fixed"
      {...cleanProps(rest)}
    >
      <Panel auto={true}>
        {/* TOP BAR */}
        {!!components && components.TopBar}
      </Panel>
      <Panel direction="row">
        <div className="u-pos-absolute u-width-p-12 u-height-p-10 u-overflow-hidden">
          {/* MAIN STAGE */}
          {!!components && components.MainStage}

          {/* LEFT PANEL */}
          <OverlayPanel
            config={{
              placement: 'left',
              ...leftPanel,
            }}
            onResizeStop={({ width }) => leftPanel.setSize({ width })}
          >
            {!!components && components.LeftPanel}
          </OverlayPanel>

          {/* RIGHT PANEL */}
          <OverlayPanel
            config={{
              placement: 'right',
              ...rightPanel,
            }}
            onResizeStop={({ width }) => rightPanel.setSize({ width })}
          >
            {!!components && components.RightPanel}
          </OverlayPanel>

          {/* TOP PANEL */}
          <OverlayPanel
            config={{
              placement: 'top',
              ...topPanel,
            }}
            onResizeStop={({ height }) => topPanel.setSize({ height })}
          >
            {!!components && components.TopPanel}
          </OverlayPanel>

          {/* TOP PANEL */}
          <OverlayPanel
            config={{
              placement: 'bottom',
              ...bottomPanel,
            }}
            scroll={true}
            onResizeStop={({ height }) => bottomPanel.setSize({ height })}
          >
            {!!components && components.BottomPanel}
          </OverlayPanel>
        </div>
      </Panel>
    </Panel>
  );
};

export default React.memo(PostWrapper);

import React, { useContext } from 'react';
import cleanProps from 'clean-react-props';
import { Panel } from 'components';
import { OverlayPanel } from 'layout';
import { GlobalContext } from 'contexts';

///////////////////////////////////////////////
// WRAPPER
///////////////////////////////////////////////

const PostWrapper = ({ components = {}, ...rest }) => {
  const { layout = {} } = useContext(GlobalContext);
  const { elements = {} } = layout;
  const { leftPanel, rightPanel, topPanel, bottomPanel } = elements;

  return (
    <Panel
      className="u-width-p-12 u-height-p-10 u-pos-fixed"
      {...cleanProps(rest)}
    >
      <Panel auto={true}>
        {/* TOP BAR */}
        {components.TopBar}
      </Panel>
      <Panel direction="row">
        <div className="u-pos-absolute u-width-p-12 u-height-p-10 u-overflow-hidden">
          {/* MAIN STAGE */}
          {components.MainStage}

          {/* LEFT PANEL */}
          <OverlayPanel
            config={{
              placement: 'left',
              ...leftPanel,
            }}
            onResizeStop={({ width }) => leftPanel.setSize({ width })}
          >
            {components.LeftPanel}
          </OverlayPanel>

          {/* RIGHT PANEL */}
          <OverlayPanel
            config={{
              placement: 'right',
              ...rightPanel,
            }}
            onResizeStop={({ width }) => rightPanel.setSize({ width })}
          >
            {components.RightPanel}
          </OverlayPanel>

          {/* TOP PANEL */}
          <OverlayPanel
            config={{
              placement: 'top',
              ...topPanel,
            }}
            onResizeStop={({ height }) => topPanel.setSize({ height })}
          >
            {components.TopPanel}
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
            {components.BottomPanel}
          </OverlayPanel>
        </div>
      </Panel>
    </Panel>
  );
};

export default PostWrapper;

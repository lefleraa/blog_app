import React, { useState } from 'react';
import cleanProps from 'clean-react-props';
import {
  Panel,
  PostBuilder,
  PanelControl,
  PanelGroup,
  MediaPool,
} from 'components';
import { SidePanel, TopBar } from 'layout';

///////////////////////////////////////////////
// POST PANEL
///////////////////////////////////////////////

const PostPanel = ({ ...rest }) => {
  return (
    <Panel
      className="PostPanel u-width-p-12 u-height-p-10 u-pos-absolute"
      {...cleanProps(rest)}
    >
      <Panel auto={true}>
        <PanelControl white>[Panel Heading Content]</PanelControl>
      </Panel>

      <Panel>
        <PanelGroup
          components={{
            heading: <PanelControl>[Control Content]</PanelControl>,
          }}
        >
          <p className="small m-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            quaerat nostrum dolore mollitia. Reprehenderit reiciendis cumque
            quam, consequatur doloremque rem in magni numquam, impedit, maiores
            sint! Impedit nulla officiis dolorem.Lorem ipsum dolor sit amet
            consectetur adipisicing elit.
          </p>
        </PanelGroup>
        <PanelGroup>
          <p className="small m-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            quaerat nostrum dolore mollitia. Reprehenderit reiciendis cumque
            quam, consequatur doloremque rem in magni numquam, impedit, maiores
            sint! Impedit nulla officiis dolorem.Lorem ipsum dolor sit amet
            consectetur adipisicing elit.
          </p>
        </PanelGroup>
        <PanelGroup>
          <p className="small m-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            quaerat nostrum dolore mollitia. Reprehenderit reiciendis cumque
            quam, consequatur doloremque rem in magni numquam, impedit, maiores
            sint! Impedit nulla officiis dolorem.Lorem ipsum dolor sit amet
            consectetur adipisicing elit.
          </p>
        </PanelGroup>
        <PanelGroup
          components={{
            heading: <PanelControl>[Control Content]</PanelControl>,
          }}
        >
          <p className="small m-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            quaerat nostrum dolore mollitia. Reprehenderit reiciendis cumque
            quam, consequatur doloremque rem in magni numquam, impedit, maiores
            sint! Impedit nulla officiis dolorem.Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Aspernatur quaerat nostrum dolore
            mollitia. Reprehenderit reiciendis cumque quam, consequatur
            doloremque rem in magni numquam, impedit, maiores sint! Impedit
            nulla officiis dolorem.Lorem ipsum dolor sit amet consectetur
            adipisicing elit.
          </p>
        </PanelGroup>
      </Panel>
    </Panel>
  );
};

const useLayoutProvider = () => {
  const defaults = {
    initThumbWidth: 110,
    initLeftPanelWidth: 275,
    initRightPanelWidth: 275,
  };

  const [leftPanelWidth, updateLeftPanelWidth] = useState(
    defaults.initLeftPanelWidth
  );

  const [rightPanelWidth, updateRightPanelWidth] = useState(
    defaults.initRightPanelWidth
  );

  return {
    thumbnailWidth: defaults.initThumbWidth,
    leftPanelWidth,
    rightPanelWidth,
    actions: {
      updateLeftPanelWidth,
      updateRightPanelWidth,
    },
  };
};

///////////////////////////////////////////////
// WRAPPER
///////////////////////////////////////////////

const Wrapper = ({ ...rest }) => {
  const layoutProvider = useLayoutProvider();

  return (
    <Panel
      className="u-width-p-12 u-height-p-10 u-pos-fixed"
      {...cleanProps(rest)}
    >
      <Panel auto={true}>
        <TopBar />
      </Panel>
      <Panel direction="row">
        <div className="u-pos-absolute u-width-p-12 u-height-p-10 u-overflow-hidden">
          {/* MAIN CANVAS POST BUILDER */}
          <PostBuilder {...layoutProvider} />

          {/* LEFT PANEL */}
          <SidePanel
            placement="left"
            resizable={true}
            minWidth={120}
            width={layoutProvider.leftPanelWidth}
            onResizeStop={({ width }) =>
              layoutProvider.actions.updateLeftPanelWidth(width)
            }
          >
            <MediaPool
              {...layoutProvider}
              thumbnailMaxWidth={layoutProvider.leftPanelWidth}
              hideThumbnailScale={layoutProvider.leftPanelWidth <= 120}
            />
          </SidePanel>

          {/* RIGHT PANEL */}
          <SidePanel
            placement="right"
            resizable={true}
            minWidth={250}
            maxWidth={320}
            width={layoutProvider.rightPanelWidth}
            onResizeStop={({ width }) =>
              layoutProvider.actions.updateRightPanelWidth(width)
            }
          >
            <PostPanel />
          </SidePanel>
        </div>
      </Panel>
    </Panel>
  );
};

export default Wrapper;

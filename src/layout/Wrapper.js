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

///////////////////////////////////////////////
// WRAPPER
///////////////////////////////////////////////

const Wrapper = ({ ...rest }) => {
  let defaultMediaPoolWidth = 300;
  const [mediaPanelWidth, calculateMediaPanelWidth] = useState(
    defaultMediaPoolWidth
  );

  let defaultPostPanelWidth = 300;
  const [postPanelWidth, calculatePostPanelWidth] = useState(
    defaultPostPanelWidth
  );

  let mediaPoolWidth = 40;
  return (
    <Panel
      className="u-width-p-12 u-height-p-10 u-pos-fixed"
      {...cleanProps(rest)}
    >
      <Panel auto={true}>
        <TopBar />
      </Panel>
      {/* <Panel auto={true}>
        <PanelControl auto white>
          Templates
        </PanelControl>
      </Panel> */}
      <Panel direction="row">
        <div className="u-pos-absolute u-width-p-12 u-height-p-10 u-overflow-hidden">
          <PostBuilder
            overlayLeftWidth={calculateMediaPanelWidth}
            overlayRightWidth={defaultPostPanelWidth}
          />
          <SidePanel
            placement="left"
            resizable={true}
            minWidth={120}
            defaultWidth={defaultMediaPoolWidth}
            onResize={width => calculateMediaPanelWidth(width)}
          >
            <MediaPool
              thumbMaxWidth={
                mediaPanelWidth - mediaPoolWidth ||
                defaultMediaPoolWidth - mediaPoolWidth
              }
            />
          </SidePanel>
          <SidePanel
            placement="right"
            resizable={true}
            minWidth={250}
            maxWidth={320}
            defaultWidth={defaultPostPanelWidth}
            onResize={width => calculatePostPanelWidth(width)}
          >
            <PostPanel />
          </SidePanel>
        </div>
        {/* <Panel auto={true}>
          <SidePanel
            placement="left"
            resizable={true}
            minWidth={120}
            defaultWidth={defaultMediaPoolWidth}
            onResize={width => calculateMediaPanelWidth(width)}
          >
            <MediaPool
              thumbMaxWidth={
                mediaPanelWidth - mediaPoolWidth ||
                defaultMediaPoolWidth - mediaPoolWidth
              }
            />
          </SidePanel>
        </Panel>
        <Panel>
          <PostBuilder />
        </Panel>
        <Panel auto={true}>
          <SidePanel placement="right" resizable={true}>
            <PostPanel />
          </SidePanel>
        </Panel> */}
      </Panel>
    </Panel>
  );
};

export default Wrapper;

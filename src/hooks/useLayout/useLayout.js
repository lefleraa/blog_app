import { useReducer, useLayoutEffect } from 'react';
import clamp from 'lodash-es/clamp';
import round from 'lodash-es/round';
import {
  // useCursorPosition,
  useWindowSize,
  useDebounce,
} from 'hooks';
import { initLayout, layoutReducer } from './reducer';

/////////////////////////////////
// HOOK PROVIDER
/////////////////////////////////

export const useLayout = () => {
  const [layoutState, dispatchLayout] = useReducer(layoutReducer, initLayout);

  const { zoom, elements } = layoutState || {};

  const { topBar, leftPanel, rightPanel, topPanel, bottomPanel, mainStage } =
    elements || {};

  // const {
  //   x: cursorX,
  //   y: cursorY,
  //   mouseover: cursorMouseover,
  // } = useCursorPosition();
  const { width, height } = useWindowSize();

  const windowWidth = useDebounce(width, 300);
  const windowHeight = useDebounce(height, 300);

  // Calculate visual panel dimensions based on if the panel is showing or not.
  // This is calculated seperately to preserve the expected set panel dims.
  // This is mainly used to properly calculate the mainStage viewable area,
  // though, it can be utilized in other creative ways (e.g. open panel on hover near)
  const visiblePanelDims = {
    left: {
      width: !!leftPanel.visible ? leftPanel.width : 0,
      height: !!leftPanel.visible ? leftPanel.height : 0,
    },
    right: {
      width: !!rightPanel.visible ? rightPanel.width : 0,
      height: !!rightPanel.visible ? rightPanel.height : 0,
    },
    top: {
      width: !!topPanel.visible ? topPanel.width || windowWidth : 0,
      height: !!topPanel.visible ? topPanel.height : 0,
    },
    bottom: {
      width: !!bottomPanel.visible ? bottomPanel.width || windowWidth : 0,
      height: !!bottomPanel.visible ? bottomPanel.height : 0,
    },
  };

  /////////////////////////////////
  // GENERATE DYNAMIC DIMENSIONS AND
  // CURSOR PROPS FOR MAIN STAGE
  /////////////////////////////////

  function deriveMainStageProps() {
    dispatchLayout({
      type: '_setMainStageState',
      payload: {
        width: windowWidth,
        height: windowHeight - topBar.height,
        viewable: {
          width:
            windowWidth -
            visiblePanelDims.left.width -
            visiblePanelDims.right.width,
          height:
            windowHeight -
            topBar.height -
            visiblePanelDims.top.height -
            visiblePanelDims.bottom.height,
          offset: {
            ...mainStage.offset,
            x: visiblePanelDims.left.width,
            y: visiblePanelDims.top.height,
          },
          // cursor: {
          //   x: !!cursorX ? cursorX - visiblePanelDims.left.width : -1,
          //   y: !!cursorY ? cursorY - visiblePanelDims.top.height - topBar.height : -1,
          //   mouseover:
          //     cursorX >= mainStage.viewable.offset.x &&
          //     cursorX <=
          //       mainStage.viewable.width + mainStage.viewable.offset.x &&
          //     cursorY >= mainStage.viewable.offset.y + topBar.height &&
          //     cursorY <=
          //       mainStage.viewable.height +
          //         mainStage.viewable.offset.y +
          //         topBar.height,
          // },
        },
      },
    });
  }

  /////////////////////////////////
  // GENERATE DYNAMIC DIMENSIONS AND
  // CURSOR PROPS FOR PANELS
  /////////////////////////////////

  function derivePanelProps() {
    dispatchLayout({
      type: '_setLeftPanelState',
      payload: {
        height: windowHeight - topBar.height,
        // cursor: {
        //   x: !!cursorX ? cursorX : -1,
        //   y: !!cursorY ? cursorY - topBar.height : -1,
        //   mouseover:
        //     !leftPanel.disabled &&
        //     cursorX < visiblePanelDims.left.width &&
        //     cursorY > topBar.height,
        // },
      },
    });
    dispatchLayout({
      type: '_setRightPanelState',
      payload: {
        height: windowHeight - topBar.height,
        // cursor: {
        //   x: !!cursorX ? cursorX - windowWidth + rightPanel.width : -1,
        //   y: !!cursorY ? cursorY - topBar.height : -1,
        //   mouseover:
        //     !rightPanel.disabled &&
        //     cursorX > windowWidth - visiblePanelDims.right.width &&
        //     cursorY > topBar.height,
        // },
      },
    });
    dispatchLayout({
      type: '_setTopPanelState',
      payload: {
        width: windowWidth,
        // cursor: {
        //   x: !!cursorX ? cursorX : -1,
        //   y: !!cursorY ? cursorY - topBar.height : -1,
        //   mouseover:
        //     !topPanel.disabled &&
        //     cursorX < topPanelWidth &&
        //     cursorY > topBar.height &&
        //     cursorY < topBar.height + visiblePanelDims.top.height,
        // },
      },
    });
    dispatchLayout({
      type: '_setBottomPanelState',
      payload: {
        width: windowWidth,
        // cursor: {
        //   x: !!cursorX ? cursorX : -1,
        //   y: !!cursorY ? cursorY - windowHeight + bottomPanel.height : -1,
        //   mouseover:
        //     !bottomPanel.disabled &&
        //     cursorX < bottomPanelWidth &&
        //     cursorY > windowHeight - visiblePanelDims.bottom.height &&
        //     cursorY < windowHeight,
        // },
      },
    });
  }

  /////////////////////////////////
  // DEFINE PANEL METHODS
  /////////////////////////////////

  const panelMethods = ({ action, element }) => {
    return {
      setSize: size => {
        dispatchLayout({
          type: action,
          payload: size,
        });
      },
      resetSize: () => {
        dispatchLayout({
          type: action,
          payload: {
            [!!element.vertical ? 'width' : 'height']: element[
              !!element.vertical ? 'initialWidth' : 'initialHeight'
            ],
          },
        });
      },
      toggle: () => {
        dispatchLayout({
          type: action,
          payload: {
            visible: !element.visible,
          },
        });
      },
      hide: () => {
        dispatchLayout({
          type: action,
          payload: {
            visible: false,
          },
        });
      },
      show: () => {
        dispatchLayout({
          type: action,
          payload: {
            visible: true,
          },
        });
      },
      disable: () => {
        dispatchLayout({
          type: action,
          payload: {
            disabled: true,
          },
        });
      },
      enable: () => {
        dispatchLayout({
          type: action,
          payload: {
            disabled: false,
          },
        });
      },
    };
  };

  /////////////////////////////////
  // HANDLE ZOOM METHODS
  /////////////////////////////////

  function handleSetZoomLevel(level) {
    const { levelMin, levelMax } = zoom;
    let roundedLevel = round(level, 1);
    let value = clamp(roundedLevel, levelMin, levelMax);
    dispatchLayout({
      type: '_setZoomState',
      payload: {
        level: value,
        percentage: round(value * 100),
        canZoomIn: !(roundedLevel >= levelMax),
        canZoomOut: !(roundedLevel <= levelMin),
      },
    });
  }

  /////////////////////////////////
  // CAUSE A RERENDER ONLY ON SPECIFIC
  // PROPERTY CHANGES
  /////////////////////////////////

  useLayoutEffect(() => {
    deriveMainStageProps();
    derivePanelProps();
  }, [
    // cursorX,
    // cursorY,
    // cursorMouseover,
    windowWidth,
    windowHeight,
    visiblePanelDims.left.width,
    visiblePanelDims.right.width,
    visiblePanelDims.top.height,
    visiblePanelDims.bottom.height,
  ]);

  return {
    ...layoutState,
    zoom: {
      ...layoutState.zoom,
      setLevel: level => {
        handleSetZoomLevel(level);
      },
      zoomIn: () => {
        handleSetZoomLevel(zoom.level + 0.1);
      },
      zoomOut: () => {
        handleSetZoomLevel(zoom.level - 0.1);
      },
      reset: () => {
        handleSetZoomLevel(1);
      },
    },
    elements: {
      ...elements,
      leftPanel: {
        ...leftPanel,
        ...panelMethods({
          action: '_setLeftPanelState',
          element: leftPanel,
        }),
      },
      rightPanel: {
        ...rightPanel,
        ...panelMethods({
          action: '_setRightPanelState',
          element: rightPanel,
        }),
      },
      topPanel: {
        ...topPanel,
        ...panelMethods({
          action: '_setTopPanelState',
          element: topPanel,
        }),
      },
      bottomPanel: {
        ...bottomPanel,
        ...panelMethods({
          action: '_setBottomPanelState',
          element: bottomPanel,
        }),
      },
    },
  };
};

export default useLayout;

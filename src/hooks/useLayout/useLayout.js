import { useReducer, useLayoutEffect } from 'react';
import clamp from 'lodash-es/clamp';
import round from 'lodash-es/round';
import { useDocument, useDebounce } from 'hooks';
import { initLayout, layoutReducer } from './reducer';

/////////////////////////////////
// HOOK PROVIDER
/////////////////////////////////

export const useLayout = () => {
  const [layoutState, dispatchLayout] = useReducer(layoutReducer, initLayout);

  const { zoom, elements } = layoutState || {};

  const { topBar, leftPanel, rightPanel, topPanel, bottomPanel, mainStage } =
    elements || {};

  const { window = {} } = useDocument();
  const { width, height } = window;

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
      },
    });
    dispatchLayout({
      type: '_setRightPanelState',
      payload: {
        height: windowHeight - topBar.height,
      },
    });
    dispatchLayout({
      type: '_setTopPanelState',
      payload: {
        width: windowWidth,
      },
    });
    dispatchLayout({
      type: '_setBottomPanelState',
      payload: {
        width: windowWidth,
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

import { useReducer, useLayoutEffect } from 'react';
import clamp from 'lodash-es/clamp';
import round from 'lodash-es/round';
import cloneDeep from 'lodash-es/cloneDeep';
import { useCursorPosition, useWindowSize, useDebounce } from 'hooks';

/////////////////////
//   INITIALIZE
/////////////////////

const _intialLayout = {
  zoom: {
    levelMin: 0.2,
    levelMax: 3,
    level: 1,
    percentage: 100,
    canZoomOut: true,
    canZoomIn: true,
  },
  elements: {
    mainStage: {
      visible: true,
      viewable: {
        offset: {
          x: 0,
          y: 0,
        },
        cursor: {
          x: 0,
          y: 0,
        },
      },
    },
    artboard: {
      width: document.documentElement.clientWidth * 0.6,
    },
    leftPanel: {
      vertical: true,
      width: 300,
      initialWidth: 300,
      minWidth: 90,
      maxWidth: 521,
      visible: false,
      resizable: true,
      disabled: false,
      cursor: {},
    },
    rightPanel: {
      vertical: true,
      width: 300,
      initialWidth: 300,
      minWidth: 90,
      maxWidth: 521, // '33.333333vw'
      visible: false,
      resizable: true,
      disabled: false,
      cursor: {},
    },
    topPanel: {
      vertical: false,
      height: 150,
      initialHeight: 150,
      minHeight: 100,
      maxHeight: 200,
      visible: false,
      resizable: true,
      disabled: false,
      cursor: {},
    },
    bottomPanel: {
      vertical: false,
      height: 150,
      initialHeight: 150,
      minHeight: 100,
      maxHeight: 200,
      visible: false,
      resizable: true,
      disabled: false,
      cursor: {},
    },
    topBar: {
      height: 50,
    },
  },
};

/////////////////////////////////
// REDUCER ACTIONS
/////////////////////////////////

function _layoutReducer(passedState, action = {}) {
  const state = cloneDeep(passedState);
  const { zoom = {} } = state;
  const { type, payload } = action;
  switch (type) {
    case '_resetLayoutState':
      return _intialLayout;
    case '_setLeftPanelState':
      return { ...updateLayoutState(state, payload, 'leftPanel') };
    case '_setRightPanelState':
      return { ...updateLayoutState(state, payload, 'rightPanel') };
    case '_setTopPanelState':
      return { ...updateLayoutState(state, payload, 'topPanel') };
    case '_setBottomPanelState':
      return { ...updateLayoutState(state, payload, 'bottomPanel') };
    case '_setMainStageState':
      return { ...updateLayoutState(state, payload, 'mainStage') };
    case '_setZoomState':
      return {
        ...state,
        zoom: {
          ...zoom,
          ...payload,
        },
      };
    default:
      return state;
  }
}

function updateLayoutState(state, payload, element) {
  if (!state || !element || !payload) {
    return;
  }
  const elements = Object.assign({}, state.elements);
  const newElement = Object.assign({}, elements[element]);
  const update = {
    [element]: { ...newElement, ...payload },
  };
  const newElements = { ...elements, ...update };
  return {
    ...state,
    elements: newElements,
  };
}

/////////////////////////////////
// HOOK PROVIDER
/////////////////////////////////

export const useLayout = () => {
  const [layoutState, dispatchLayout] = useReducer(
    _layoutReducer,
    _intialLayout
  );

  const { zoom, elements } = layoutState || {};

  const { topBar, leftPanel, rightPanel, topPanel, bottomPanel, mainStage } =
    elements || {};

  const {
    x: cursorX,
    y: cursorY,
    mouseover: cursorMouseover,
  } = useCursorPosition();
  const { width, height } = useWindowSize();

  const windowWidth = useDebounce(width, 300);
  const windowHeight = useDebounce(height, 300);

  // Calculate visual panel dimensions based on if the panel is showing or not.
  // This is calculated seperately to preserve the expected set panel dims.
  // This is mainly used to properly calculate the mainStage viewable area,
  // though, it can be utilized in other creative ways (e.g. open panel on hover near)
  const leftPanelWidth = !!leftPanel.visible ? leftPanel.width : 0;
  const leftPanelHeight = !!leftPanel.visible ? leftPanel.height : 0;
  const rightPanelWidth = !!rightPanel.visible ? rightPanel.width : 0;
  const rightPanelHeight = !!rightPanel.visible ? rightPanel.height : 0;
  const topPanelWidth = !!topPanel.visible ? topPanel.width : 0;
  const topPanelHeight = !!topPanel.visible ? topPanel.height : 0;
  const bottomPanelWidth = !!bottomPanel.visible ? bottomPanel.width : 0;
  const bottomPanelHeight = !!bottomPanel.visible ? bottomPanel.height : 0;

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
          width: windowWidth - leftPanelWidth - rightPanelWidth,
          height:
            windowHeight - topBar.height - topPanelHeight - bottomPanelHeight,
          offset: {
            ...mainStage.offset,
            x: leftPanelWidth,
            y: topPanelHeight,
          },
          cursor: {
            x: !!cursorX ? cursorX - leftPanelWidth : -1,
            y: !!cursorY ? cursorY - topPanelHeight - topBar.height : -1,
            mouseover:
              cursorX >= mainStage.viewable.offset.x &&
              cursorX <=
                mainStage.viewable.width + mainStage.viewable.offset.x &&
              cursorY >= mainStage.viewable.offset.y + topBar.height &&
              cursorY <=
                mainStage.viewable.height +
                  mainStage.viewable.offset.y +
                  topBar.height,
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
        cursor: {
          x: !!cursorX ? cursorX : -1,
          y: !!cursorY ? cursorY - topBar.height : -1,
          mouseover:
            !leftPanel.disabled &&
            cursorX < leftPanelWidth &&
            cursorY > topBar.height,
        },
      },
    });
    dispatchLayout({
      type: '_setRightPanelState',
      payload: {
        height: windowHeight - topBar.height,
        cursor: {
          x: !!cursorX ? cursorX - windowWidth + rightPanel.width : -1,
          y: !!cursorY ? cursorY - topBar.height : -1,
          mouseover:
            !rightPanel.disabled &&
            cursorX > windowWidth - rightPanelWidth &&
            cursorY > topBar.height,
        },
      },
    });
    dispatchLayout({
      type: '_setTopPanelState',
      payload: {
        width: windowWidth,
        cursor: {
          x: !!cursorX ? cursorX : -1,
          y: !!cursorY ? cursorY - topBar.height : -1,
          mouseover:
            !topPanel.disabled &&
            cursorX < topPanelWidth &&
            cursorY > topBar.height &&
            cursorY < topBar.height + topPanelHeight,
        },
      },
    });
    dispatchLayout({
      type: '_setBottomPanelState',
      payload: {
        width: windowWidth,
        cursor: {
          x: !!cursorX ? cursorX : -1,
          y: !!cursorY ? cursorY - windowHeight + bottomPanel.height : -1,
          mouseover:
            !bottomPanel.disabled &&
            cursorX < bottomPanelWidth &&
            cursorY > windowHeight - bottomPanelHeight &&
            cursorY < windowHeight,
        },
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
    cursorX,
    cursorY,
    cursorMouseover,
    windowWidth,
    windowHeight,
    leftPanelWidth,
    rightPanelWidth,
    topPanelHeight,
    bottomPanelHeight,
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

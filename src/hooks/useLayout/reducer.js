import cloneDeep from 'lodash-es/cloneDeep';

/////////////////////
//   INITIALIZE
/////////////////////

const initLayout = {
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
      width: 900,
      spacing: 10,
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

function layoutReducer(passedState, action = {}) {
  const state = cloneDeep(passedState);
  const { zoom = {} } = state;
  const { type, payload } = action;
  switch (type) {
    case '_resetLayoutState':
      return initLayout;
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

export { initLayout, layoutReducer };

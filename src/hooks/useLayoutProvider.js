import { useState } from 'react';
import { clamp, round } from 'lodash-es';

let windowResizeTimeout;
function watchWindow(callback) {
  window.addEventListener('resize', () => {
    clearTimeout(windowResizeTimeout);
    windowResizeTimeout = setTimeout(() => {
      if (typeof callback === 'function') {
        callback();
      }
    }, 200);
  });
}

export const useLayoutProvider = () => {
  /////////////////////
  //    CONFIGURE
  /////////////////////

  const config = {
    zoom: {
      levelMin: 0.1,
      levelMax: 2,
      level: 1,
      percentage: 100,
    },
    layout: {
      thumbnail: {
        initialWidth: 119, // try to get 2 columns in media pole on mount
      },
      window: {
        height: document.documentElement.clientHeight,
        width: document.documentElement.clientWidth,
      },
      mainStage: {
        visible: true,
      },
      leftPanel: {
        width: 300,
        initialWidth: 300,
        minWidth: 120,
        maxWidth: 521,
        visible: true,
        resizable: true,
      },
      rightPanel: {
        width: 300,
        initialWidth: 300,
        minWidth: 300,
        maxWidth: 300, // '33.333333vw'
        visible: true,
        resizable: false,
      },
      topPanel: {
        height: 150,
        initialHeight: 150,
        minHeight: 100,
        maxHeight: 200,
        visible: false,
        resizable: true,
      },
      bottomPanel: {
        height: 150,
        initialHeight: 150,
        minHeight: 100,
        maxHeight: 200,
        visible: false,
        resizable: true,
      },
    },
  };

  /////////////////////
  //       STATE
  /////////////////////

  ////// ZOOM //////
  const [zoomLevel, updateZoomLevel] = useState(config.zoom.level);
  const [zoomPercentage, updateZoomPercentage] = useState(
    config.zoom.percentage
  );
  const [canZoomIn, setCanZoomIn] = useState(true);
  const [canZoomOut, setCanZoomOut] = useState(true);

  ////// WINDOW //////
  const [windowWidth, updateWindowWidth] = useState(config.layout.window.width);
  const [windowHeight, updateWindowHeight] = useState(
    config.layout.window.height
  );

  ////// LEFT PANEL //////
  const [leftPanelWidth, updateLeftPanelWidth] = useState(
    config.layout.leftPanel.initialWidth
  );
  const [leftPanelVisible, setLeftPanelVisible] = useState(
    config.layout.leftPanel.visible
  );

  ////// RIGHT PANEL //////
  const [rightPanelWidth, updateRightPanelWidth] = useState(
    config.layout.rightPanel.initialWidth
  );
  const [rightPanelVisible, setRightPanelVisible] = useState(
    config.layout.rightPanel.visible
  );

  ////// TOP PANEL //////
  const [topPanelHeight, updateTopPanelHeight] = useState(
    config.layout.topPanel.initialHeight
  );
  const [topPanelVisible, setTopPanelVisible] = useState(
    config.layout.topPanel.visible
  );

  ////// BOTTOM PANEL //////
  const [bottomPanelHeight, updateBottomPanelHeight] = useState(
    config.layout.bottomPanel.initialHeight
  );
  const [bottomPanelVisible, setBottomPanelVisible] = useState(
    config.layout.bottomPanel.visible
  );

  ////// MAIN STAGE //////
  const [mainStageWidth, updateMainStageWidth] = useState(
    config.layout.mainStage.initialWidth
  );
  const [mainStageHeight, updateMainStageHeight] = useState(
    config.layout.mainStage.initialHeight
  );

  const [mainStageViewableHeight, updateMainStageViewableHeight] = useState();
  const [mainStageViewableWidth, updateMainStageViewableWidth] = useState();
  const [mainStageViewableOffsetX, updateMainStageViewableOffsetX] = useState(
    leftPanelWidth
  );
  const [mainStageViewableOffsetY, updateMainStageViewableOffsetY] = useState(
    0
  );

  const [mainStageVisible, setMainStageVisible] = useState(
    config.layout.mainStage.visible
  );

  /////////////////////
  //    HANDLERS
  /////////////////////

  function cascadeWindowSize() {
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;
    updateWindowWidth(width);
    updateWindowHeight(height);
    updateMainStageViewableArea({
      windowWidth: width,
      windowHeight: height,
    });
  }
  watchWindow(cascadeWindowSize);

  function updateMainStageViewableArea() {
    let calculatedWidth =
      windowWidth -
      (leftPanelVisible ? leftPanelWidth : 0) -
      (rightPanelVisible ? rightPanelWidth : 0);
    let calculatedheight =
      mainStageHeight -
      (topPanelVisible ? topPanelHeight : 0) -
      (bottomPanelVisible ? bottomPanelHeight : 0);
    updateMainStageViewableWidth(calculatedWidth);
    updateMainStageViewableHeight(calculatedheight);
    updateMainStageViewableOffsetX(leftPanelVisible ? leftPanelWidth : 0);
    updateMainStageViewableOffsetY(topPanelVisible ? topPanelHeight : 0);
  }

  function handleSetZoomLevel(level) {
    const { levelMin, levelMax } = config.zoom;
    let roundedLevel = round(level, 1);
    let value = clamp(roundedLevel, levelMin, levelMax);
    updateZoomLevel(value);
    updateZoomPercentage(round(value * 100));
    setCanZoomIn(!(roundedLevel >= levelMax));
    setCanZoomOut(!(roundedLevel <= levelMin));
  }

  function panelMethods({
    sizeFunction,
    sizeFunctionMethodName,
    visibilityFunction,
    currentVisibility,
    defaultSize,
  }) {
    return {
      [sizeFunctionMethodName]: size => {
        sizeFunction(size);
        updateMainStageViewableArea();
      },
      reset: !!(defaultSize != undefined)
        ? () => {
            sizeFunction(defaultSize);
            updateMainStageViewableArea();
          }
        : null,
      setVisibility: show => {
        visibilityFunction(show);
        updateMainStageViewableArea();
      },
      toggleVisibility: !!(currentVisibility != undefined)
        ? () => {
            visibilityFunction(!currentVisibility);
            updateMainStageViewableArea();
          }
        : null,
      show: () => {
        visibilityFunction(true);
        updateMainStageViewableArea();
      },
      hide: () => {
        visibilityFunction(false);
        updateMainStageViewableArea();
      },
    };
  }

  /////////////////////
  //      RETURN
  /////////////////////

  return {
    ////// ZOOM //////

    zoom: {
      ...config.zoom,
      level: zoomLevel,
      percentage: zoomPercentage,
      canZoomIn,
      canZoomOut,
      setZoomLevel: level => {
        handleSetZoomLevel(level);
      },
      zoomIn: () => {
        handleSetZoomLevel(zoomLevel + 0.1);
      },
      zoomOut: () => {
        handleSetZoomLevel(zoomLevel - 0.1);
      },
      reset: () => {
        handleSetZoomLevel(1);
      },
    },

    ////// LAYOUT //////

    layout: {
      ...config.layout,

      thumbnail: {
        ...config.layout.thumbnail,
      },

      window: {
        ...config.layout.window,
        width: windowWidth,
        height: windowHeight,
      },

      mainStage: {
        ...config.layout.mainStage,
        width: mainStageWidth,
        height: mainStageHeight,
        visible: mainStageVisible,
        viewable: {
          width: mainStageViewableWidth,
          height: mainStageViewableHeight,
          offsetX: mainStageViewableOffsetX,
          offsetY: mainStageViewableOffsetY,
          update: () => {
            updateMainStageViewableArea();
          },
        },
        ...panelMethods({
          sizeFunction: updateMainStageWidth,
          sizeFunctionMethodName: 'setWidth',
          visibilityFunction: setMainStageVisible,
          currentVisibility: mainStageVisible,
        }),
        setHeight: height => {
          updateMainStageHeight(height);
          updateMainStageViewableArea();
        },
      },

      leftPanel: {
        ...config.layout.leftPanel,
        width: leftPanelWidth,
        height: mainStageHeight,
        visible: leftPanelVisible,
        ...panelMethods({
          sizeFunction: updateLeftPanelWidth,
          sizeFunctionMethodName: 'setWidth',
          visibilityFunction: setLeftPanelVisible,
          currentVisibility: leftPanelVisible,
          defaultSize: config.layout.leftPanel.initialWidth,
        }),
      },

      rightPanel: {
        ...config.layout.rightPanel,
        width: rightPanelWidth,
        height: mainStageHeight,
        visible: rightPanelVisible,
        ...panelMethods({
          sizeFunction: updateRightPanelWidth,
          sizeFunctionMethodName: 'setWidth',
          visibilityFunction: setRightPanelVisible,
          currentVisibility: rightPanelVisible,
          defaultSize: config.layout.rightPanel.initialWidth,
        }),
      },

      topPanel: {
        ...config.layout.topPanel,
        height: topPanelHeight,
        width: mainStageWidth,
        visible: topPanelVisible,
        ...panelMethods({
          sizeFunction: updateTopPanelHeight,
          sizeFunctionMethodName: 'setHeight',
          visibilityFunction: setTopPanelVisible,
          currentVisibility: topPanelVisible,
          defaultSize: config.layout.topPanel.initialHeight,
        }),
      },

      bottomPanel: {
        ...config.layout.bottomPanel,
        height: bottomPanelHeight,
        width: mainStageWidth,
        visible: bottomPanelVisible,
        ...panelMethods({
          sizeFunction: updateBottomPanelHeight,
          sizeFunctionMethodName: 'setHeight',
          visibilityFunction: setBottomPanelVisible,
          currentVisibility: bottomPanelVisible,
          defaultSize: config.layout.bottomPanel.initialHeight,
        }),
      },
    },
  };
};

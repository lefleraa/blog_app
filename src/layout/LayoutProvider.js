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

  const viewTypes = {
    desktop: 'desktop',
    mobile: 'mobile',
  };

  const config = {
    view: {
      activeView: viewTypes.desktop,
    },
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
        maxWidth: '33.333333vw',
        visible: true,
        resizable: true,
      },
      rightPanel: {
        width: 300,
        initialWidth: 300,
        minWidth: 300,
        maxWidth: 300,
        visible: true,
        resizable: false,
      },
      topPanel: {
        height: 150,
        initialHeight: 150,
        minHeight: 100,
        maxHeight: 200,
        visible: false,
        resizable: false,
      },
      bottomPanel: {
        height: 150,
        initialHeight: 150,
        minHeight: 100,
        maxHeight: 200,
        visible: false,
        resizable: false,
      },
    },
  };

  /////////////////////
  //       STATE
  /////////////////////

  ////// VIEW //////
  const [activeView, setActiveViewMode] = useState(config.view.activeView);

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
  const [mainStageOffsetX, updateMainStageOffsetX] = useState(leftPanelWidth);
  const [mainStageOffsetY, updateMainStageOffsetY] = useState(0);

  const [mainStageVisible, setMainStageVisible] = useState(
    config.layout.mainStage.visible
  );

  /////////////////////
  //    HANDLERS
  /////////////////////

  function updateWindowSize() {
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;
    updateWindowWidth(width);
    updateWindowHeight(height);
    updateMainStageViewableArea({
      windowWidth: width,
      windowHeight: height,
    });
  }
  watchWindow(updateWindowSize);

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
    updateMainStageOffsetX(leftPanelWidth);
    updateMainStageOffsetY(topPanelHeight);
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

  /////////////////////
  //      RETURN
  /////////////////////

  return {
    ////// VIEW //////

    view: {
      ...config.view,
      types: viewTypes,
      activeView,
      setViewMode: mode => {
        setActiveViewMode(mode);
      },
    },

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
        viewable: {
          width: mainStageViewableWidth,
          height: mainStageViewableHeight,
          offsetX: mainStageOffsetX,
          offsetY: mainStageOffsetY,
          update: () => {
            updateMainStageViewableArea();
          },
        },
        visible: mainStageVisible,
        setWidth: width => {
          updateMainStageWidth(width);
          updateMainStageViewableArea();
        },
        setHeight: height => {
          updateMainStageHeight(height);
          updateMainStageViewableArea();
        },
        setVisibility: show => {
          setMainStageVisible(show);
          updateMainStageViewableArea();
        },
        toggleVisibility: () => {
          setMainStageVisible(!mainStageVisible);
          updateMainStageViewableArea();
        },
        show: () => {
          setMainStageVisible(true);
          updateMainStageViewableArea();
        },
        hide: () => {
          setMainStageVisible(false);
          updateMainStageViewableArea();
        },
      },

      leftPanel: {
        ...config.layout.leftPanel,
        width: leftPanelWidth,
        height: mainStageHeight,
        visible: leftPanelVisible,
        setWidth: width => {
          updateLeftPanelWidth(width);
          updateMainStageViewableArea();
        },
        resetWidth: () => {
          updateLeftPanelWidth(config.layout.leftPanel.initialWidth);
          updateMainStageViewableArea();
        },
        setVisibility: show => {
          setLeftPanelVisible(show);
          updateMainStageViewableArea();
        },
        toggleVisibility: () => {
          setLeftPanelVisible(!leftPanelVisible);
          updateMainStageViewableArea();
        },
        show: () => {
          setLeftPanelVisible(true);
          updateMainStageViewableArea();
        },
        hide: () => {
          setLeftPanelVisible(false);
          updateMainStageViewableArea();
        },
      },

      rightPanel: {
        ...config.layout.rightPanel,
        width: rightPanelWidth,
        height: mainStageHeight,
        visible: rightPanelVisible,
        setWidth: width => {
          updateRightPanelWidth(width);
          updateMainStageViewableArea();
        },
        resetWidth: () => {
          updateRightPanelWidth(config.layout.rightPanel.initialWidth);
          updateMainStageViewableArea();
        },
        setVisibility: show => {
          setRightPanelVisible(show);
          updateMainStageViewableArea();
        },
        toggleVisibility: () => {
          setRightPanelVisible(!rightPanelVisible);
          updateMainStageViewableArea();
        },
        show: () => {
          setRightPanelVisible(true);
          updateMainStageViewableArea();
        },
        hide: () => {
          setRightPanelVisible(false);
          updateMainStageViewableArea();
        },
      },

      topPanel: {
        ...config.layout.topPanel,
        height: topPanelHeight,
        width: mainStageWidth,
        visible: topPanelVisible,
        setHeight: height => {
          updateTopPanelHeight(height);
          updateMainStageViewableArea();
        },
        resetHeight: () => {
          updateTopPanelHeight(config.layout.topPanel.initialHeight);
          updateMainStageViewableArea();
        },
        setVisibility: show => {
          setTopPanelVisible(show);
          updateMainStageViewableArea();
        },
        toggleVisibility: () => {
          setTopPanelVisible(!topPanelVisible);
          updateMainStageViewableArea();
        },
        show: () => {
          setTopPanelVisible(true);
          updateMainStageViewableArea();
        },
        hide: () => {
          setTopPanelVisible(false);
          updateMainStageViewableArea();
        },
      },

      bottomPanel: {
        ...config.layout.bottomPanel,
        height: bottomPanelHeight,
        width: mainStageWidth,
        visible: bottomPanelVisible,
        setHeight: height => {
          updateBottomPanelHeight(height);
          updateMainStageViewableArea();
        },
        resetHeight: () => {
          updateBottomPanelHeight(config.layout.bottomPanel.initialHeight);
          updateMainStageViewableArea();
        },
        setVisibility: show => {
          setBottomPanelVisible(show);
          updateMainStageViewableArea();
        },
        toggleVisibility: () => {
          setBottomPanelVisible(!bottomPanelVisible);
          updateMainStageViewableArea();
        },
        show: () => {
          setBottomPanelVisible(true);
          updateMainStageViewableArea();
        },
        hide: () => {
          setBottomPanelVisible(false);
          updateMainStageViewableArea();
        },
      },
    },
  };
};

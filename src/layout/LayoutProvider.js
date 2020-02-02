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
    api: 'api',
  };

  const config = {
    view: {
      activeView: viewTypes.api,
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
      },
      rightPanel: {
        width: 350,
        initialWidth: 350,
        minWidth: 350,
        maxWidth: 420,
        visible: true,
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
    let calculatedWidth = windowWidth - leftPanelWidth - rightPanelWidth;
    let calculatedheight = mainStageHeight;
    updateMainStageViewableWidth(calculatedWidth);
    updateMainStageViewableHeight(calculatedheight);
    updateMainStageOffsetX(leftPanelWidth);
    updateMainStageOffsetY(0);
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
          offset: {
            x: mainStageOffsetX,
            y: mainStageOffsetY,
          },
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
        },
        toggleVisibility: () => {
          setMainStageVisible(!mainStageVisible);
        },
        show: () => {
          setMainStageVisible(true);
        },
        hide: () => {
          setMainStageVisible(false);
        },
      },

      leftPanel: {
        ...config.layout.leftPanel,
        width: leftPanelWidth,
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
        },
        toggleVisibility: () => {
          setLeftPanelVisible(!leftPanelVisible);
        },
        show: () => {
          setLeftPanelVisible(true);
        },
        hide: () => {
          setLeftPanelVisible(false);
        },
      },
      rightPanel: {
        ...config.layout.rightPanel,
        width: rightPanelWidth,
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
        },
        toggleVisibility: () => {
          setRightPanelVisible(!rightPanelVisible);
        },
        show: () => {
          setRightPanelVisible(true);
        },
        hide: () => {
          setRightPanelVisible(false);
        },
      },
    },
  };
};

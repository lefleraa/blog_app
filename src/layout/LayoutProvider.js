import { useState } from 'react';
import { clamp, round } from 'lodash-es';

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
      leftPanel: {
        width: 300,
        initialWidth: 300,
        minWidth: 120,
        maxWidth: '33.333333vw',
        visible: true,
      },
      rightPanel: {
        width: 300,
        initialWidth: 300,
        minWidth: 250,
        maxWidth: 320,
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

  ////// LAYOUT //////
  const [leftPanelWidth, updateLeftPanelWidth] = useState(
    config.layout.leftPanel.initialWidth
  );
  const [rightPanelWidth, updateRightPanelWidth] = useState(
    config.layout.rightPanel.initialWidth
  );
  const [leftPanelVisible, setLeftPanelVisible] = useState(
    config.layout.leftPanel.visible
  );
  const [rightPanelVisible, setRightPanelVisible] = useState(
    config.layout.rightPanel.visible
  );

  /////////////////////
  //    HANDLERS
  /////////////////////

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
      leftPanel: {
        ...config.layout.leftPanel,
        width: leftPanelWidth,
        visible: leftPanelVisible,
        setWidth: width => {
          updateLeftPanelWidth(width);
        },
        resetWidth: () => {
          updateLeftPanelWidth(config.layout.leftPanel.initialWidth);
        },
        setVisibility: show => {
          setLeftPanelVisible(show);
        },
        show: () => {
          setLeftPanelVisible(true);
        },
        hide: () => {
          setLeftPanelVisible(false);
        },
        toggleVisibility: () => {
          setLeftPanelVisible(!leftPanelVisible);
        },
      },
      rightPanel: {
        ...config.layout.rightPanel,
        width: rightPanelWidth,
        visible: rightPanelVisible,
        setWidth: width => {
          updateRightPanelWidth(width);
        },
        resetWidth: () => {
          updateRightPanelWidth(config.layout.leftPanel.initialWidth);
        },
        setVisibility: show => {
          setRightPanelVisible(show);
        },
        show: () => {
          setRightPanelVisible(true);
        },
        hide: () => {
          setRightPanelVisible(false);
        },
        toggleVisibility: () => {
          setRightPanelVisible(!rightPanelVisible);
        },
      },
    },
  };
};

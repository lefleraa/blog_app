import { useState } from 'react';
import { clamp, round } from 'lodash-es';

export const useLayoutProvider = () => {
  /////////////////////
  //    CONFIGURE
  /////////////////////

  const viewModeTypes = {
    desktop: 'desktop',
    mobile: 'mobile',
  };

  const init = {
    thumbnailWidth: 110,
    activeViewMode: viewModeTypes.desktop,
    minZoomLevel: 0.1,
    maxZoomLevel: 2,
    zoomLevel: 1,
    zoomPercentage: 100,
    leftPanelWidth: 300,
    rightPanelWidth: 300,
    leftPanelVisible: true,
    rightPanelVisible: true,
  };

  /////////////////////
  //       VIEW
  /////////////////////

  const [activeViewMode, updateViewMode] = useState(init.activeViewMode);
  function setViewMode(mode) {
    updateViewMode(mode);
  }

  /////////////////////
  //       ZOOM
  /////////////////////

  const [zoomLevel, updateZoomLevel] = useState(init.zoomLevel);
  const [zoomPercentage, updateZoomPercentage] = useState(init.zoomPercentage);
  const [canZoomIn, setCanZoomIn] = useState(true);
  const [canZoomOut, setCanZoomOut] = useState(true);
  function setZoomLevel(level) {
    let roundedLevel = round(level, 1);
    let value = clamp(roundedLevel, init.minZoomLevel, init.maxZoomLevel);
    updateZoomLevel(value);
    updateZoomPercentage(round(value * 100));
    setCanZoomIn(!(roundedLevel >= init.maxZoomLevel));
    setCanZoomOut(!(roundedLevel <= init.minZoomLevel));
  }

  function zoomOut() {
    setZoomLevel(zoomLevel - 0.1);
  }

  function zoomIn() {
    setZoomLevel(zoomLevel + 0.1);
  }

  /////////////////////
  //      LAYOUT
  /////////////////////

  const [leftPanelWidth, updateLeftPanelWidth] = useState(init.leftPanelWidth);
  function setLeftPanelWidth(width) {
    updateLeftPanelWidth(width);
  }

  const [rightPanelWidth, updateRightPanelWidth] = useState(
    init.rightPanelWidth
  );
  function setRightPanelWidth(width) {
    updateRightPanelWidth(width);
  }

  const [leftPanelVisible, setLeftPanelVisible] = useState(
    init.leftPanelVisible
  );
  function showLeftPanel(show) {
    setLeftPanelVisible(show);
  }
  function toggleLeftPanel() {
    setLeftPanelVisible(!leftPanelVisible);
  }

  const [rightPanelVisible, setRightPanelVisible] = useState(
    init.rightPanelVisible
  );
  function showRightPanel(show) {
    setRightPanelVisible(show);
  }
  function toggleRightPanel() {
    setRightPanelVisible(!rightPanelVisible);
  }

  /////////////////////
  //      RETURN
  /////////////////////

  return {
    view: {
      viewModeTypes,
      activeViewMode,
      setViewMode,
    },
    zoom: {
      zoomLevel,
      zoomPercentage,
      canZoomIn,
      canZoomOut,
      minZoomLevel: init.minZoomLevel,
      maxZoomLevel: init.maxZoomLevel,
      setZoomLevel,
      zoomIn,
      zoomOut,
    },
    layout: {
      initialThumbnailWidth: init.thumbnailWidth,
      defaultLeftPanelWidth: init.leftPanelWidth,
      defaultRightPanelWidth: init.rightPanelWidth,
      leftPanelWidth,
      rightPanelWidth,
      leftPanelVisible,
      rightPanelVisible,
      setLeftPanelWidth,
      setRightPanelWidth,
      showLeftPanel,
      showRightPanel,
      toggleLeftPanel,
      toggleRightPanel,
    },
  };
};

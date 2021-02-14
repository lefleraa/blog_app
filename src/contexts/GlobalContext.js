import React, { createContext } from 'react';
import { useLayout, useWindowSize } from 'hooks';

const GlobalContext = createContext({
  layout: {},
  window: {},
});

const GlobalContextProvider = ({ children }) => {
  const value = {
    layout: useLayout(),
    window: useWindowSize(),
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalContextProvider };

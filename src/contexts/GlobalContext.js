import React, { createContext } from 'react';
import { useCursorPosition, useLayout, useWindowSize } from 'hooks';

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  console.log('render');
  return (
    <GlobalContext.Provider
      value={{
        layout: useLayout(),
        cursor: useCursorPosition(),
        window: useWindowSize(),
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalContextProvider };
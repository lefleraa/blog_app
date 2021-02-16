import React, { createContext } from 'react';
import { useLayout, useDocument } from 'hooks';

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const value = {
    layout: { ...useLayout() },
    document: { ...useDocument() },
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalContextProvider };

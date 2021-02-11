import React from 'react';
import { Post } from 'pages';
import { GlobalContextProvider } from 'contexts';

const App = () => {
  return (
    <GlobalContextProvider>
      <Post />
    </GlobalContextProvider>
  );
};

export default App;

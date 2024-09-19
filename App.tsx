import React, { useEffect } from 'react';
import Navigation from './src/navigation/Navigation';
// import { storage } from './src/utility/MMKV';
import { refreshTokens } from './src/utility/RefreshToken';

const App = () => {

  // storage.clearAll();


  useEffect(() => {
    refreshTokens()
  }, []);

  return <Navigation />;
};

export default App;
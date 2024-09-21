import React, { useEffect } from 'react';
import Navigation from './src/navigation/Navigation';
import { refreshTokens } from './src/utility/RefreshToken';

const App = () => {

  useEffect(() => {
    refreshTokens()
  }, []);

  return <Navigation />;
};

export default App;
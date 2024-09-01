import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import StackNavigator from './src/navigation/StackNavigator';
import TabNavigator from './src/navigation/TabNavigator';
const App = () => {
  return (
    <NavigationContainer>
      {/* <StackNavigator /> */}
      <TabNavigator />
    </NavigationContainer>
  );
};

export default App;
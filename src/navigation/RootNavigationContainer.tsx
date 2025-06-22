import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import RootNavigator from './RootNavigator';
const RootNavigationContainer = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default RootNavigationContainer;

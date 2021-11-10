import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import TabNavigator from '../TabNavigator';

const RootNavigator = () => {
  return (
    <NavigationContainer independent={true}>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default RootNavigator;

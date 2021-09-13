import * as React from 'react';
import Main from '../screens/main';

import { createStackNavigator } from '@react-navigation/stack';

const MainStack = createStackNavigator();

const MainRoutes: React.FC = () => {
    return (
        <MainStack.Navigator screenOptions={{ headerShown: false }}>
            <MainStack.Screen name="Main" component={Main} />
        </MainStack.Navigator>
    );
}

export default MainRoutes
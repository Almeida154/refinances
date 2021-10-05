import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StatusBar } from 'react-native';

import RootNavigator from '../navigation/RootNavigator';

import {PropsMainRoutes} from '../@types/RootStackParamApp';
import { RouteProp } from '@react-navigation/core';
import {UseDadosTemp} from '../contexts/TemporaryDataContext'

export type PropsMain = {
    navigation: StackNavigationProp<PropsMainRoutes, "Main">,    
    route: RouteProp<PropsMainRoutes, "Main">,
}

const Main = ({route, navigation}: PropsMain) => {
    const {setNavigation} = UseDadosTemp()
    
    setNavigation(navigation)
    return (
        <>
            <StatusBar translucent={true} backgroundColor='transparent'/>
            <RootNavigator />
        </>
    );
};

export default Main;
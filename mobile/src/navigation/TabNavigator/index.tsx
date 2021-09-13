import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Home from '../../screens/Home';
import Charts from '../../screens/Charts';
import Variados from '../../screens/Variados';
import FormLancamentos from '../../screens/FormLancamento';

import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Fontisto';

import { GestureResponderEvent, TouchableOpacity, View } from 'react-native';

const Tab = createBottomTabNavigator();

type PropsCustomBar = {
    children: React.ReactNode;
    onPress: ((e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | GestureResponderEvent) => void) | undefined
}

const CustomTabBarButton = ({ children, onPress }: PropsCustomBar) => {
    return (
        <TouchableOpacity
            style={{
                top: -30,
                justifyContent: 'center',
                alignItems: 'center',
            }}
            onPress={onPress}>
            <View
                style={{
                    width: 70,
                    height: 70,
                    borderRadius: 35,
                    backgroundColor: '#e32f45'
                }}>
                {children}
            </View>
        </TouchableOpacity>
    )
}

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    borderTopColor: '#66666666',
                    backgroundColor: 'transparent',
                    elevation: 0,
                    zIndex: 999 
                }
                                 
                // activeTintColor: 'white',
                // inactiveTintColor: '#d9d9d9',
                
            }}
        >

            <Tab.Screen name="Home" component={Home} options={{
                tabBarIcon: ({ color }) => <Icon name='home' color={color} size={24} />,

            }}
            />
            <Tab.Screen name="Lançamentos" component={Home} options={{
                tabBarIcon: ({ color }) => <Icon name='inbox' color={color} size={24} />,

            }}
            />

            
            
                <Tab.Screen name="Post" component={FormLancamentos} options={{                
                    tabBarLabel: () => null,
                    tabBarIcon: ({ color }) => <Icon name='plus' color={color} size={24} />,
                    tabBarButton: (props) => {
                        return (< CustomTabBarButton children={props.children} onPress={props.onPress} />
                        )
                    }

                }}
                />  
            
            
            <Tab.Screen name="Gráficos" component={Charts} options={{
                tabBarIcon: ({ color }) => <Icon name='piechart' color={color} size={24} />,

            }} />
            <Tab.Screen name="Variados" component={Variados} options={{
                tabBarIcon: ({ color }) => <Icon2  name='preview' color={color} size={24} />,

            }} />
        </Tab.Navigator >
    );
};


export default TabNavigator;
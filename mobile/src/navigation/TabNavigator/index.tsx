import React, {useLayoutEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

import RootStackParamApp, {FormLancamentoStack, HomeLancamentoStack} from '../../@types/RootStackParamApp'

import Home from '../../screens/dashboard/Home';
import Charts from '../../screens/dashboard/Charts';
import Variados from '../../screens/dashboard/Sundry';
import Extrato from '../../screens/dashboard/Extract';
import FormLancamentos from '../../screens/dashboard/Entries';
import AddCategory from '../../screens/dashboard/Entries/components/AddCategory'

import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Fontisto';

import { GestureResponderEvent, TouchableOpacity, View, Text } from 'react-native';

const Tab = createBottomTabNavigator<RootStackParamApp>();

type PropsCustomBar = {
    children: React.ReactNode;
    onPress: ((e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | GestureResponderEvent) => void) | undefined
}

const FormStack = createStackNavigator<FormLancamentoStack>()
const FormLancamentoStackNavigation = ({route, navigation}) => {
    
    return (
        <FormStack.Navigator>
            <FormStack.Screen name="Main" component={FormLancamentos}/>
            <FormStack.Screen name="AddCategory" component={AddCategory}/>
        </FormStack.Navigator>
    )
}

const HomeStack = createStackNavigator<HomeLancamentoStack>()
const HomeLancamentoStackNavigation = ({route, navigation}) => {
    
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Main" component={Home}/>
            
        </HomeStack.Navigator>
    )
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
                    zIndex: 999 ,                                        
                }
                                 
                // activeTintColor: 'white',
                // inactiveTintColor: '#d9d9d9',
                
            }}
        >

            <Tab.Screen name="Home" component={Home} options={{
                tabBarIcon: ({ color }) => <Icon name='home' color={color} size={24} />,

            }}
            />
            <Tab.Screen name="Extrato" component={Extrato} options={{
                tabBarIcon: ({ color }) => <Icon name='inbox' color={color} size={24} />,

            }}
            />

            
            
                <Tab.Screen name="Lancamentos" component={FormLancamentoStackNavigation} options={{                
                    tabBarLabel: () => null,
                    headerShown: false,
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
            <Tab.Screen name="Otimizar" component={Variados} options={{
                tabBarIcon: ({ color }) => <Icon2  name='preview' color={color} size={24} />,

            }} />
        </Tab.Navigator >
    );
};


export default TabNavigator;
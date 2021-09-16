import react from 'react';
import { NavigatorScreenParams } from '@react-navigation/native'

export type RootStackParamAppFormLancamento = {
    Main: undefined;      
    
    SelectionCategorias: undefined;
}

type PropsNavigationApp = {
    Main: undefined;
    FormLancamento: NavigatorScreenParams<RootStackParamAppFormLancamento>;      
}

export default PropsNavigationApp;
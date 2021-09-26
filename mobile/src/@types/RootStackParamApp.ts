import react from 'react';
import { NavigatorScreenParams } from '@react-navigation/native'

export type RootStackParamAppFormLancamento = {
    Main: undefined;      
    
    SelectionCategorias: undefined;
}

type PropsNavigationApp = {
    Home: undefined;
    Lancamentos: NavigatorScreenParams<RootStackParamAppFormLancamento>;      
    Extrato: undefined;
    Gráficos: undefined;
    Otimizar: undefined;
}

export default PropsNavigationApp;
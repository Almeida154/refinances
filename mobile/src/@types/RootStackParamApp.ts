import react from 'react';
import { NavigatorScreenParams } from '@react-navigation/native'

export type HomeAccountStack = {    

    ManageAccount: undefined;
    CreateAccount: undefined;
}

export type FormLancamentoStack = {
    Main: undefined;      
    
    AddCategory: {tipoCategoria: string};
}

type PropsNavigationApp = {
    Home: undefined;
    Lancamentos: NavigatorScreenParams<FormLancamentoStack>;      
    Extrato: undefined;
    Gráficos: undefined;
    Otimizar: undefined;
}

export type PropsMainRoutes = {
    Main: NavigatorScreenParams<PropsNavigationApp>
    StackAccount: NavigatorScreenParams<HomeAccountStack>
    Lancamentos: NavigatorScreenParams<FormLancamentoStack>      
}

export default PropsNavigationApp;
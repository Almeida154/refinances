import react from 'react';
import { NavigatorScreenParams } from '@react-navigation/native'

export type HomeLancamentoStack = {
    Main: undefined;

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

export default PropsNavigationApp;
import react from 'react';
import { NavigatorScreenParams } from '@react-navigation/native';

export type HomeAccountStack = {
  Home: undefined;
  ManageAccount: undefined;
  CreateAccount: undefined;
  AddCategoryAccount: undefined;
};

export type GoalsStack = {
  GoalsList: undefined;
  CreateGoals: undefined;
  InvestGoals: undefined;
  GoalDetails: undefined;
  GoalsDashboard: undefined;
};

export type FormLancamentoStack = {
  Main: undefined;

  AddCategory: { tipoCategoria: string };
};

type PropsNavigationApp = {
  Home: undefined;
  Lancamentos: NavigatorScreenParams<FormLancamentoStack>;
  Extrato: undefined;
  Gráficos: undefined;
  Otimizar: undefined;
};

export type PropsMainRoutes = {
  Main: NavigatorScreenParams<PropsNavigationApp>;
  StackAccount: NavigatorScreenParams<HomeAccountStack>;
  Lancamentos: NavigatorScreenParams<FormLancamentoStack>;
  GoalsStack: NavigatorScreenParams<GoalsStack>;
};

export default PropsNavigationApp;

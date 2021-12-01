import react from 'react';
import { NavigatorScreenParams } from '@react-navigation/native';
import {Conta} from '../contexts/AccountContext'
import {Categoria} from '../contexts/CategoriesContext'

export type HomeAccountStack = {
  ManageAccount: undefined;
  CreateAccount: {receiveAccount: Conta | undefined, accountType: string};
  AddCategoryAccount: undefined;
  ManageCategory: undefined;
  NewCategory: undefined;
  EditCategory: { category: Categoria };
  Config: undefined;
  EditProfile: { route: string };
};

export type GoalsStack = {
  GoalsList: undefined;
  CreateGoals: undefined;
  InvestGoals: { goalId: number };
  EditGoals: { goalId: number };
  GoalDetails: { goalId: number };
};

export type FormLancamentoStack = {
  Main: undefined | any;
  AddCategory: { tipoCategoria: string };
  RecognizeVoice: undefined;
};

type PropsNavigationApp = {
  Home: undefined;
  Lancamentos: NavigatorScreenParams<FormLancamentoStack>;
  Extrato: undefined;
  Gráficos: undefined;
  Metas: undefined;
};

export type PropsMainRoutes = {
  Main: NavigatorScreenParams<PropsNavigationApp>;
  StackAccount: NavigatorScreenParams<HomeAccountStack>;
  Lancamentos: NavigatorScreenParams<FormLancamentoStack>;
  GoalsStack: NavigatorScreenParams<GoalsStack>;
};

export default PropsNavigationApp;

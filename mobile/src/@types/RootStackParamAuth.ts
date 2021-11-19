import react from 'react';

type PropsNavigationAuth = {
  Login: undefined;

  PasswordRecovery: undefined;

  Name: undefined;
  Email: undefined;
  Password: undefined;
  ConfirmPassword: undefined;
  Photo: undefined;
  Account: undefined;

  FixedExpenses: undefined;
  EachFixedExpense: undefined;
  EachFixedExpenseCategory: { createdCategoryName?: string };

  FixedIncomes: undefined;
  EachFixedIncome: undefined;
  EachFixedIncomeCategory: { createdCategoryName?: string };

  NewCategory: { screen?: string };
  NewExpenseCategory: undefined;
  NewIncomeCategory: undefined;

  StatsInitial: undefined;
};

export default PropsNavigationAuth;

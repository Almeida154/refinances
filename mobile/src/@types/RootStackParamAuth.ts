import react from 'react';

type PropsNavigationAuth = {
  Login: undefined;

  PasswordRecovery: undefined;

  Name: undefined;
  Email: undefined;
  Password: undefined;
  ConfirmPassword: undefined;
  Photo: undefined;

  FixedExpenses: undefined;
  EachFixedExpense: undefined;
  EachFixedExpenseCategory: { createdCategoryName: string };

  FixedIncomes: undefined;
  EachFixedIncome: undefined;
  EachFixedIncomeCategory: { createdCategoryName: string };

  NewCategory: undefined;
  NewExpenseCategory: undefined;
  NewIncomeCategory: undefined;

  StatsInitial: undefined;
};

export default PropsNavigationAuth;

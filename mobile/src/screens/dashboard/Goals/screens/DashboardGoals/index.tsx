import React from 'react';

import PropsNavigationApp from '../../../../../@types/RootStackParamApp';
import Button from '../../../../../components/Button';
import GoalsIcon from '../../../../../assets/images/svg/goalsIcon.svg';
import { useTheme } from 'styled-components/native'; 
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UseDadosTemp } from '../../../../../contexts/TemporaryDataContext';
import { StackActions } from '@react-navigation/native';
import Header from '../../../../../components/Header';
import { colors, fonts, metrics } from '../../../../../styles';

import { TextGoals, Title, Container } from './styles';

type Props = NativeStackScreenProps<PropsNavigationApp, 'Metas'>;

const Goals = () => {
  const { navigation } = UseDadosTemp();

  const backAction = () => {
    navigation.dispatch(
      StackActions.replace('GoalsStack', { screen: 'CreateGoals' }),
    );
    return true;
  };
  const theme: any = useTheme()

  return (
    <Container>
      <GoalsIcon height={'20%'} />
      <Title>
        Bem-vindo(a) às suas
        <TextGoals> metas! {'\n'}</TextGoals>
        Aqui você pode gerenciá-las como preferir. Visualizar as existentes ou
        criar novas.
      </Title>

      <Button
        title={'Metas atuais'}
        style={{ marginTop: 20, backgroundColor: theme.colors.lightGray }}
        color={theme.colors.paradisePink}
        onPress={() => {
          navigation.dispatch(
            StackActions.replace('GoalsStack', { screen: 'GoalsList' }),
          );
        }}
      />

      <Button
        title={'Metas concluídas'}
        style={{ marginTop: 20, backgroundColor: theme.colors.lightGray }}
        onPress={() => {
          navigation.dispatch(
            StackActions.replace('GoalsStack', { screen: 'GoalsList' }),
          );
        }}
        color={theme.colors.budGreen}
      />

      <Button
        title={'Nova meta'}
        style={{ marginTop: 20, backgroundColor: theme.colors.lightGray }}
        color={theme.colors.battleGray}
        onPress={() => {
          navigation.dispatch(
            StackActions.replace('GoalsStack', { screen: 'CreateGoals' }),
          );
        }}
      />
    </Container>
  );
};

export default Goals;

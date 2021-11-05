import React from 'react';
import { StatusBar } from 'react-native';

import  PropsNavigationApp from '../../../../../@types/RootStackParamApp';
import Button from '../../../../../components/Button';
import GoalsIcon from '../../../../../assets/images/svg/goalsIcon.svg';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UseDadosTemp } from '../../../../../contexts/TemporaryDataContext'
import { StackActions } from '@react-navigation/native'
import Header from '../components/Header';

import {
  TextGoals,
  Title,
  Container
} from './styles';

type Props = NativeStackScreenProps<PropsNavigationApp, 'Metas'>;



const Goals = () => {

  const { navigation } = UseDadosTemp()
  
  const backAction = () => {
    //muda aq mary pra main
    navigation.dispatch(StackActions.replace('GoalsStack', {screen: 'CreateGoals'}));
    return true;
  };

  return (
    <Container>
      <StatusBar backgroundColor={'#ccc'} />

      <GoalsIcon height={'20%'} />
      <Title>
          Bem-vindo(a) às suas 
          <TextGoals> metas! {'\n'}</TextGoals>
          Aqui você pode gerenciá-las como preferir. Visualizar as existentes ou criar novas.
      </Title>

        <Button
          title={'Metas atuais'}
          style={{ marginTop: 20,
            backgroundColor: "#F5F2F3"}}
          color="#ee4266"
          onPress={() => {navigation.dispatch(StackActions.replace('GoalsStack', {screen: 'GoalsList'}))}}/>

        <Button
          title={'Metas concluídas'}
          style={{ marginTop: 20,
             backgroundColor: "#F5F2F3"}}
          onPress={() => {navigation.dispatch(StackActions.replace('GoalsStack', {screen: 'GoalsList'}))}}
          color="#6CB760"
          />

        <Button
          title={'Nova meta'}
          style={{ marginTop: 20,
            backgroundColor: "#F5F2F3"}}
          color="#888"
          onPress={() => {navigation.dispatch(StackActions.replace('GoalsStack', {screen: 'CreateGoals'}))}}/>

    </Container>    
  );
};

export default Goals;

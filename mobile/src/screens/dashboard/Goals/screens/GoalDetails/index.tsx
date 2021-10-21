import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Goal } from '../TabNavigator/styles';

import {
  GoalDate,
  TextGoals,
  TextGoalsH,
  TextGoalsLighter,
  TextProgress,
  TextRS,
  TextValor,
  Title,
  Valor,
  DaysLeft,
} from './styles';

import { GoalsStack } from '../../../../../@types/RootStackParamApp';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';

import { ProgressBar, FAB, Portal, Provider } from 'react-native-paper';
import Button from '../../../../../components/Button';
import { RouteProp } from '@react-navigation/core';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Meta, UseMetas } from '../../../../../contexts/GoalsContext';

type PropsGoals = {
  navigation: StackNavigationProp<GoalsStack, 'GoalDetails'>;
  route: RouteProp<GoalsStack, 'GoalDetails'>;
};

type Props = NativeStackScreenProps<GoalsStack, 'GoalDetails'>;

const GoalDetails = ({ navigation, route }: Props) => {
  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  const [goal, setGoal] = useState({} as Meta);

  const { handleGetGoalById } = UseMetas();

  useEffect(() => {
    (async () => {
      const goal = await handleGetGoalById(route.params?.goalId);
      setGoal(goal);

      console.debug('O GOAL AQUI Ó:::: ', goal);
    })();
  }, []);

  return (
    <ScrollView style={{ backgroundColor: '#f6f6f6', height: '120%' }}>
      {console.debug('ROUTE:::: ', route)}
      <View style={styles.container}>
        <Title>{goal.descMeta}</Title>

        <Valor>
          <TextRS>R$</TextRS>
          <TextValor>2.480,00</TextValor>
        </Valor>

        <ProgressBar
          progress={0.35}
          color="#F81650"
          style={{
            height: 10,
            marginVertical: 8,
            borderRadius: 10,
          }}
        />

        <TextProgress>
          Você já progrediu sua meta em
          <TextGoals> 35% </TextGoals>
          de <TextGoals>R$ 4.960,00</TextGoals>
        </TextProgress>

        <Goal>
          <DaysLeft>! Faltam 124 dias</DaysLeft>

          <GoalDate>
            <TextGoalsH>Início</TextGoalsH>
            <TextGoalsLighter>08/03/2021</TextGoalsLighter>
          </GoalDate>

          <GoalDate>
            <TextGoalsH>Previsão</TextGoalsH>
            <TextGoalsLighter>08/03/2021</TextGoalsLighter>
          </GoalDate>
        </Goal>

        <Button
          onPress={() => {
            navigation.navigate('InvestGoals');
          }}
          title="Depositar"
          style={{ bottom: 20, top: 20 }}></Button>
      </View>

      <Provider>
        <Portal>
          <FAB.Group
            style={{
              position: 'absolute',
              top: 50,
              left: 0,
              padding: 30,
            }}
            visible={true}
            open={open}
            icon={'tools'}
            actions={[
              {
                icon: 'pencil',
                label: 'Editar',
                onPress: () => console.log('Pressed star'),
                color: '#D5DF5C',
              },
              {
                icon: 'delete',
                label: 'Excluir',
                color: '#DF5C5C',
                onPress: () => console.log('Pressed email'),
              },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
              if (open) {
                // do something if the speed dial is open
              }
            }}
          />
        </Portal>
      </Provider>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: '10%',
  },
});

export default GoalDetails;

import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { Goal } from '../TabNavigator/styles'

import { Dimensions } from 'react-native';

import { 
  GoalDate, TextGoals,
  TextGoalsH, TextGoalsLighter,
  TextProgress, TextRS,
  TextValor, Title, 
  Valor, DaysLeft } from './styles'

import {GoalsStack} from '../../../../../@types/RootStackParamApp'
import { StackNavigationProp } from '@react-navigation/stack'

import {ProgressBar, FAB, Portal, Provider} from 'react-native-paper'
import Button from '../../../../../components/Button';

type PropsGoals = {
  navigation: StackNavigationProp<GoalsStack, "GoalsList">
}

const GoalDetails = ({ navigation }: PropsGoals) => {

  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  return (
    <ScrollView style={{ backgroundColor: '#f6f6f6', height: '120%' }}>
      <View style={styles.container}>
        <Title>
          PS5
        </Title>

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
              borderRadius: 10
            }}
        />

        <TextProgress>
          Você já progrediu sua meta em
          <TextGoals> 35% </TextGoals>
          de <TextGoals>R$ 4.960,00</TextGoals>
        </TextProgress>

        <Goal>
          <DaysLeft>
            ! Faltam 124 dias
          </DaysLeft>

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
          style={{bottom: 20, top: 20}}>
        </Button>

      </View>

        <Provider>
          <Portal>
            <FAB.Group
              style={{                             
                position: 'absolute', top: 50, left: 0, padding: 30,}}
                visible={true}
                open={open}
                icon={'tools'}
                actions={[
                {
                  icon: 'pencil',
                  label: 'Editar',
                  onPress: () => console.log('Pressed star'),
                  color: '#D5DF5C'
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

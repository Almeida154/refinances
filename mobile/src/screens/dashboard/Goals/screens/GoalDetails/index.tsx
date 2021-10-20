import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
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

import {ProgressBar} from 'react-native-paper'
import Button from '../../../../../components/Button';

type PropsGoals = {
  navigation: StackNavigationProp<GoalsStack, "GoalsList">
}

const GoalDetails = ({ navigation }: PropsGoals) => {
  let [progress, setProgress] = useState(1);

  return (
    <ScrollView style={{ backgroundColor: '#f6f6f6' }}>
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
          style={{bottom: 0, top: 20}}>
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: '10%',
  },

  txtgoals: {
    fontSize: 17,
    color: '#292929',
    fontWeight: '700',
  },

  txtgoalsh: {
    fontSize: 17,
    color: '#292929',
    fontWeight: '900',
    width: '50%',
  },

  txtlighterh: {
    fontSize: 17,
    color: '#525252',
    textAlign: 'right',
    fontWeight: '900',
    width: '50%',
    opacity: 0.85,
  },

  goaldate: {
    flexDirection: 'row',
    width: '100%',
    paddingBottom: '1%',
  },

  vwvalor: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },

  txtrs: {
    textAlign: 'center',
  },

  txtvalor: {
    fontSize: 40,
    textAlign: 'center',
  },
});

export default GoalDetails;

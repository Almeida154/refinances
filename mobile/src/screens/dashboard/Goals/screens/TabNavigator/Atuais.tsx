import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import goalsJson from './goals.json';

import { Title, Goal, GoalDesc, DaysLeft, 
  InvestedMoney, Percent, PercentText} from './styles'

import { ProgressBar, Colors } from 'react-native-paper';

const Goals = () => {
  const [goals, setGoals] = useState(goalsJson);
  const [accomplishedGoals, setAccomplishedGoals] = useState(
    goals.filter(goal => !goal.isAccomplished),
  );

  useEffect(() => {
    console.log(goals);
  }, []);

  const handleProgress = (currentAmount, totalAmount) => {
    let percent = (currentAmount * 100) / totalAmount;
    return Number.isInteger(percent) ? percent : percent.toFixed(1);
  };

  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <Title>
          Registre os depósitos para acompanhar o progresso de suas metas
        </Title>

        {accomplishedGoals.map(goal => (
          <Goal
            key={goal.id}>
            <GoalDesc>{goal.desc}</GoalDesc>

            <DaysLeft>
              ! Faltam 14 dias
            </DaysLeft>

            <ProgressBar
              progress={
                handleProgress(goal.currentAmount, goal.totalAmount) / 100
              }
              color="#F81650"
              style={{
                height: 10,
                marginVertical: 8,
              }}
            />

            <InvestedMoney>
              {`R$ ${goal.currentAmount} de R$ ${goal.totalAmount}`}
            </InvestedMoney>

            <Percent>
              <PercentText>
                {handleProgress(goal.currentAmount, goal.totalAmount)}%
              </PercentText>
            </Percent>
          </Goal>
        ))}
        
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: '10%',
  },

  progress: {
    transform: [{ scaleX: 1.0 }, { scaleY: 2.0 }],
    marginTop: '2%',
    marginBottom: '2%',
  },

  
});

export default Goals;

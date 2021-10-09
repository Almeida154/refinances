import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import goalsJson from './goals.json';

//import { ProgressBar } from '@react-native-community/progress-bar-android';
import { ProgressBar, Colors } from 'react-native-paper';

const GoalDetails = () => {
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
        <Text
          style={{
            fontSize: 16,
            color: '#525252',
            fontWeight: '400',
            textAlign: 'center',
            opacity: 0.7,
            marginBottom: 40,
          }}>
          Registre os depósitos para acompanhar o progresso de suas metas
        </Text>

        {accomplishedGoals.map(goal => (
          <View
            style={{
              position: 'relative',
              backgroundColor: '#fafafa',
              marginBottom: 30,
              padding: 20,
              borderRadius: 10,
            }}
            key={goal.id}>
            <Text
              style={{
                fontSize: 22,
                color: '#525252',
                fontWeight: 'bold',
              }}>
              {goal.desc}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#525252',
                fontWeight: 'bold',
                opacity: 0.3,
              }}>
              ! Faltam 14 dias
            </Text>
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
            <Text
              style={{
                fontSize: 14,
                color: '#525252',
              }}>
              {`R$ ${goal.currentAmount} de R$ ${goal.totalAmount}`}
            </Text>
            <View
              style={{
                backgroundColor: '#fff',
                position: 'absolute',
                right: -20,
                top: -20,
                width: 60,
                height: 60,
                borderRadius: 30,
                elevation: 20,
                opacity: 0.8,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ color: '#525252' }}>
                {handleProgress(goal.currentAmount, goal.totalAmount)}%
              </Text>
            </View>
          </View>
        ))}

        {/* <TouchableHighlight
          style={styles.btn}
          onPress={() => {
            navigation.navigate('CreateGoal');
          }}>
          <Text style={styles.txtbtn}>Criar</Text>
        </TouchableHighlight> */}
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

  goal: {
    backgroundColor: '#fff',
    padding: '4%',
    marginTop: '5%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#525252',
  },

  goaldate: {
    flexDirection: 'row',
    width: '100%',
    paddingBottom: '1%',
  },

  progress: {
    transform: [{ scaleX: 1.0 }, { scaleY: 2.0 }],
    marginTop: '2%',
    marginBottom: '2%',
  },

  txtbtn: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 30,
  },

  btn: {
    borderRadius: 10,
    backgroundColor: '#ee4266',
    padding: '5%',
    marginTop: '10%',
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

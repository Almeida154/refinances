import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/Entypo';

import goalsJson from './goals.json';

import {UseDadosTemp} from '../../../../../contexts/TemporaryDataContext'

//import { ProgressBar } from '@react-native-community/progress-bar-android';

const GoalsAccomplished = () => {
  const [goals, setGoals] = useState(goalsJson);
  const [accomplishedGoals, setAccomplishedGoals] = useState(
    goals.filter(goal => !goal.isAccomplished),
);

const {navigation} = UseDadosTemp()

  return (
    <ScrollView style={{ backgroundColor: '#f6f6f6' }}>
      <View style={styles.container}>

        <Icon name="emoji-sad" size={50}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 30
        }}/>

        <Text style={{ fontWeight: '400', textAlign: 'center', fontSize: 17 }}>
          Você ainda não concluiu nenhuma meta! {'\n\n'}

          Mas não desanime, invista em suas metas mensalmente para concluí-las mais rápido!
        </Text>


        <TouchableOpacity
          style={styles.btn}
          onPress={() => {navigation.navigate('GoalsStack', {screen: 'InvestGoals'}); }}>
          <Text style={styles.txtbtn}>Investir</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: '10%',
    flex: 1,
    alignItems: 'center'
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
    width: '100%'
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

export default GoalsAccomplished;

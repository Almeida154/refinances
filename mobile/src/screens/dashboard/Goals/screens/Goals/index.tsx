/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

//import {ProgressBar} from '@react-native-community/progress-bar-android';


const Goals = ({ navigation }) => {
  let [progress, setProgress] = useState(1);

  return (
    <ScrollView style={{ backgroundColor: '#f6f6f6' }}>
      <View style={styles.container}>
        <Text style={styles.title}>Suas metas</Text>

        <Text
          style={{
            marginBottom: '2%',
            fontSize: 17,
            color: '#292929',
            fontWeight: '700',
          }}>
          Adicione suas metas para incentivar-se a alcançar seus objetivos!
        </Text>
        <Text style={{ marginBottom: '2%', fontSize: 17, color: '#292929' }}>
          Saiba sempre quanto investir em sua meta por mês e o quanto já
          alcançou
        </Text>

        <View style={styles.goal}>
          <TouchableHighlight
            underlayColor={'transparent'}
            onPress={() => {
              navigation.navigate('GoalDetails');
            }}>
            <View style={styles.goalheader}>
              <Text style={styles.txtgoalsh}>PS5</Text>
              <Text style={styles.txtlighterh}>50%</Text>
            </View>
          </TouchableHighlight>

          <View style={styles.goalcontent}>
            <Text style={styles.txtprevisao}>Faltam: 2 meses</Text>

            <View style={styles.progress}>
              {/* <ProgressBar
                 styleAttr="Horizontal"
                 indeterminate={false}
                 progress={0.5}
                 color={'#ee4266'}
               /> */}
            </View>

            <Text style={styles.txtgoals}>
              R$ 2.480,00
              <Text style={{ fontWeight: '400' }}> de </Text>
              R$ 4.960,00
            </Text>
          </View>
        </View>

        <TouchableHighlight
          style={styles.btn}
          onPress={() => {
            navigation.navigate('CreateGoal');
          }}>
          <Text style={styles.txtbtn}>Criar</Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ScrollView: {
    backgroundColor: '#000',
  },

  container: {
    margin: '10%',
  },

  title: {
    fontSize: 40,
    fontWeight: '900',
    marginBottom: '5%',
    color: '#ee4266',
  },

  txtgoals: {
    fontSize: 17,
    color: '#292929',
    fontWeight: '700',
  },

  txtprevisao: {
    fontSize: 17,
    color: '#525252',
    marginTop: '2%',
  },

  txtlighter: {
    fontSize: 17,
    color: '#525252',
  },

  txtgoalsh: {
    fontSize: 17,
    color: '#292929',
    fontWeight: '900',
    width: '50%',
  },

  txtlighterh: {
    fontSize: 17,
    color: '#292929',
    textAlign: 'right',
    fontWeight: '900',
    width: '50%',
  },

  goal: {
    backgroundColor: '#fff',
    padding: '4%',
    marginTop: '5%',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#525252',
  },

  goalheader: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    width: '100%',
    paddingBottom: '3%',
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
});

export default Goals;

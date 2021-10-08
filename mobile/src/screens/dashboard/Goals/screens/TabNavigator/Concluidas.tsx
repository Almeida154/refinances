import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

//import { ProgressBar } from '@react-native-community/progress-bar-android';

const GoalDetails = ({ navigation }) => {
  let [progress, setProgress] = useState(1);

  return (
    <ScrollView style={{ backgroundColor: '#f6f6f6' }}>
      <View style={styles.container}>
        <Text
          style={{
            marginBottom: '2%',
            fontSize: 30,
            color: '#292929',
            fontWeight: '700',
            textAlign: 'center',
          }}>
          PS5
        </Text>

        <View style={styles.vwvalor}>
          <Text style={styles.txtrs}>R$</Text>
          <Text style={styles.txtvalor}>2.480,00</Text>
        </View>

        <View style={styles.progress}>
          {/* <ProgressBar
            styleAttr="Horizontal"
            indeterminate={false}
            progress={0.5}
            color={'#ee4266'}
          /> */}
        </View>

        <Text style={{ fontWeight: '400', textAlign: 'center', fontSize: 17 }}>
          Você já progrediu sua meta em
          <Text style={styles.txtgoals}> 50% </Text>
          de <Text style={styles.txtgoals}>R$ 4.960,00</Text>
        </Text>

        <View style={styles.goal}>
          <Text style={{ fontSize: 17, marginBottom: 10 }}>
            Faltam: 5 meses
          </Text>

          <View style={styles.goaldate}>
            <Text style={styles.txtgoalsh}>Início</Text>
            <Text style={styles.txtlighterh}>08/03/2021</Text>
          </View>

          <View style={styles.goaldate}>
            <Text style={styles.txtgoalsh}>Previsão</Text>
            <Text style={styles.txtlighterh}>08/08/2021</Text>
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
    borderColor: '#000',
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

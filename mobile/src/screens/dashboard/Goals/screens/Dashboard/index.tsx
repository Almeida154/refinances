import * as React from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image
} from 'react-native';

const Dashboard = ({ navigation }) => {
  return (
    <ScrollView style={{backgroundColor: '#f6f6f6'}}>

      <View style={styles.container}>

        <Text style={styles.title}>Bem vindo às suas metas!</Text>

        <Text style={styles.txtgoals}>Você conhece a importância de um bom plano com metas e objetivos claros?</Text>
        <Text style={styles.txtlighter}>Suas metas e planos ditam seu destino! É de extrema importância criar, investir e gerenciar planos para sua vida financeira.
       </Text>


        <View style={styles.btns}>

          <View style={styles.row}>

            <View style={styles.btn}>
              <TouchableHighlight
              onPress={() => navigation.navigate('Goals')}
              underlayColor={'transparent'}>
                <Image
                  style={styles.img}
                  source={require('../../img/goal.png')}
                />
                
              </TouchableHighlight>
              <Text style={styles.txtbtn}>Suas metas</Text>
            </View>

            <View style={styles.btn}
            onPress={() => navigation.navigate('Goals')}
            underlayColor={'transparent'}>
              <TouchableHighlight>
                <Image
                  style={styles.img}
                  source={require('../../img/done.png')}
                />
                
              </TouchableHighlight>
              <Text style={styles.txtbtn}>Concluídas</Text>
            </View>

          </View>

          <View style={styles.row}>

            <View style={styles.btn}>
              <TouchableHighlight
              onPress={() => navigation.navigate('Invest')}
              underlayColor={'transparent'}>
                <Image
                  style={styles.img}
                  source={require('../../img/deposit.png')}
                />
                
              </TouchableHighlight>
              <Text style={styles.txtbtn}>Investir</Text>
            </View>

            <View style={styles.btn}>
              <TouchableHighlight
              onPress={() => navigation.navigate('CreateGoal')}
              underlayColor={'transparent'}>
                <Image
                  style={styles.img}
                  source={require('../../img/add.png')}
                />
                
              </TouchableHighlight>
              <Text style={styles.txtbtn}>Criar</Text>
            </View>
            
          </View>
          
        </View>

        </View> 
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  img: {
    width: 90,
    height: 90,
  },

  btns:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    padding: 20
  },

  btn:{
    alignSelf: 'center',
    alignItems: 'center',
    flex: 1,
    borderColor: '#ee4266',
    justifyContent: 'center',
    padding: 10,
    margin: 10,
  },

  title: {
    fontSize: 40,
    fontWeight: '900',
    marginBottom: '5%', 
    color: '#ee4266'
  },

  txtgoals: {
    fontSize: 17,
    color: '#292929',
    fontWeight: '700',
    marginBottom: '2%'
  },

  container: {
    margin: '10%'
  },

  txtbtn: {
    fontWeight: '900',
    color: '#ee4266',
    fontSize: 20
  }

});

export default Dashboard;
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
   TextInput,
   TouchableHighlight,
   View,
 } from 'react-native';
 
 const Invest = ({navigation}) => {
 
    const [valorDeposito, setValor] = useState();
 
   return (
     <ScrollView style={{backgroundColor: '#f6f6f6'}}>
 
        <View style={styles.header}>

          <Text style={styles.rs}>R$</Text>

          <TextInput style={styles.inputDeposit}
          placeholder="0,00"
          placeholderTextColor="#fff">
            
          </TextInput>

        </View>

      <View style={styles.container}>

          {/* Adicionar o picker de metas aqui, pré-selecionando a que o user clicou p depositar */}
          <View style={styles.inputControl}>
            <Text style={styles.label}>Em qual meta deseja investir?</Text>
            <TextInput style={styles.textInput}
              placeholder="Carro novo"
              placeholderTextColor="#0000001d"></TextInput>
          </View>

          {/* Adicionar o picker de contas aqui */}
          <View style={styles.inputControl}>
            <Text style={styles.label}>De onde investirá esse mês?</Text>
            <TextInput style={styles.textInput}
              placeholder="Escolha uma conta"
              placeholderTextColor="#0000001d"
              ></TextInput>
          </View>

          <View style={styles.inputControl}>
            <Text style={styles.label}>Quanto será investido?</Text>
            <TextInput style={styles.textInput}
              placeholder="Insira o valor"
              placeholderTextColor="#0000001d"
              value={valorDeposito}
              keyboardType="numeric"
              onChangeText={(text) => setValor(text)}></TextInput>
          </View>

          <TouchableHighlight style={styles.btn}>
            <Text style={styles.txtbtn}>Depositar</Text>
          </TouchableHighlight>
 
       </View>
     </ScrollView>
   );
 };
 
 const styles = StyleSheet.create({
 
   container: {
     margin: '10%'
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
     marginTop: '10%'
   },

   header: {
    backgroundColor: '#ee4266',
    paddingTop: '10%',
    paddingBottom: '3%',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
    marginLeft: 'auto', right: 0
   },

   rs: {
     width: '5%',
     color: '#fff',
     fontSize: 15
   },

   inputDeposit:{
    width: '30%',
    color: '#fff',
    fontSize: 40,
   },

   label: {
    fontFamily: 'Nunito-Black',
    fontSize: 18,
    opacity: .65
  },
  textInput: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    borderBottomWidth: 2,
    width: '100%',
    color: '#858c87',
    height: 40,
    borderBottomColor: '#00000028'
  },
  inputControl: {
    display: 'flex',
    width: '100%',
    marginTop: 25
  },


 });
 
 export default Invest;
 
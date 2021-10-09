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
   TextInput
 } from 'react-native';
 
 const CreateGoal = () => {
 
    const [meta, setMeta] = useState('');
    const [valorMeta, setValorMeta] = useState();
    const [investidoMeta, setInvestido] = useState();
    const [previsao, setPrevisao] = useState();
 
   return (
     <ScrollView style={{backgroundColor: '#f6f6f6'}}>
 
       <View style={styles.container}>
 
         <Text 
         style={{marginBottom: '2%', 
         fontSize: 17,
         color: '#292929',
         fontWeight: '700',}}>Que bom que decidiu criar uma meta!</Text>

        <Text style={{marginBottom: '5%', 
         fontSize: 17,
         color: '#292929'}}>Calcularemos seu investimento mensal e te notificaremos para não esquecer ;)</Text>
 
          <View style={styles.inputControl}>
            <Text style={styles.label}>Descrição</Text>
            <TextInput style={styles.textInput}
              placeholder="Ex.: carro novo"
              placeholderTextColor="#0000001d"
              value={meta}
              onChangeText={(text) => setMeta(text)}></TextInput>
          </View>

          <View style={styles.inputControl}>
            <Text style={styles.label}>Valor</Text>
            <TextInput style={styles.textInput}
              placeholder="Qual o valor total da meta?"
              placeholderTextColor="#0000001d"
              value={valorMeta}
              keyboardType="numeric"
              onChangeText={(text) => setValorMeta(text)}></TextInput>
          </View>

          <View style={styles.inputControl}>
            <Text style={styles.label}>Já investido</Text>
            <TextInput style={styles.textInput}
              placeholder="Qual o valor já investido na meta?"
              placeholderTextColor="#0000001d"
              value={investidoMeta}
              keyboardType="numeric"
              onChangeText={(text) => setInvestido(text)}></TextInput>
          </View>

          {/* Colocar o DatePicker aqui depois */}
          <View style={styles.inputControl}>
            <Text style={styles.label}>Previsão</Text>
            <TextInput style={styles.textInput}
              placeholder="Quando quer concluir essa meta?"
              placeholderTextColor="#0000001d"
              value={previsao}
              onChangeText={(text) => setPrevisao(text)}></TextInput>
          </View>

          <TouchableHighlight style={styles.btn}>
            <Text style={styles.txtbtn}>Adicionar</Text>
          </TouchableHighlight>
 
       </View>
     </ScrollView>
   );
 };
 
 const styles = StyleSheet.create({
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
     borderRadius: 15,
     backgroundColor: '#ee4266',
     padding: '5%',
     marginTop: '10%'
   }
 });
 
 export default CreateGoal;
 
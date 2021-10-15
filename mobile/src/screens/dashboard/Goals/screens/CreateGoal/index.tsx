import React, { useState, useEffect } from 'react';

 import InputText from '../../../../../components/InputText'
 import Button from '../../../../../components/Button'

 import {Meta, UseMetas} from '../../../../../contexts/GoalsContext'
 import retornarIdDoUsuario from '../../../../../helpers/retornarIdDoUsuario'

 import {DadosTempProvider, UseDadosTemp} from '../../../../../contexts/TemporaryDataContext'

 import {ScrollView,StyleSheet,Text,TouchableHighlight,View,TextInput} from 'react-native';
 import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TouchableOpacity } from 'react-native-gesture-handler';
 
 const CreateGoal = () => {
 
    const [meta, setMeta] = useState('');
    const [valorMeta, setValorMeta] = useState('');
    const [investidoMeta, setInvestido] = useState('');
    const [previsao, setPrevisao] = useState(new Date().toLocaleDateString());
    const [realizado, setRealizado] = useState(false);

/*     //erros
    const [descError, setdescError] = useState<any | null>(null);
    const [valorTError, setvalorTError] = useState<any | null>(null);
    const [investidoError, setinvestidoError] = useState<any | null>(null);
    const [dtPrevError, setdtPrevError] = useState<any | null>(null);
 */
    const {handleAdicionarMeta} = UseMetas()
    const {navigation} = UseDadosTemp()

    const dataAtual = new Date().toLocaleDateString();

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };

    const handleConfirm = (date: Date) => {
      console.warn("Previsão data final meta: ", date.toLocaleDateString());
      setPrevisao(date.toLocaleDateString())
      hideDatePicker();
    };

    async function handleCreateGoal() {
      
      const newGoal = {
          descMeta: meta,
          saldoFinalMeta: parseFloat(valorMeta),
          saldoAtualMeta: parseFloat(investidoMeta),
          dataInicioMeta: dataAtual,
          dataFimMeta: previsao,
          realizacaoMeta: realizacao(),
          userMetaId: await retornarIdDoUsuario()
          
      } as Meta

      console.log(newGoal)

      handleAdicionarMeta(newGoal)
      /* const response = await handleAdicionarMeta(newGoal);

      if (!response.ok) {
        switch (response.error) {
          case 'descMeta':
            setdescError(response.message);
            break;
          case 'saldoFinal':
            setvalorTError(response.message);
            break;
          case 'saldoAtual':
            setinvestidoError(response.message);
            break;
          case 'dtPrev':
            setdtPrevError(response.message);
            break;
          default:
            return;
        }
      }
       */
      
      navigation.goBack()
    }

    const realizacao = () => {
      parseFloat(investidoMeta) >= parseFloat(valorMeta) ? setRealizado(true) : setRealizado(false);
      return realizado;
    }
 
   return (
     <ScrollView style={{backgroundColor: '#f6f6f6'}}>
 
       <View style={styles.container}>
 
         <Text 
         style={{marginBottom: '2%', 
         fontSize: 17,
         color: '#292929',
         fontWeight: '700',}}>Que bom que decidiu criar uma meta!</Text>

        <Text style={{marginBottom: '15%', 
         fontSize: 17,
         color: '#292929'}}>Calcularemos seu investimento mensal e te notificaremos para não esquecer ;)</Text>
 
          <View>
            <InputText
              onChangeText={setMeta}
              value={meta}
              label="Descrição"
              placeholder="Ex.: Carro novo"
              //error={descError}
              showClearIcon={meta != ''}
              onClear={() => {
                  setMeta('')
              }}></InputText>
          </View>

          <View>
            <InputText
              onChangeText={setValorMeta}
              value={valorMeta}
              //error={valorTError}
              label="Valor total da meta"
              placeholder="Ex.: R$ 1.000,00"
              showClearIcon={valorMeta != ''}
              onClear={() => {
                  setValorMeta('')
              }}></InputText>
          </View>

          <View>
            <InputText 
              onChangeText={setInvestido}
              value={investidoMeta}
              label="Valor já investido"
              placeholder="Ex.: R$ 100,00"
              //error={investidoError}
              showClearIcon={investidoMeta != ''}
              onClear={() => {
                  setInvestido('')
              }}></InputText>
          </View>

          {/* DatePicker */}
            <InputText 
              label="Previsão conclusão"
              value={previsao}
              placeholder={previsao}
              //error={dtPrevError}
              showClearIcon={previsao != dataAtual}
              onPressIn={showDatePicker}
              
              onClear={() => {
                  setPrevisao(dataAtual)
              }}></InputText>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />

            
            <Button
                onPress={handleCreateGoal}
                title="Criar"
                backgroundColor="#CCC"
                color="#444"
                lastOne={true}
                
            />   
 
       </View>
     </ScrollView>
   );
 };
 
 const styles = StyleSheet.create({
 
   container: {
     margin: '10%'
   },
 });
 
 export default CreateGoal;
 
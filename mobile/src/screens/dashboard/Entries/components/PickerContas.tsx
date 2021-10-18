import React, { useState, useRef, SetStateAction, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import retornarIdDoUsuario from '../../../../helpers/retornarIdDoUsuario'

import { Picker, PickerProps } from '@react-native-picker/picker';

import { StyleSheet, View } from 'react-native';

import { Conta, UseContas } from '../../../../contexts/AccountContext';

import InputText from '../../../../components/InputText';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

type PropsPickerContas = {
  conta: Conta | null;
  setConta: React.Dispatch<React.SetStateAction<Conta | null>>;
  tipoLancamento: string;
};

const PickerContas = ({
  conta,
  setConta,
  tipoLancamento,
}: PropsPickerContas) => {
  const { contas, handleReadByUserContas, loading } = UseContas();

  const pickerRef = useRef();

  function open() {
    if (pickerRef.current) pickerRef.current.focus();
  }

  const onChangePicker = (index: number) => {
    
    setConta(contas[index]);
  };

  useEffect(() => {
    try {
      async function loadContas() {
        
        handleReadByUserContas(await retornarIdDoUsuario());
      }

      loadContas();
      // console.log(contas)
    } catch (error) {
      console.log('Erro ao carregar as contas: ', error);
    }
  }, []);

  return (
    <View style={styles.containerPicker}>
      <TouchableOpacity onPress={open}>
        <InputText
          onClear={() => {}}
          showClearIcon={false}
          label="Conta"
          value={conta == null ? '' : conta.descricao}
          placeholder="Selecione uma conta"
          placeholderTextColor={'#bbb'}
          colorLabel={tipoLancamento == 'despesa' ? '#EE4266' : '#6CB760'}
          editable={false}
        />
      </TouchableOpacity>
      <Picker
        itemStyle={styles.pickerItem}
        style={styles.picker}
        ref={pickerRef}
        selectedValue={conta == null ? undefined : conta.id}
        onValueChange={onChangePicker}>
        {loading ? (
          <Picker.Item
            style={{ backgroundColor: 'orange' }}
            label="Carregando"
            value={0}
          />
        ) : (
          contas && contas.map((item, index) => {
            return (
              <Picker.Item
                key={index}
                style={{ backgroundColor: 'orange' }}
                label={item.descricao}
                value={index}
              />
            );
          })
        )}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  containerPicker: {
    width: '100%',
  },
  picker: {
    display: 'none',
    width: '100%',
    height: 50,
    color: '#555',
  },
  pickerItem: {
    backgroundColor: 'white',
    color: 'black',
  },
});

export default PickerContas;

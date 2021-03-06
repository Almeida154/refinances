import React, { useState, useRef, SetStateAction, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import retornarIdDoUsuario from '../../../../helpers/retornarIdDoUsuario'

import { Picker, PickerProps } from '@react-native-picker/picker';
import { useTheme } from 'styled-components/native';
import { StyleSheet, View } from 'react-native';

import { Conta, UseContas } from '../../../../contexts/AccountContext';

import InputText from '../../../../components/InputText';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { colors, fonts } from '../../../../styles';

interface PropsPickerContas {
  conta: Conta | null;
  changeAccount: (conta: Conta | null) => void;
  tipoLancamento: string;
  label?: string;
};

const PickerContas: React.FC<PropsPickerContas> = ({
  conta,
  changeAccount,
  tipoLancamento,
  label
}) => {
  const { contas, handleReadByUserContas, loading } = UseContas();
  const [selectedItem, setSelectedItem] = useState<number | undefined>(undefined)

  const pickerRef = useRef();

  function open() {
    if (pickerRef.current) pickerRef.current.focus();
  }

  const onChangePicker = (index: number) => {
    
    setSelectedItem(index)
    changeAccount(contas == null ? null : contas[index]);
  };

  useEffect(() => {
    changeAccount(contas == null ? null : conta ? conta : contas[0]);
  }, [contas])

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
  const theme: any = useTheme()

  return (
    <View style={styles.containerPicker}>
        <InputText
          onClear={() => {}}
          showClearIcon={false}
          onPress={open}
          label={label ? label : 'Conta'}
          value={conta == null ? '' : conta.descricao}
          placeholder="Selecione uma conta"
          placeholderTextColor={theme.colors.silver}
          colorLabel={tipoLancamento == 'despesa' ? theme.colors.paradisePink : theme.colors.budGreen}
          editable={false}
        />
      <Picker
        itemStyle={styles.pickerItem}
        style={styles.picker}
        ref={pickerRef}
        selectedValue={selectedItem}
        onValueChange={(item, index) => onChangePicker(index)}
        >
        {        
          contas && contas.map((item, index) => {
            return (
              <Picker.Item
                key={index}
                style={{ color: theme.colors.black, fontFamily: fonts.familyType.semiBold, }}
                label={item.descricao}
                value={index}
              />
            );
          })
        }
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
  },
  pickerItem: {
    backgroundColor: colors.blackSilver,
    color: colors.silver,
  },
});

export default PickerContas;

import React, { useState, useRef, SetStateAction, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import retornarIdDoUsuario from '../../../../../helpers/retornarIdDoUsuario'

import { Picker, PickerProps } from '@react-native-picker/picker';

import { StyleSheet, View } from 'react-native';

import { Meta, UseMetas } from '../../../../../contexts/GoalsContext';

import InputText from '../../../../../components/InputText';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

interface PropsPickerMetas {
  meta: Meta | null;
  changeGoal: (meta: Meta | null) => void;
  label?: string;
};

const PickerMetas: React.FC<PropsPickerMetas> = ({
  meta,
  changeGoal,
  label
}) => {
  const { metas, handleReadByUserMetas, loading } = UseMetas();
  const [selectedItem, setSelectedItem] = useState<number | undefined>(0)

  const pickerRef = useRef();

  function open() {
    if (pickerRef.current) pickerRef.current.focus();
  }

  const onChangePicker = (index: number) => {
    console.log("index,",index)
    setSelectedItem(index)
    changeGoal(metas == null ? null : metas[index]);
  };

  useEffect(() => {
    try {
      async function loadMetas() {
        
        handleReadByUserMetas(await retornarIdDoUsuario());
      }

      loadMetas();
      // console.log(contas)
    } catch (error) {
      console.log('Erro ao carregar as metas: ', error);
    }
  }, []);

  return (
    <View style={styles.containerPicker}>
      <TouchableOpacity onPress={open}>
        <InputText
          onClear={() => {}}
          showClearIcon={false}
          label={label ? label : 'Meta'}
          value={meta == null ? '' : meta.descMeta}
          placeholder="Selecione uma meta"
          placeholderTextColor={'#bbb'}
          colorLabel={'#ee4266'}
          editable={false}
        />
      </TouchableOpacity>
      <Picker
        itemStyle={styles.pickerItem}
        style={styles.picker}
        ref={pickerRef}
        selectedValue={selectedItem}
        onValueChange={(item, index) => onChangePicker(index)}
        >
        {        
          metas && metas.map((item, index) => {
            return (
              <Picker.Item
                key={index}
                style={{ backgroundColor: '#fff' }}
                label={item.descMeta}
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
    color: '#555',
  },
  pickerItem: {
    backgroundColor: 'white',
    color: 'black',
  },
});

export default PickerMetas;

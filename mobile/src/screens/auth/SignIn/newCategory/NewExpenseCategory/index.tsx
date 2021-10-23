import React, { useEffect, useState, useRef } from 'react';

import { BackHandler, FlatList, Text, TextInput, View } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { UseAuth } from '../../../../../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RootStackParamAuth from '../../../../../@types/RootStackParamAuth';

// Styles
import { Container, Form, ColorsContainer, Color } from './styles';
import { colors } from '../../../../../styles';

// Components
import InputText from '../../../../../components/InputText';
import Button from '../../../../../components/Button';
import Modalize from '../../../../../components/Modalize';

import { Modalize as Modal } from 'react-native-modalize';
import global from '../../../../../global';

export type PropsNavigation = {
  navigation: StackNavigationProp<RootStackParamAuth, 'NewExpenseCategory'>;
  route: RouteProp<RootStackParamAuth, 'NewExpenseCategory'>;
};

const NewExpenseCategory = ({ navigation }: PropsNavigation) => {
  type modalizeColorsProps = {
    name?: string;
    hex?: string;
    key?: number;
  };

  const [name, setName] = useState<string>('');
  const [nameError, setNameError] = useState<null>();
  const nameRef = useRef<TextInput>(null);

  const [color, setColor] = useState<string>('');
  const [colorError, setColorError] = useState<null>();
  const colorRef = useRef<TextInput>(null);

  const [icon, setIcon] = useState<string>('');
  const [iconError, setIconError] = useState<null>();
  const iconRef = useRef<TextInput>(null);

  const [modalizeColors, setModalizeColors] = useState([
    {},
  ] as modalizeColorsProps[]);
  const colorModalizeRef = useRef<Modal>(null);

  const iconModalizeRef = useRef<Modal>(null);

  const closeColorModalize = () => colorModalizeRef.current?.close();
  const openColorModalize = () => colorModalizeRef.current?.open();

  const closeIconModalize = () => colorModalizeRef.current?.close();
  const openIconModalize = () => colorModalizeRef.current?.open();

  useEffect(() => {
    setModalizeColors(global.DEFAULT_COLORS);
  }, []);

  return (
    <Container>
      <Form>
        <InputText
          label="Nome"
          placeholder="Biblioteca"
          value={name}
          error={nameError}
          autoCapitalize="none"
          textContentType="emailAddress"
          secureTextEntry={false}
          returnKeyType="next"
          blurOnSubmit={false}
          ref={nameRef}
          showClearIcon={name != ''}
          onClear={() => {
            setNameError(null);
            setName('');
          }}
          onChangeText={txt => {
            setNameError(null);
            setName(txt);
          }}
          onSubmitEditing={() => colorRef.current?.focus()}
        />
        <InputText
          label="Cor"
          placeholder="Amarelo"
          value={color}
          error={colorError}
          autoCapitalize="none"
          textContentType="emailAddress"
          secureTextEntry={false}
          returnKeyType="next"
          blurOnSubmit={false}
          ref={colorRef}
          showClearIcon={color != ''}
          onClear={() => {
            setIconError(null);
            setIcon('');
          }}
          onChangeText={txt => {
            setIconError(null);
            setIcon(txt);
          }}
          onSubmitEditing={() => iconRef.current?.focus()}
          editable={false}
          onPress={() => openColorModalize()}
        />
        <InputText
          label="Ícone"
          placeholder="Avião"
          value={icon}
          error={iconError}
          autoCapitalize="none"
          textContentType="emailAddress"
          secureTextEntry={false}
          blurOnSubmit={false}
          ref={iconRef}
          showClearIcon={icon != ''}
          onClear={() => {
            setIconError(null);
            setIcon('');
          }}
          onChangeText={txt => {
            setIconError(null);
            setIcon(txt);
          }}
          editable={false}
        />
        <Button
          onPress={() => {}}
          title="Adicionar"
          backgroundColor={colors.platinum}
          color={colors.davysGrey}
        />
      </Form>

      <Modalize
        ref={colorModalizeRef}
        title="Escolha uma cor 🎨"
        backgroundColor={colors.cultured}>
        <ColorsContainer horizontal>
          {modalizeColors.map((color, index) => (
            <Color mr={index + 1 != modalizeColors.length} bg={color.hex} />
          ))}
        </ColorsContainer>
      </Modalize>
    </Container>
  );
};

export default NewExpenseCategory;

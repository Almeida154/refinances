import React, { useEffect, useRef, useState } from 'react';

import { BackHandler, TextInput } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { UseAuth } from '../../../../../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RootStackParamAuth from '../../../../../@types/RootStackParamAuth';

// Styles
import { Container } from './styles';
import { colors } from '../../../../../styles';

// Components
import InputText from '../../../../../components/InputText';
import Button from '../../../../../components/Button';

export type PropsNavigation = {
  navigation: StackNavigationProp<RootStackParamAuth, 'NewIncomeCategory'>;
  route: RouteProp<RootStackParamAuth, 'NewIncomeCategory'>;
};

const NewIncomeCategory = ({ navigation }: PropsNavigation) => {
  const [name, setName] = useState<string>('');
  const [nameError, setNameError] = useState<null>();
  const nameRef = useRef<TextInput>(null);

  const [color, setColor] = useState<string>('');
  const [colorError, setColorError] = useState<null>();
  const colorRef = useRef<TextInput>(null);

  const [icon, setIcon] = useState<string>('');
  const [iconError, setIconError] = useState<null>();
  const iconRef = useRef<TextInput>(null);

  return (
    <Container>
      <InputText
        noShadow
        label="Nome"
        colorLabel={colors.slimyGreen}
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
        noShadow
        label="Cor"
        colorLabel={colors.slimyGreen}
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
      />
      <InputText
        noShadow
        label="Ícone"
        colorLabel={colors.slimyGreen}
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
      />
      <Button
        onPress={() => {}}
        title="Adicionar"
        backgroundColor={colors.platinum}
        color={colors.davysGrey}
      />
    </Container>
  );
};

export default NewIncomeCategory;

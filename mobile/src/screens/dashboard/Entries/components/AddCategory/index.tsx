import React, { useEffect, useState, useRef } from 'react';

import { BackHandler, TextInput, ToastAndroid } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, StackActions } from '@react-navigation/native';

import { UseAuth } from '../../../../../contexts/AuthContext';

import RootStackParamAuth from '../../../../../@types/RootStackParamAuth';
import { useTheme } from 'styled-components/native'; 
// Styles
import { Container, Form, ColorsContainer, Color, Icon } from './styles';
import { colors } from '../../../../../styles';

// Components
import InputText from '../../../../../components/InputText';
import Button from '../../../../../components/Button';
import Modalize from '../../../../../components/Modalize';
import IconByString from '../../../../../helpers/gerarIconePelaString';

import { Modalize as Modal } from 'react-native-modalize';
import global from '../../../../../global';
import hexToRGB from '../../../../../helpers/hexToRgba';
import {
  Categoria,
  UseCategories,
} from '../../../../../contexts/CategoriesContext';
import { UseDadosTemp } from '../../../../../contexts/TemporaryDataContext';
import retornarIdDoUsuario from '../../../../../helpers/retornarIdDoUsuario';
import Header from '../../../../../components/Header';

const NewExpenseCategory = ({ route }: { route: any }) => {
  const { navigation } = UseDadosTemp();
  const { handleAdicionar } = UseCategories();

  const { tipoCategoria } = route.params;

  type ColorProps = {
    name: string;
    hex: string;
  };

  type IconProps = {
    description: string;
    icon: string;
  };

  const [name, setName] = useState<string>('Essa é nova');
  const [nameError, setNameError] = useState<null | string>(null);
  const nameRef = useRef<TextInput>(null);

  const [color, setColor] = useState({} as ColorProps);
  const [colorError, setColorError] = useState<null | string>();
  const colorRef = useRef<TextInput>(null);

  const [icon, setIcon] = useState({} as IconProps);
  const [iconError, setIconError] = useState<null | string>();
  const iconRef = useRef<TextInput>(null);

  const [modalizeColors, setModalizeColors] = useState([{}] as ColorProps[]);
  const colorModalizeRef = useRef<Modal>(null);

  const [modalizeIcons, setModalizeIcons] = useState([{}] as IconProps[]);
  const iconModalizeRef = useRef<Modal>(null);

  const closeColorModalize = () => colorModalizeRef.current?.close();
  const openColorModalize = () => colorModalizeRef.current?.open();

  const closeIconModalize = () => iconModalizeRef.current?.close();
  const openIconModalize = () => iconModalizeRef.current?.open();

  useEffect(() => {
    setModalizeColors(global.DEFAULT_COLORS);
    setModalizeIcons(global.DEFAULT_ICONS);
  }, []);

  const capitalizeFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const add = async () => {
    const newCreatedCategory = {
      corCategoria: color.hex,
      iconeCategoria: icon.icon,
      nomeCategoria: capitalizeFirstLetter(name),
      tipoCategoria: tipoCategoria,
      isSelected: false,
      tetoDeGastos: 0,
      userCategoria: await retornarIdDoUsuario(),
    } as Categoria;

    const response = await handleAdicionar(newCreatedCategory);

    if (response == '') {
      ToastAndroid.show('Categoria Cadastrada com sucesso', ToastAndroid.SHORT);

      navigation.dispatch(
        StackActions.replace('Lancamentos', { screen: 'Main' }),
      );
    } else {
      ToastAndroid.show(response, ToastAndroid.SHORT);
    }
  };
  const backAction = () => {
    navigation.dispatch(
      StackActions.replace('Lancamentos', {screen: 'Main'}),
    );
    return true;
  };
const theme: any = useTheme()

  return (
    <Container>
      <Header 
        backButton={backAction} 
        title={`Adicionar Categoria de ${tipoCategoria}`} 
        color={theme.colors.silver}
        isShort={true} />
      <Form>
        <InputText
          label="Nome"
          colorLabel={theme.colors.davysGrey}
          inputColor={hexToRGB(theme.colors.davysGrey, 0.7)}
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
          colorLabel={theme.colors.davysGrey}
          placeholder="Amarelo"
          value={color.name}
          error={colorError}
          autoCapitalize="none"
          textContentType="emailAddress"
          secureTextEntry={false}
          returnKeyType="next"
          blurOnSubmit={false}
          ref={colorRef}
          onSubmitEditing={() => iconRef.current?.focus()}
          editable={false}
          onPress={() => {
            openColorModalize();
            setColorError(null);
          }}
          icon={color}
        />
        <InputText
          label="Ícone"
          colorLabel={theme.colors.davysGrey}
          placeholder="Avião"
          value={icon.description}
          error={iconError}
          autoCapitalize="none"
          textContentType="emailAddress"
          secureTextEntry={false}
          blurOnSubmit={false}
          ref={iconRef}
          editable={false}
          onPress={() => {
            openIconModalize();
            setIconError(null);
          }}
          icon={icon}
        />
        <Button
          onPress={() => add()}
          title="Adicionar"
          backgroundColor={theme.colors.platinum}
          color={theme.colors.davysGrey}
        />
      </Form>

      <Modalize
        ref={colorModalizeRef}
        title="Escolha uma cor 🎨"
        backgroundColor={theme.colors.cultured}>
        <ColorsContainer horizontal>
          {modalizetheme.colors.map((color, index) => (
            <Color
              key={index}
              mr={index + 1 != modalizetheme.colors.length}
              bg={color.hex}
              onPress={() => {
                setColor(color);
                closeColorModalize();
              }}
            />
          ))}
        </ColorsContainer>
      </Modalize>

      <Modalize
        ref={iconModalizeRef}
        title="Escolha um ícone ✨"
        backgroundColor={theme.colors.cultured}>
        <ColorsContainer horizontal>
          {modalizeIcons.map((icon, index) => (
            <Icon
              key={index}
              mr={index + 1 != modalizetheme.colors.length}
              onPress={() => {
                setIcon(icon);
                closeIconModalize();
              }}>
              <IconByString
                color={theme.colors.jet}
                size={24}
                stringIcon={icon.icon}
              />
            </Icon>
          ))}
        </ColorsContainer>
      </Modalize>
    </Container>
  );
};

export default NewExpenseCategory;

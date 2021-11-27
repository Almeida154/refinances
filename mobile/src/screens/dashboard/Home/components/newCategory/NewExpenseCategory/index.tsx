import React, { useEffect, useState, useRef } from 'react';

import { BackHandler, TextInput, ToastAndroid } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, StackActions } from '@react-navigation/native';

import { UseAuth } from '../../../../../../contexts/AuthContext';

import RootStackParamAuth from '../../../../../../@types/RootStackParamAuth';

// Styles
import { Container, Form, ColorsContainer, Color, Icon } from './styles';
import { colors } from '../../../../../../styles';

// Components
import InputText from '../../../../../../components/InputText';
import Button from '../../../../../../components/Button';
import Modalize from '../../../../../../components/Modalize';
import IconByString from '../../../../../../helpers/gerarIconePelaString';

import Toast from '@zellosoft.com/react-native-toast-message';
import NiceToast from '../../../../../../components/NiceToast';

import { Modalize as Modal } from 'react-native-modalize';
import global from '../../../../../../global';
import hexToRGB from '../../../../../../helpers/hexToRgba';
import {
  Categoria,
  UseCategories,
} from '../../../../../../contexts/CategoriesContext';
import { UseDadosTemp } from '../../../../../../contexts/TemporaryDataContext';
import retornarIdDoUsuario from '../../../../../../helpers/retornarIdDoUsuario';

const NewExpenseCategory = () => {
  const { navigation } = UseDadosTemp();
  const { handleAdicionar } = UseCategories();

  type ColorProps = {
    name: string;
    hex: string;
  };

  type IconProps = {
    description: string;
    icon: string;
  };

  const [name, setName] = useState<string>('');
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
      tipoCategoria: 'despesa',
      isSelected: false,
      tetoDeGastos: 0,
      userCategoria: await retornarIdDoUsuario(),
    } as Categoria;

    const response = await handleAdicionar(newCreatedCategory);

    if (response == '') {
      Toast.show({
        type: 'niceToast',
        props: {
          type: 'success',
          title: 'Tudo certo!',
          message: 'Categoria adicionada com sucesso',
        },
      });

      navigation.dispatch(StackActions.replace('Main'));
    } else {
      Toast.show({
        type: 'niceToast',
        props: {
          type: 'error',
          title: 'Erro!',
          message: 'Verifique se tudo está correto',
        },
      });
    }
  };

  return (
    <Container>
      <Form>
        <InputText
          label="Nome"
          colorLabel={colors.davysGrey}
          inputColor={hexToRGB(colors.davysGrey, 0.7)}
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
          colorLabel={colors.davysGrey}
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
          colorLabel={colors.davysGrey}
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
          style={{
            backgroundColor: colors.platinum,
          }}
          onPress={() => add()}
          title="Adicionar"
          color={colors.silver}
        />
      </Form>

      <Modalize
        ref={colorModalizeRef}
        title="Escolha uma cor 🎨"
        backgroundColor={colors.cultured}>
        <ColorsContainer horizontal>
          {modalizeColors.map((color, index) => (
            <Color
              key={index}
              mr={index + 1 != modalizeColors.length}
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
        backgroundColor={colors.cultured}>
        <ColorsContainer horizontal>
          {modalizeIcons.map((icon, index) => (
            <Icon
              key={index}
              mr={index + 1 != modalizeColors.length}
              onPress={() => {
                setIcon(icon);
                closeIconModalize();
              }}>
              <IconByString
                color={colors.jet}
                size={24}
                stringIcon={icon.icon}
              />
            </Icon>
          ))}
        </ColorsContainer>
      </Modalize>
      {/* @ts-ignore */}
      <Toast topOffset={0} config={global.TOAST_CONFIG} />
    </Container>
  );
};

export default NewExpenseCategory;

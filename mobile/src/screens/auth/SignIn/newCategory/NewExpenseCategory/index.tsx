import React, { useEffect, useState, useRef } from 'react';

import { BackHandler, TextInput } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, StackActions } from '@react-navigation/native';

import { UseAuth } from '../../../../../contexts/AuthContext';

import RootStackParamAuth from '../../../../../@types/RootStackParamAuth';

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
import { Categoria } from '@contexts/CategoriesContext';

export type PropsNavigation = {
  navigation: StackNavigationProp<RootStackParamAuth, 'NewExpenseCategory'>;
  route: RouteProp<RootStackParamAuth, 'NewExpenseCategory'>;
};

const NewExpenseCategory = ({ navigation, route }: PropsNavigation) => {
  type ColorProps = {
    name: string;
    hex: string;
  };

  type IconProps = {
    description: string;
    icon: string;
  };

  const { setupUserData, updateSetupUserDataProps } = UseAuth();

  const [name, setName] = useState<string>('Essa é nova');
  const [nameError, setNameError] = useState<null>();
  const nameRef = useRef<TextInput>(null);

  const [color, setColor] = useState({} as ColorProps);
  const [colorError, setColorError] = useState<null>();
  const colorRef = useRef<TextInput>(null);

  const [icon, setIcon] = useState({} as IconProps);
  const [iconError, setIconError] = useState<null>();
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

  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', backExAction);
  //   return () =>
  //     BackHandler.removeEventListener('hardwareBackPress', backExAction);
  // }, []);

  // const backExAction = () => {
  //   console.log('caiu expense');
  //   navigation.dispatch(StackActions.replace('EachFixedExpenseCategory'));
  //   return true;
  // };

  const add = () => {
    const newCreatedCategory = {
      corCategoria: color.hex,
      iconeCategoria: icon.icon,
      nomeCategoria: name,
      tipoCategoria: 'despesa',
      isSelected: true,
      tetoDeGastos: null,
    } as Categoria;
    const userData = setupUserData;
    userData.createdCategories != undefined
      ? userData.createdCategories.push(newCreatedCategory)
      : (userData.createdCategories = [newCreatedCategory] as Categoria[]);
    updateSetupUserDataProps(userData);

    console.debug('DENTRO DO CRIAR:::: ', setupUserData.createdCategories);
    //backExAction();
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
          onPress={() => openColorModalize()}
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
          onPress={() => openIconModalize()}
          icon={icon}
        />
        <Button
          onPress={() => add()}
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
    </Container>
  );
};

export default NewExpenseCategory;

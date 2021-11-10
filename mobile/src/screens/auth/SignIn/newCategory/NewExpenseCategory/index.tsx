import React, { useEffect, useState, useRef } from 'react';

import { TextInput } from 'react-native';

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

  const { setupUser, updateSetupUserProps } = UseAuth();

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

  const add = () => {
    var defaultCategories = global.DEFAULT_EXPENSE_CATEGORIES.map(category => {
      let cat = {} as Categoria;
      cat.nomeCategoria = category.description;
      cat.corCategoria = category.color;
      cat.iconeCategoria = category.icon;
      cat.tetoDeGastos = null;
      cat.tipoCategoria = 'despesa';
      cat.isSelected = false;
      return cat;
    });

    const namesCreated =
      setupUser.createdCategories != undefined
        ? [
            ...defaultCategories,
            ...setupUser.createdCategories.filter(
              cc => cc.tipoCategoria == 'despesa',
            ),
          ].filter(cc => cc.nomeCategoria == capitalizeFirstLetter(name))
        : [...defaultCategories].filter(
            cc => cc.nomeCategoria == capitalizeFirstLetter(name),
          );

    if (name.length < 1) setNameError('Escolha um nome');
    if (namesCreated.length > 0) setNameError('Essa categoria já existe');
    if (color.hex == null) setColorError('Escolha uma cor');
    if (icon.icon == null) setIconError('Escolha um ícone');

    if (namesCreated.length == 0 && color.hex != null && icon.icon != null) {
      const newCreatedCategory = {
        corCategoria: color.hex,
        iconeCategoria: icon.icon,
        nomeCategoria: capitalizeFirstLetter(name),
        tipoCategoria: 'despesa',
        isSelected: false,
        tetoDeGastos: null,
      } as Categoria;
      const newSetupProps = setupUser;
      newSetupProps.createdCategories != undefined
        ? newSetupProps.createdCategories.push(newCreatedCategory)
        : (newSetupProps.createdCategories = [
            newCreatedCategory,
          ] as Categoria[]);
      updateSetupUserProps(newSetupProps);

      navigation.dispatch(
        StackActions.replace('EachFixedExpenseCategory', {
          createdCategoryName: capitalizeFirstLetter(name),
        }),
      );
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

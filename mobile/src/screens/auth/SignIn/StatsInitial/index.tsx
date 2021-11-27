import React, { useEffect, useState } from 'react';
import { BackHandler, View, processColor } from 'react-native';

import api from '../../../../services/api';

import global from '../../../../global';

import { UseAuth } from '../../../../contexts/AuthContext';
import { UseConfig } from '../../../../contexts/ConfigContext';
import retornarIdDoUsuario from '../../../../helpers/retornarIdDoUsuario';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, StackActions } from '@react-navigation/native';

import RootStackParamAuth from '../../../../@types/RootStackParamAuth';

// Styles
import {
  Container,
  Content,
  PieContainer,
  Title,
  SubTitle,
  Pic,
  LegendContainer,
  LabelContainer,
  LabelIcon,
  LabelSubtitle,
} from './styles';
import { colors, fonts } from '../../../../styles';

// Components
import Header from '../../components/Header';
import BottomNavigation from '../../components/BottomNavigation';

import { PieChart } from 'react-native-charts-wrapper';
import { Categoria } from '@contexts/CategoriesContext';
import { heightPixel, widthPixel } from '../../../../helpers/responsiveness';
import hexToRGB from '../../../../helpers/hexToRgba';
import doubleToCurrency from '../../../../helpers/doubleToCurrency';

export type PropsNavigation = {
  navigation: StackNavigationProp<RootStackParamAuth, 'StatsInitial'>;
  route: RouteProp<RootStackParamAuth, 'StatsInitial'>;
};

const StatsInitial = ({ route, navigation }: PropsNavigation) => {
  const [totalIncome, setTotalIncome] = useState(80);
  const [totalExpense, setTotalExpense] = useState(20);

  const [expensePercentage, setExpensePercentage] = useState<number>(0);

  const [data, setData] = useState({
    dataSets: [
      {
        values: [
          { value: 10, label: 'Quanto ganha' },
          { value: 10, label: 'Quanto gasta' },
        ],
        config: {
          colors: [
            processColor(colors.redCrayola),
            processColor(colors.bigDipOruby),
          ],
          valueTextSize: 20,
          valueTextColor: processColor(colors.white),
          sliceSpace: 5,
          selectionShift: 13,
          valueFormatter: "#.#'%'",
          valueLineColor: processColor(colors.white),
          valueLinePart1Length: 0.5,
        },
        label: '',
      },
    ],
  });

  const {
    setupUser,
    updateSetupUserProps,
    user,
    handleRegister,
    updateUserProps,
  } = UseAuth();

  const { handleAdicionarConfigByUser } = UseConfig;

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  useEffect(() => {
    console.debug('Json final:::: ', JSON.stringify(setupUser));

    const income = calculateTotal('receita');
    const expense = calculateTotal('despesa');

    setTotalIncome(income);
    setTotalExpense(expense);

    let percentage = ((totalExpense * 100) / totalIncome).toFixed(0);
    setExpensePercentage(parseInt(percentage));

    setData({
      dataSets: [
        {
          values: [
            {
              value: 100 - expensePercentage,
              label: 'Quanto ganha',
            },
            { value: expensePercentage, label: 'Quanto gasta' },
          ],
          label: '',
          config: {
            colors: [
              processColor(colors.redCrayola),
              processColor(colors.bigDipOruby),
            ],
            valueTextColor: processColor('transparent'),
            valueLineColor: processColor('transparent'),
            valueTextSize: 20,
            sliceSpace: 3,
            selectionShift: 24,
            valueFormatter: "#.#'%'",
            valueLinePart1Length: 0.5,
          },
        },
      ],
    });
  }, [expensePercentage, totalIncome, totalExpense]);

  const calculateTotal = (type: string) => {
    const totIn = setupUser.entries.filter(
      entry => entry.tipoLancamento == type,
    );
    const inAmount = totIn.map(
      totIn => totIn.parcelasLancamento[0].valorParcela,
    );

    let totalInAmount = 0;

    for (let i = 0; i < inAmount.length; i++) totalInAmount += inAmount[i];

    return totalInAmount;
  };

  const backAction = () => {
    navigation.dispatch(StackActions.replace('EachFixedIncomeCategory'));
    const newSetupProps = setupUser;
    newSetupProps.incomeTagsCount--;
    updateSetupUserProps(newSetupProps);
    return true;
  };

  const register = async () => {
    const response = await handleRegister();
    console.debug('StatsInitial | register(): ', response);

    const idUser = await retornarIdDoUsuario();

    // @ts-ignore
    const logUser = JSON.parse(await AsyncStorage.getItem('user'));

    var defaultCategoriesIncome = global.DEFAULT_INCOME_CATEGORIES.map(
      category => {
        let cat = {} as Categoria;
        cat.nomeCategoria = category.description;
        cat.corCategoria = category.color;
        cat.iconeCategoria = category.icon;
        cat.tetoDeGastos = null;
        cat.tipoCategoria = 'receita';
        cat.isSelected = false;
        return cat;
      },
    );

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

    var ctgrs =
      setupUser.createdCategories != undefined
        ? [
            ...setupUser.createdCategories,
            ...defaultCategories,
            ...defaultCategoriesIncome,
          ]
        : [...defaultCategories, ...defaultCategoriesIncome];

    api.post(`/user/setupuser/${idUser}`, {
      entries: setupUser.entries,
      allCategories: ctgrs == undefined ? [] : ctgrs,
      accounts: setupUser.accounts,
    });



    logUser.signed = true;
    updateUserProps(logUser);
  };

  const handleTitleContent = () => {
    if (expensePercentage < 20) return 'Muitíssimo bom! :)';
    if (expensePercentage < 40) return 'Está indo muito bem! :)';
    if (expensePercentage < 60) return 'Seu rendimento é ok!';
    if (expensePercentage < 80) return 'Precisamos melhorar muito! :|';
    return 'Mudanças devem ser feitas!';
  };

  const handleSubTitleContent = () => {
    if (expensePercentage < 20)
      return `Você quase não sente na conta, né, ${user.nomeUsuario}? Mas sempre há o que melhorar.`;
    if (expensePercentage < 40)
      return `Podemos ver que seus gastos não comprometem o que ganha, isso é muito bom, ${user.nomeUsuario}.`;
    if (expensePercentage < 60)
      return `Sua renda está na média, ${user.nomeUsuario}. Acho que podemos melhorar isso.`;
    if (expensePercentage < 80)
      return `Precisamos começar a organização agora, ${user.nomeUsuario}. A situação é quase crítica.`;
    return `Algo deve ser feito instantaneamente, ${user.nomeUsuario}. A situação é crítica.`;
  };

  return (
    <Container>
      <Header
        onBackButton={() => backAction()}
        title="Tudo pronto!"
        subtitle="Veja seu rendimento abaixo"
        hasShadow
      />
      <Content>
        <>
          <Title>{handleTitleContent()}</Title>
          <SubTitle style={{ marginTop: heightPixel(10) }}>
            {handleSubTitleContent()}
          </SubTitle>
          <PieContainer>
            <PieChart
              style={{
                flex: 1,
                width: widthPixel(700),
                alignSelf: 'center',
                margin: 0,
                padding: 0,
              }}
              logEnabled={false}
              data={data}
              legend={{ enabled: false }}
              extraOffsets={{ left: 5, top: 5, right: 5, bottom: 5 }}
              entryLabelColor={processColor('transparent')}
              entryLabelTextSize={fonts.size.medium}
              entryLabelFontFamily={fonts.familyType.black}
              drawEntryLabels={false}
              rotationEnabled={false}
              rotationAngle={180}
              usePercentValues={true}
              styledCenterText={{ text: '' }}
              centerTextRadiusPercent={80}
              holeRadius={40}
              chartDescription={{ text: '' }}
              holeColor={processColor('transparent')}
              transparentCircleRadius={45}
              transparentCircleColor={processColor(hexToRGB(colors.white, 0.7))}
              maxAngle={180}
            />
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {user.fotoPerfilUsuario == null ? (
                <Pic
                  source={require('../../../../assets/images/avatarDefault.png')}
                />
              ) : (
                <Pic
                  style={{
                    borderWidth: widthPixel(8),
                    borderColor: colors.platinum,
                  }}
                  source={{ uri: user.fotoPerfilUsuario }}
                />
              )}
            </View>
          </PieContainer>
          <LegendContainer
            style={{
              shadowColor: 'rgba(0, 0, 0, .2)',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.08,
              shadowRadius: 20,
              elevation: 30,
            }}>
            <LabelContainer>
              <LabelIcon style={{ backgroundColor: colors.paradisePink }} />
              <LabelSubtitle>
                O que recebe | {doubleToCurrency(totalIncome, 'pt-br', 'BRL')}
              </LabelSubtitle>
            </LabelContainer>

            <LabelContainer>
              <LabelIcon style={{ backgroundColor: colors.bigDipOruby }} />
              <LabelSubtitle>
                O que gasta | {doubleToCurrency(totalExpense, 'pt-br', 'BRL')}
              </LabelSubtitle>
            </LabelContainer>
          </LegendContainer>
          <SubTitle style={{ opacity: 1 }}>
            <SubTitle style={{ color: hexToRGB(colors.eerieBlack, 0.3) }}>
              Você gasta{' '}
            </SubTitle>
            <SubTitle
              style={{
                color: hexToRGB(colors.eerieBlack, 0.5),
                fontFamily: fonts.familyType.black,
              }}>
              {expensePercentage}%
            </SubTitle>
            <SubTitle style={{ color: hexToRGB(colors.eerieBlack, 0.3) }}>
              {' '}
              daquilo que recebe.
            </SubTitle>
          </SubTitle>
        </>
      </Content>

      <BottomNavigation
        onPress={() => register()}
        description="Quero começar"
        color={colors.white}
        backgroundColor={colors.paradisePink}
        isCentered
      />
    </Container>
  );
};

export default StatsInitial;

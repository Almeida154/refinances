import React from 'react';

import {
  Categoria,
  UseCategories,
} from '../../../../../../contexts/CategoriesContext';

import { ProgressBar } from 'react-native-paper';

import {
  Category,
  CategoryDesc,
  Percent,
  PercentText,
  CategoryTouchable,
  SectionDescription,
  SectionIcon,
  SectionName,
  Progress,
  CategoryAddTetoGasto,
  SectionText,
  AddLimite,
} from './styles';

import { UseDadosTemp } from '../../../../../../contexts/TemporaryDataContext';
import retornarIdDoUsuario from '../../../../../../helpers/retornarIdDoUsuario';

import Icon from '../../../../../../helpers/gerarIconePelaString';

type PropsCardCategory = {
  item: Categoria;
};

const CardCategory = ({ item }: PropsCardCategory) => {
  const { navigation } = UseDadosTemp();

  // console.debug("CardCategory | item[nome]", item.nomeCategoria)
  // console.debug("CardCategory | item[valueLancamentos]", item.valueLancamentos)
  // console.debug("CardCategory | item[tetodeGastos]", item.tetoDeGastos)
  // console.log()
  return (
    <Category key={item.id}>
      <SectionDescription>
        <CategoryTouchable></CategoryTouchable>

        <SectionIcon style={{ borderColor: item.corCategoria }}>
          <Icon size={25} color="gray" stringIcon={item.iconeCategoria} />
        </SectionIcon>

        <SectionName>
          <SectionText
            style={
              item.tetoDeGastos == 0
                ? {
                    justifyContent: 'center',
                    alignItems: 'center',
                  }
                : {}
            }>
            <CategoryDesc>{item.nomeCategoria}</CategoryDesc>

            <CategoryAddTetoGasto
              onPress={
                item.tipoCategoria == 'despesa'
                  ? () => {
                      navigation.navigate('StackAccount', {
                        screen: 'EditCategory',
                        params: { categoryId: item.id },
                      });
                    }
                  : () => {}
              }>
              <AddLimite>
                {item.tipoCategoria == 'despesa'
                  ? item.tetoDeGastos != 0
                    ? 'R$ ' +
                      Math.abs(item.valueLancamentos) +
                      ' de R$ ' +
                      item.tetoDeGastos
                    : 'Novo limite'
                  : 'R$ ' +
                    Math.abs(item.valueLancamentos)
                      .toFixed(2)
                      .replace('.', ',')}
              </AddLimite>
            </CategoryAddTetoGasto>
          </SectionText>

          <Progress>
            <ProgressBar
              progress={
                item.tetoDeGastos != 0
                  ? Math.abs(item.valueLancamentos / item.tetoDeGastos)
                  : 0
              }
              color={item.corCategoria}
              style={
                item.tetoDeGastos != 0
                  ? {
                      height: 7,
                      marginVertical: 8,
                      borderRadius: 10,
                    }
                  : { display: 'none' }
              }
            />
          </Progress>
        </SectionName>
      </SectionDescription>
    </Category>
  );
};

export default CardCategory;

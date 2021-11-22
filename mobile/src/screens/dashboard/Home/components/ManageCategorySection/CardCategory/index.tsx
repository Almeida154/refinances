import React from 'react';

import { Categoria } from '../../../../../../contexts/CategoriesContext';

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
  SectionText
} from './styles';

import { UseDadosTemp } from '../../../../../../contexts/TemporaryDataContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { GoalsStack } from '../../../../../../@types/RootStackParamApp';

import Icon from '../../../../../../helpers/gerarIconePelaString'

type PropsCardCategory = {
  item: Categoria;
};

const CardCategory = ({ item }: PropsCardCategory) => {
  const { navigation } = UseDadosTemp();

  return (
    <Category key={item.id}>
      <SectionDescription>
        <CategoryTouchable>
        
        </CategoryTouchable>

        <SectionIcon style={{borderColor: item.corCategoria}}>
          <Icon size={25} color='gray' stringIcon={ item.iconeCategoria }/>
        </SectionIcon>

        <SectionName>

          <SectionText>

            <CategoryDesc>{item.nomeCategoria}</CategoryDesc>

              <CategoryAddTetoGasto 
                onPress={() => {
                navigation.navigate('StackAccount', {
                  screen: 'EditCategory',
                  params: { categoryId: item.id },
                });
              }}> 
              
              <CategoryDesc>Editar</CategoryDesc>
            </CategoryAddTetoGasto>
          
          </SectionText>

          <Progress>
            <ProgressBar
              progress={1}
              color={item.corCategoria}
              style={{
                height: 7,
                marginVertical: 8,
                borderRadius: 10,
              }}
            />
          </Progress>
        </SectionName>
      </SectionDescription>


      {/*<Percent>
        <PercentText>25%</PercentText>
      </Percent>*/}

    </Category>
  );
};

export default CardCategory;

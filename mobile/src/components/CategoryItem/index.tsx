import React from 'react';
import { Text, TouchableOpacityProps, View } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { colors } from '../../styles';
import {
  Container,
  Content,
  Data,
  Info,
  IconEdit,
  Description,
  Category,
  IconContainer,
  PercentDetail,
  Percent,
} from './styles';

import { Categoria } from '../../contexts/CategoriesContext';
import { UseDadosTemp } from '../../contexts/TemporaryDataContext';

import { widthPixel } from '../../helpers/responsiveness';
import hexToRGB from '../../helpers/hexToRgba';
import shadowBox from '../../helpers/shadowBox';
import Icon from '../../helpers/gerarIconePelaString';
import { ProgressBar } from 'react-native-paper';

interface IProps extends TouchableOpacityProps {
  category: Categoria;
}

const CategoryItem: React.FC<IProps> = ({ category, ...rest }) => {
  const { navigation } = UseDadosTemp();
  return (
    <Container style={shadowBox(10, 0.2)}>
      <Content
        {...rest}
        activeOpacity={1}
        onPress={() => {
          navigation.navigate('StackAccount', {
            screen: 'EditCategory',
            params: { categoryId: category.id },
          });
        }}>
        <IconContainer style={{ borderColor: category.corCategoria }}>
          <Icon
            color={category.corCategoria}
            size={widthPixel(70)}
            stringIcon={category.iconeCategoria}
          />
          {category.tetoDeGastos != 0 && (
            <PercentDetail
              style={[
                shadowBox(20, 0.6),
                { borderColor: category.corCategoria },
              ]}>
              <Percent>
                90<Text style={{ fontSize: widthPixel(15) }}>%</Text>
              </Percent>
            </PercentDetail>
          )}
        </IconContainer>
        <Info>
          <Description numberOfLines={1}>{category?.nomeCategoria}</Description>
          <Category numberOfLines={1}>Teto de gastos</Category>
        </Info>
        <IconEdit>
          <MaterialCommunityIcons
            name="lead-pencil"
            size={widthPixel(60)}
            color={hexToRGB(colors.davysGrey, 0.2)}
          />
        </IconEdit>
      </Content>
      <Data style={shadowBox(10, 0.4)}>
        {category.tetoDeGastos != 0 && (
          <ProgressBar
            style={{
              height: '100%',
              width: '100%',
              borderBottomLeftRadius: widthPixel(20),
              borderBottomRightRadius: widthPixel(20),
            }}
            color={category.corCategoria}
            progress={0.7}
          />
        )}
      </Data>
    </Container>
  );
};

export default CategoryItem;

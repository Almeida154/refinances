import { Categoria } from '@contexts/CategoriesContext';
import React from 'react';

import { Container, Content, Data, Name, IsSelected } from './styles';

import IconCategory from '../../../../components/IconCategory';

import Feather from 'react-native-vector-icons/Feather';

interface IProps {
  item: Categoria;
  lastOne?: boolean;
  onPress?: () => void;
  isSelected?: boolean;
}

const CategoryItem: React.FC<IProps> = ({
  item,
  lastOne,
  onPress,
  isSelected,
}) => {
  return (
    <Container>
      <Content
        style={[
          lastOne ? {} : { marginBottom: 10 },
          {
            shadowColor: 'rgba(0, 0, 0, .1)',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.08,
            shadowRadius: 20,
            elevation: 10,
          },
        ]}>
        <Data onPress={onPress}>
          <>
            <IconCategory
              stringIcon={item.iconeCategoria}
              color={item.corCategoria}
            />
            <Name>{item.nomeCategoria}</Name>
            <Feather style={{ opacity: 0.1 }} name="chevron-right" size={30} />
          </>
        </Data>
        <IsSelected
          style={[
            isSelected
              ? { backgroundColor: item.corCategoria, opacity: 0.7 }
              : {},
            {
              shadowColor: 'rgba(0, 0, 0, .6)',
              shadowOffset: { width: 0, height: -10 },
              shadowOpacity: 0.08,
              shadowRadius: 20,
              elevation: 20,
            },
          ]}
        />
      </Content>
    </Container>
  );
};

export default CategoryItem;

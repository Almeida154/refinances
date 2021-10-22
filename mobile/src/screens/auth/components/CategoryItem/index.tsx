import { Categoria } from '@contexts/CategoriesContext';
import React from 'react';

import { Container, Content, Name } from './styles';

import IconCategory from '../../../../components/IconCategory';

interface IProps {
  item: Categoria;
  lastOne?: boolean;
}

const CategoryItem: React.FC<IProps> = ({ item, lastOne }) => {
  return (
    <Container>
      <Content
        style={[
          lastOne ? {} : { marginBottom: 10 },
          {
            shadowColor: 'rgba(0, 0, 0, .4)',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.08,
            shadowRadius: 20,
            elevation: 20,
          },
        ]}>
        <IconCategory
          stringIcon={item.iconeCategoria}
          color={item.corCategoria}
        />
        <Name>{item.nomeCategoria}</Name>
      </Content>
    </Container>
  );
};

export default CategoryItem;

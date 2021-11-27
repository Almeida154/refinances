import React from 'react';
import { StackActions } from '@react-navigation/native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  Container,
  Description,
  DescriptionContainer,
  Icon,
  Item,
  Plus,
  RightButton,
  Title,
} from './styles';
import shadowBox from '../../../../../helpers/shadowBox';
import { View } from 'react-native';
import { metrics } from '../../../../../styles';
import { widthPixel } from '../../../../../helpers/responsiveness';

interface IProps {
  name: string;
  description: string;
}

const CreateCard: React.FC<IProps> = ({ name, description }) => {
  return (
    <Container style={shadowBox(30, 0.3)}>
      <View
        style={{
          flex: 1,
          padding: metrics.default.boundaries / 1.6,
          paddingRight: metrics.default.boundaries / 1.6 + widthPixel(140),
        }}>
        <Title>Criar {name}</Title>
        <Item>
          <DescriptionContainer>
            <Description>{description}</Description>
          </DescriptionContainer>
        </Item>
      </View>
      <RightButton>
        <Plus>+</Plus>
      </RightButton>
    </Container>
  );
};

export default CreateCard;

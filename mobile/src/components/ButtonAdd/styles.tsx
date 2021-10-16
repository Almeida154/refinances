import styled from 'styled-components/native';
import { colors, fonts, metrics } from '../../styles';

import { Dimensions } from 'react-native';

var {width, height} = Dimensions.get('window')

export const Container = styled.View `
  flex: 1;
`;

export const Button = styled.TouchableOpacity`
  justifyContent: center;
  alignItems: center;
  position: absolute;
  bottom: 10;
  right: 10;
  border-radius: 50px;
  width: 70;
  height: 70;
`;

export const Icon = styled.View`
`;

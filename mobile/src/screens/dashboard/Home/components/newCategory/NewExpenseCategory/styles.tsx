import styled from 'styled-components/native';
import { colors, fonts, metrics } from '../../../../../../styles';

import hexToRGB from '../../../../../../helpers/hexToRgba';

export const Container = styled.View`
  padding: ${`${metrics.default.boundaries}px`};
  flex: 1;
  background: ${colors.back};
`;

export const Form = styled.View`
  elevation: 0;
`;

export const ColorsContainer = styled.ScrollView`
  flex: 1;
  padding: ${`${metrics.default.boundaries}px`};
`;

interface ColorProps {
  bg?: string;
  mr?: boolean;
}

export const Color = styled.TouchableOpacity<ColorProps>`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  border-width: 5px;
  border-color: ${props => hexToRGB(props.bg, 1)};
  background-color: ${props => hexToRGB(props.bg, 0.7)};
  margin-right: ${props => (props.mr ? '10px' : 0)};
`;

interface IconProps {
  mr?: boolean;
}

export const Icon = styled.TouchableOpacity<IconProps>`
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  border-width: 5px;
  border-color: ${colors.platinum};
  background-color: ${colors.diffWhite};
  margin-right: ${props => (props.mr ? '10px' : 0)};
`;

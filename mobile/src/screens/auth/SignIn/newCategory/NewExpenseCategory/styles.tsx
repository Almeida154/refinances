import styled from 'styled-components/native';
import { colors, fonts, metrics } from '../../../../../styles';

export const Container = styled.View`
  padding: ${`${metrics.default.boundaries}px`};
  flex: 1;
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

export const Color = styled.View<ColorProps>`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${props => props.bg};
  margin-right: ${props => (props.mr ? '10px' : 0)};
`;

import styled from 'styled-components/native';
import { heightPixel } from '../../helpers/responsiveness';
import { colors, fonts, metrics } from '../../styles';

interface ContainerProps {
  lastOne?: boolean;
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  width: 100%;
  height: 68px;
  justify-content: center;
  align-items: center;
  font-family: ${fonts.familyType.bold};
  background-color: ${colors.silver};
  border-radius: ${`${metrics.inputText.radius}px`};
  margin: ${props => (props.lastOne ? 0 : heightPixel(22))}px 0;
`;

export const Text = styled.Text`
  font-size: ${`${fonts.size.big}px`};
  color: ${colors.white};
  font-family: ${fonts.familyType.bold};
  text-align: center;
`;

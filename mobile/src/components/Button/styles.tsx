import styled from 'styled-components/native';
import { colors, fonts, metrics } from '../../styles';

interface ContainerProps {
  lastOne?: boolean;
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  width: 100%;
  padding: 18px;
  font-family: ${fonts.familyType.bold};
  background-color: ${colors.paradisePink};
  border-radius: ${`${metrics.inputText.radius}px`};
  margin: ${props => (props.lastOne ? 0 : 10)}px 0;
`;

export const Text = styled.Text`
  font-size: ${`${fonts.size.big}px`};
  color: ${colors.white};
  font-family: ${fonts.familyType.bold};
  text-align: center;
`;

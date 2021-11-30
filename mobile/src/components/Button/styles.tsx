import styled from 'styled-components/native';
import { heightPixel, widthPixel } from '../../helpers/responsiveness';
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
  background-color: ${(props : any) => props.theme.colors.silver};
  border-radius: ${`${widthPixel(20)}px`};
  margin: ${props => (props.lastOne ? 0 : heightPixel(22))}px 0;
`;

export const Text = styled.Text`
  font-size: ${`${fonts.size.big}px`};
  color: ${(props : any) => props.theme.colors.white};
  font-family: ${fonts.familyType.bold};
  text-align: center;
`;

import styled from 'styled-components/native';
import { colors, fonts, metrics } from '../../../../styles';

export const Container = styled.View`
  padding-top: ${`${metrics.default.statusBarHeight}px`};
  background-color: ${(props : any) => props.theme.colors.diffWhite};
  flex: 1;
`;

export const Content = styled.TouchableOpacity`
  flex: 1;
  padding: ${`${metrics.default.boundaries}px`};
`;

export const Writting = styled.View`
  margin-top: 10%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Input = styled.TextInput`
  font-size: ${`${fonts.size.big}px`};
  font-family: ${fonts.familyType.bold};
  color: ${(props : any) => props.theme.colors.davysGrey};
  flex: 1;
`;

export const Error = styled.Text`
  font-size: ${`${fonts.size.small}px`};
  color: ${(props : any) => props.theme.colors.redCrayola};
  padding: 5px;
  opacity: 0.3;
`;

import styled from 'styled-components/native';
import { colors, fonts, metrics } from '../../../../../../../styles';

export const Container = styled.TouchableHighlight`
  width: 100%;
  background-color: ${(props: any) => props.theme.colors.white};
  border-radius: ${`${metrics.inputText.radius}px`};
  padding: 8px 20px;
  flex-direction: row;
  border-width: 1px;
  border-color: ${(props: any) => props.theme.colors.white};
`;

export const Writting = styled.View`
  flex: 1;
`;

export const IconClean = styled.View`
  justify-content: center;
  align-items: center;
  margin-left: 20px;
`;

export const Label = styled.Text`
  font-family: ${fonts.familyType.bold};
  font-size: ${`${fonts.size.big}px`};
  color: ${(props: any) => props.theme.colors.redCrayola};
  line-height: 28px;
`;

export const Input = styled.View`
  color: ${(props: any) => props.theme.colors.davysGrey};
  padding: 0;
  margin-top: -4px;
`;

export const Error = styled.Text`
  margin-bottom: 10px;
  font-family: ${fonts.familyType.bold};
  color: ${(props: any) => props.theme.colors.redCrayola};
  padding: 0 20px;
  opacity: 0.3;
`;

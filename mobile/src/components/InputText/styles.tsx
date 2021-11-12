import styled from 'styled-components/native';
import { heightPixel, widthPixel } from '../../helpers/responsiveness';
import { colors, fonts, metrics } from '../../styles';

export const Container = styled.TouchableHighlight`
  width: 100%;
  background-color: ${colors.white};
  border-radius: ${`${metrics.inputText.radius}px`};
  padding: ${`${heightPixel(20)}px`} ${`${widthPixel(48)}px`};
  flex-direction: row;
  border-width: ${`${widthPixel(4)}px`};
  border-color: ${colors.white};
`;

export const Writting = styled.View`
  flex: 1;
`;

export const RowAux = styled.View`
  flex-direction: row;
`;

export const IconClean = styled.View`
  justify-content: center;
  align-items: center;
  margin-left: ${`${widthPixel(40)}px`};
`;

export const Label = styled.Text`
  font-family: ${fonts.familyType.bold};
  font-size: ${`${fonts.size.big}px`};
  color: ${colors.redCrayola};
  line-height: 28px;
`;

export const Input = styled.TextInput`
  flex: 1;
  font-family: ${fonts.familyType.bold};
  font-size: ${`${fonts.size.medium}px`};
  color: ${colors.davysGrey};
  padding: 0;
  margin-top: ${`${heightPixel(-14)}px`};
`;

export const Error = styled.Text`
  margin-top: ${`${heightPixel(16)}px`};
  margin-bottom: ${`${heightPixel(32)}px`};
  font-family: ${fonts.familyType.bold};
  color: ${colors.redCrayola};
  padding: 0 ${`${widthPixel(48)}px`};
  opacity: 0.3;
`;

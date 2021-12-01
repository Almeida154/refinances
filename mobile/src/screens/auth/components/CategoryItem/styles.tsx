import styled from 'styled-components/native';
import { heightPixel, widthPixel } from '../../../../helpers/responsiveness';
import { colors, fonts, metrics } from '../../../../styles';

export const Container = styled.View`
  padding: 0 ${`${metrics.default.boundaries}px`};
`;

export const Content = styled.View`
  border-radius: ${`${metrics.inputText.radius}px`};
  background-color: ${(props : any) => props.theme.colors.white};
  flex: 1;
`;

export const Data = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${`${heightPixel(30)}px`} ${`${widthPixel(40)}px`};
`;

export const Name = styled.Text`
  color: ${(props : any) => props.theme.colors.davysGrey};
  opacity: 0.8;
  font-family: ${fonts.familyType.bold};
  font-size: ${`${fonts.size.big - 2}px`};
  padding: 0 ${`${widthPixel(30)}px`};
  flex: 1;
  line-height: ${`${fonts.size.big - 2 + heightPixel(8)}px`};
  margin-bottom: ${`${heightPixel(-10)}px`};
`;

export const IsSelected = styled.View`
  background-color: ${(props : any) => props.theme.colors.white};
  flex: 1;
  height: ${`${heightPixel(45)}px`};
  border-radius: ${`${metrics.inputText.radius}px`};
  border-top-left-radius: 0;
  border-top-right-radius: 0;
`;

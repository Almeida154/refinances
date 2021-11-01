import styled from 'styled-components/native';
import { colors, fonts, metrics } from '../../../../styles';

export const Container = styled.View`
  padding: 0 ${`${metrics.default.boundaries}px`};
`;

export const Content = styled.View`
  border-radius: ${`${metrics.inputText.radius}px`};
  background-color: ${colors.white};
  flex: 1;
`;

export const Data = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 14px 18px;
`;

export const Name = styled.Text`
  color: ${colors.davysGrey};
  opacity: 0.8;
  font-family: ${fonts.familyType.bold};
  font-size: ${`${fonts.size.big - 2}px`};
  padding: 0 14px;
  flex: 1;
  line-height: 24px;
  margin-bottom: -4px;
`;

export const IsSelected = styled.View`
  background-color: ${colors.white};
  flex: 1;
  height: 24px;
  border-radius: ${`${metrics.inputText.radius}px`};
  border-top-left-radius: 0;
  border-top-right-radius: 0;
`;

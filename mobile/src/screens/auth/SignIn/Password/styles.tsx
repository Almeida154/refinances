import styled from 'styled-components/native';
import { colors, fonts, metrics } from '../../../../styles';

export const Container = styled.View`
  padding-top: ${`${metrics.default.statusBarHeight}px`};
  background-color: ${colors.diffWhite};
  flex: 1;
`;

export const Content = styled.TouchableOpacity`
  padding: ${`${metrics.default.boundaries}px`};
  flex: 1;
  margin-bottom: 80px; // Altura do Bottom Navigation
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
  color: ${colors.davysGrey};
  flex: 1;
`;

export const Error = styled.Text`
  font-size: ${`${fonts.size.small}px`};
  color: ${colors.redCrayola};
  padding: 5px;
  opacity: 0.3;
`;

export const RequisitContainer = styled.View`
  position: absolute;
  left: ${`${metrics.default.boundaries}px`};
  bottom: ${`${metrics.default.boundaries}px`};
`;

export const Requisit = styled.Text`
  font-size: ${`${fonts.size.small}px`};
  color: ${colors.davysGrey};
  opacity: 0.3;
`;

import styled from 'styled-components/native';
import { colors, fonts, metrics } from '../../../../styles';

export const Container = styled.View`
  padding-top: ${`${metrics.default.statusBarHeight}px`};
  background-color: ${colors.diffWhite};
  flex: 1;
`;

export const ScrollContainer = styled.ScrollView`
  margin-bottom: 80px; // Altura do BottomNavigation
`;

export const TagContainer = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 ${`${metrics.default.boundaries}px`};
`;

export const ButtonContainer = styled.View`
  padding: 0 ${`${metrics.default.boundaries}px`};
`;

export const Tag = styled.Text`
  background-color: ${colors.white};
  color: ${colors.paradisePink};
  font-size: ${`${fonts.size.medium}px`};
  font-family: ${`${fonts.familyType.bold}`};
  margin: 6px 12px 6px 0;
  padding: 10px 20px;
  border-radius: 10px;
`;

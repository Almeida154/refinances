import styled from 'styled-components/native';
import { heightPixel, widthPixel } from '../../../../helpers/responsiveness';
import { colors, fonts, metrics } from '../../../../styles';

export const Container = styled.View`
  padding-top: ${`${metrics.default.statusBarHeight}px`};
  background-color: ${(props : any) => props.theme.colors.diffWhite};
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
  background-color: ${(props : any) => props.theme.colors.white};
  color: ${(props : any) => props.theme.colors.slimyGreen};
  font-size: ${`${fonts.size.medium}px`};
  font-family: ${`${fonts.familyType.bold}`};
  margin: ${`${heightPixel(14)}px`} ${`${widthPixel(28)}px`}
    ${`${heightPixel(14)}px`} 0;
  padding: ${`${heightPixel(20)}px`} ${`${widthPixel(36)}px`};
  border-radius: 10px;
`;

export const CountContainer = styled.View`
  flex-direction: row;
  padding: 20px ${`${metrics.default.boundaries}px`};
  opacity: 0.9;
`;

interface ICountProps {
  counter?: boolean;
}

export const Count = styled.Text<ICountProps>`
  color: ${props => (props.counter ? (props : any) => props.theme.colors.slimyGreen : (props : any) => props.theme.colors.davysGrey)};
  font-size: ${`${fonts.size.medium}px`};
  font-family: ${`${fonts.familyType.bold}`};
`;

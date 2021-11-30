import styled from 'styled-components/native';
import { widthPixel } from '../../../../../helpers/responsiveness';
import { colors, metrics } from '../../../../../styles';

import fonts from '../../../../../styles/fonts';

export const Container = styled.View`
  padding-top: ${`${metrics.default.statusBarHeight}px`};
  background-color: ${(props : any) => props.theme.colors.diffWhite};
  flex: 1;
`;

export const ScreenDescription = styled.View`
  background-color: ${(props : any) => props.theme.colors.lightGray};
  padding: ${`${metrics.default.boundaries / 1.6}px`};
  padding-left: ${`${metrics.default.boundaries}px`};
  padding-right: ${`${metrics.default.boundaries}px`};
`;

export const Content = styled.ScrollView`
  padding-top: ${`${metrics.default.boundaries}px`};
  background-color: ${(props : any) => props.theme.colors.diffWhite};
`;

export const Title = styled.Text`
  color: ${(props : any) => props.theme.colors.davysGrey};
  font-family: ${`${fonts.familyType.bold}`};
  font-size: ${`${fonts.size.small}px`};
  opacity: 0.5;
`;

export const Subtitle = styled.Text`
  color: ${(props : any) => props.theme.colors.davysGrey};
  font-family: ${`${fonts.familyType.semiBold}`};
  font-size: ${`${fonts.size.small - widthPixel(8)}px`};
  opacity: 0.3;
`;

import styled from 'styled-components/native';
import { heightPixel, widthPixel } from '../../../helpers/responsiveness';
import { fonts, colors, metrics } from '../../../styles';

export const Container = styled.ScrollView`
  padding-top: ${`${metrics.default.statusBarHeight}px`};
  flex: 1;
  background-color: ${(props: any) => props.theme.colors.back};
`;

export const Header = styled.View`
  flex-direction: row;
  height: ${`${heightPixel(300)}px`};
  padding: ${`${metrics.default.boundaries / 1.4}px`};
  justify-content: space-between;
  align-items: center;
`;

export const Greeting = styled.View``;

export const Name = styled.Text`
  font-size: ${`${fonts.size.bigger}px`};
  font-family: ${fonts.familyType.bold};
  color: ${(props: any) => props.theme.colors.davysGrey};
  opacity: 0.9;
`;

export const Salutation = styled.Text`
  font-size: ${`${fonts.size.medium}px`};
  font-family: ${fonts.familyType.bold};
  margin-top: ${`${heightPixel(-18)}px`};
  color: ${(props: any) => props.theme.colors.davysGrey};
  opacity: 0.3;
`;

export const ActionsAndAssets = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ConfigContainer = styled.TouchableOpacity`
  background-color: ${(props: any) => props.theme.colors.culture};
  width: ${`${widthPixel(140)}px`};
  height: ${`${widthPixel(140)}px`};
  border-radius: ${`${widthPixel(35)}px`};
  margin-right: ${`${metrics.default.boundaries / 5}px`};
  justify-content: center;
  align-items: center;
`;

export const Photo = styled.Image`
  background-color: ${(props: any) => props.theme.colors.white};
  width: ${`${widthPixel(140)}px`};
  height: ${`${widthPixel(140)}px`};
  border-radius: ${`${widthPixel(35)}px`};
`;

export const Content = styled.View`
  padding: ${`${metrics.default.boundaries / 1.6}px`};
  padding-top: 0;
  padding-bottom: ${`${heightPixel(160)}px`};
`;

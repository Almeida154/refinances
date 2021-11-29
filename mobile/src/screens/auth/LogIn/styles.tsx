import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { heightPixel } from '../../../helpers/responsiveness';
import { colors, fonts, metrics } from '../../../styles';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Header = styled.View`
  position: relative;
  flex: 1;
`;

export const Content = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  min-height: ${`${metrics.screen.height * 0.6}px`};
  background-color: ${(props: any) => props.theme.colors.cultured};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

export const Form = styled.View`
  background-color: ${(props: any) => props.theme.colors.diffWhite};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: ${`${metrics.default.boundaries}px`};
  height: 100%;
`;

export const Title = styled.Text`
  text-align: center;
  font-family: ${fonts.familyType.bold};
  font-size: ${`${fonts.size.bigger}px`};
  color: ${(props: any) => props.theme.colors.davysGray};
  opacity: 0.7;
  padding: ${`${heightPixel(38)}px`};
`;

export const TextForgotPassword = styled.Text`
  text-align: right;
  font-family: ${fonts.familyType.bold};
  font-size: ${`${fonts.size.small}px`};
  color: ${(props: any) => props.theme.colors.davysGray};
  margin: ${`${heightPixel(48)}px`} 0;
`;

export const TextNoAccount = styled.Text`
  text-align: center;
  font-family: ${fonts.familyType.bold};
  font-size: ${`${fonts.size.small}px`};
  color: ${(props: any) => props.theme.colors.davysGray};
  margin-top: ${`${heightPixel(48 * 2)}px`};
`;

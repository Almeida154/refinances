import { StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { colors, fonts, metrics } from '../../../styles';

export const Container = styled.View`
  background-color: ${(props: any) => props.theme.colors.paradisePink};
  padding-top: ${`${StatusBar.currentHeight}px`};
  font-family: 'Nunito-Italic';
  height: 100%;
  width: 100%;
`;

export const Boundaries = styled.View`
  padding-right: 30px;
  padding-left: 30px;
  height: 100%;
  background-color: ${(props: any) => props.theme.colors.white};
  border-top-right-radius: 22px;
  border-top-left-radius: 22px;
`;

export const Header = styled.View`
  height: 25%;
  padding-right: 30px;
  padding-left: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 32px;
  color: ${(props: any) => props.theme.colors.white};
  font-family: 'Nunito-Black';
  line-height: 36px;
`;

export const Content = styled.View`
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;
  padding-top: 30px;
  padding-bottom: 30px;
`;

export const ButtonText = styled.Text`
  font-size: 20px;
  color: ${(props: any) => props.theme.colors.white};
  font-family: 'Nunito-Bold';
  text-align: center;
`;

export const ContainerContentButtonGoogle = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: 35px;
`;

export const ButtonTextGoogle = styled(ButtonText)`
  color: ${(props: any) => props.theme.colors.black};
  opacity: 0.75;
  margin-left: 20px;
`;

export const Txt = styled.Text`
  font-size: 20px;
  color: ${(props: any) => props.theme.colors.navyBlue};
  font-family: 'Nunito-Italic';
  text-align: center;
`;

export const TxtBottom = styled(Txt)`
  margin-top: 30px;
  z-index: 10;
`;

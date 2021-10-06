import styled from 'styled-components/native';
import { colors, fonts, metrics } from '../../../styles';

export const Container = styled.View`
  font-family: ${fonts.familyType.regular};
  flex: 1;
`;

export const Boundaries = styled.View`
  padding: ${`${metrics.default.boundaries}px`};

  height: 100%;
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
  background-color: ${colors.cultured};
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
`;

export const Form = styled.View`
  justify-content: center;
  background-color: ${colors.white};
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
`;

export const Title = styled.Text`
  text-align: center;
  font-family: ${fonts.familyType.bold};
  font-size: ${`${fonts.size.bigger}px`};
  color: ${colors.davysGrey};
  opacity: 0.7;
  line-height: 40px;
  padding: 20px;
`;

export const TextForgotPassword = styled.Text`
  text-align: center;
  font-family: ${fonts.familyType.bold};
  font-size: ${`${fonts.size.small}px`};
  color: ${colors.platinum};
  margin-top: 10px;
`;

export const TextNoAccount = styled.Text`
  text-align: center;
  font-family: ${fonts.familyType.bold};
  font-size: ${`${fonts.size.medium}px`};
  color: ${colors.davysGrey};
  opacity: 0.3;
  margin-top: 20%;
`;

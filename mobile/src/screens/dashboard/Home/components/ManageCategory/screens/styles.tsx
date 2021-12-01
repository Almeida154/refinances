import styled from 'styled-components/native';
import { widthPixel } from '../../../../../../helpers/responsiveness';

import { fonts, colors, metrics } from '../../../../../../styles';

export const Title = styled.Text`
  font-size: ${`${fonts.size.big}px`};
  color: ${(props: any) => props.theme.colors.davysGrey};
  font-family: ${`${fonts.familyType.black}`};
  text-align: center;
  margin-bottom: 20px;
`;

export const Subtitle = styled.Text`
  font-size: ${`${fonts.size.small}px`};
  color: ${(props: any) => props.theme.colors.davysGrey};
  font-family: ${`${fonts.familyType.bold}`};
  text-align: center;
  opacity: 0.7;
  margin-bottom: 20px;
`;

export const Goal = styled.View`
  position: relative;
  background-color: ${(props: any) => props.theme.colors.snow};
  margin-bottom: 30px;
  padding: 20px;
  border-radius: 10px;
`;

export const GoalTouchable = styled.TouchableOpacity``;

export const GoalDesc = styled.Text`
  font-size: ${`${fonts.size.medium}px`};
  color: ${(props: any) => props.theme.colors.davysGrey};
  font-family: ${`${fonts.familyType.black}`};
`;

export const DaysLeft = styled.Text`
  font-size: ${`${fonts.size.smaller}px`};
  color: ${(props: any) => props.theme.colors.davysGrey};
  font-family: ${`${fonts.familyType.bold}`};
  opacity: 0.3;
`;

export const InvestedMoney = styled.Text`
  font-size: ${`${fonts.size.smaller}px`};
  font-family: ${`${fonts.familyType.bold}`};
  color: ${(props: any) => props.theme.colors.davysGrey};
`;

export const Percent = styled.View`
  background-color: ${(props: any) => props.theme.colors.white};
  position: absolute;
  right: -20px;
  top: -20px;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  opacity: 0.8;
  justify-content: center;
  align-items: center;
`;

export const PercentText = styled.Text`
  color: ${(props: any) => props.theme.colors.davysGrey};
  font-family: ${`${fonts.familyType.regular}`};
`;

export const Loading = styled.View`
  align-self: center;
  height: 100%;
  justify-content: center;
`;

export const TextLoading = styled.Text`
  color: ${(props: any) => props.theme.colors.PrussianBlue};
  font-size: ${`${fonts.size.big}px`};
  font-family: ${`${fonts.familyType.regular}`};
  margin-top: 20px;
`;

export const ScreenDescription = styled.View`
  background-color: ${(props: any) => props.theme.colors.culture};
  padding: ${`${metrics.default.boundaries / 1.6}px`};
  padding-left: ${`${metrics.default.boundaries}px`};
  padding-right: ${`${metrics.default.boundaries}px`};
`;

export const Content = styled.Text`
  color: ${(props: any) => props.theme.colors.davysGrey};
  font-family: ${`${fonts.familyType.semiBold}`};
  font-size: ${`${fonts.size.small - widthPixel(8)}px`};
  opacity: 0.3;
`;

export const FAB = styled.TouchableOpacity`
  background-color: ${(props: any) => props.theme.colors.white};
  width: ${`${widthPixel(160)}px`};
  height: ${`${widthPixel(160)}px`};
  border-radius: ${`${widthPixel(160 / 2)}px`};
  position: absolute;
  bottom: ${`${metrics.default.boundaries / 2}px`};
  right: ${`${metrics.default.boundaries / 2}px`};
  justify-content: center;
  align-items: center;
`;

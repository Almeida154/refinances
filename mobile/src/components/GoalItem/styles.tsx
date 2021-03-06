import styled from 'styled-components/native';
import { heightPixel, widthPixel } from '../../helpers/responsiveness';
import { fonts, colors, metrics } from '../../styles';

export const Goal = styled.TouchableOpacity`
  background-color: ${(props: any) => props.theme.colors.culture};
  margin-bottom: ${`${heightPixel(60)}px`};
  padding: ${`${metrics.default.boundaries / 2}px`};
  border-radius: ${`${widthPixel(20)}px`};
`;

export const GoalDesc = styled.Text`
  font-size: ${`${fonts.size.medium}px`};
  color: ${(props: any) => props.theme.colors.davysGrey};
  font-family: ${`${fonts.familyType.bold}`};
  opacity: 0.7;
`;

export const Subtitle = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${`${heightPixel(25)}px`};
`;

export const IconContainer = styled.View`
  width: ${`${widthPixel(40)}px`};
  height: ${`${widthPixel(40)}px`};
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-radius: ${`${widthPixel(40 / 2)}px`};
  border-color: ${(props: any) => props.theme.colors.davysGrey};
  opacity: 0.3;
`;

export const DaysLeft = styled.Text`
  margin-left: ${`${widthPixel(10)}px`};
  font-size: ${`${fonts.size.small - widthPixel(4)}px`};
  color: ${(props: any) => props.theme.colors.davysGrey};
  font-family: ${`${fonts.familyType.bold}`};
  opacity: 0.5;
`;

export const InvestedMoney = styled.Text`
  font-size: ${`${fonts.size.small - widthPixel(4)}px`};
  font-family: ${`${fonts.familyType.light}`};
  color: ${(props: any) => props.theme.colors.davysGrey};
  opacity: 0.5;
`;

export const Percent = styled.View`
  background-color: ${(props: any) => props.theme.colors.white};
  position: absolute;
  right: ${`${widthPixel(-20)}px`};
  top: ${`${widthPixel(-20)}px`};
  width: ${`${widthPixel(140)}px`};
  height: ${`${widthPixel(140)}px`};
  border-radius: ${`${widthPixel(40)}px`};
  opacity: 0.8;
  border-width: ${`${widthPixel(5)}px`};
  border-color: ${(props: any) => props.theme.colors.platinum};
  justify-content: center;
  align-items: center;
`;

export const PercentText = styled.Text`
  color: ${(props: any) => props.theme.colors.redCrayola};
  opacity: 0.7;
  font-size: ${`${fonts.size.small}px`};
  font-family: ${`${fonts.familyType.black}`};
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

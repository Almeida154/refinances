import styled from 'styled-components/native';
import { heightPixel, widthPixel } from '../../helpers/responsiveness';
import { fonts, colors, metrics } from '../../styles';

export const Goal = styled.TouchableOpacity`
  background-color: ${colors.cultured};
  margin-bottom: 10px;
  padding: ${`${metrics.default.boundaries / 2}px`};
  border-radius: ${widthPixel(20)};
`;

export const GoalDesc = styled.Text`
  font-size: ${`${fonts.size.medium}px`};
  color: ${colors.davysGrey};
  font-family: ${`${fonts.familyType.bold}`};
  opacity: 0.7;
`;

export const Subtitle = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${`${heightPixel(25)}px`};
`;

export const IconContainer = styled.View`
  width: ${`${widthPixel(40)}`};
  height: ${`${widthPixel(40)}`};
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-radius: ${`${widthPixel(40 / 2)}`};
  border-color: ${colors.davysGrey};
  opacity: 0.3;
`;

export const DaysLeft = styled.Text`
  margin-left: ${`${widthPixel(10)}`};
  font-size: ${`${fonts.size.small - widthPixel(4)}px`};
  color: ${colors.davysGrey};
  font-family: ${`${fonts.familyType.bold}`};
  opacity: 0.5;
`;

export const InvestedMoney = styled.Text`
  font-size: ${`${fonts.size.small - widthPixel(4)}px`};
  font-family: ${`${fonts.familyType.light}`};
  color: ${colors.davysGrey};
  opacity: 0.5;
`;

export const Percent = styled.View`
  background-color: ${colors.white};
  position: absolute;
  right: ${`${widthPixel(-20)}`};
  top: ${`${widthPixel(-20)}`};
  width: ${`${widthPixel(140)}`};
  height: ${`${widthPixel(140)}`};
  border-radius: ${`${widthPixel(40)}`};
  opacity: 0.8;
  border-width: ${`${widthPixel(5)}px`};
  border-color: ${colors.platinum};
  justify-content: center;
  align-items: center;
`;

export const PercentText = styled.Text`
  color: ${colors.platinum};
  font-size: ${`${fonts.size.small}px`};
  font-family: ${`${fonts.familyType.black}`};
`;

export const Loading = styled.View`
  align-self: center;
  height: 100%;
  justify-content: center;
`;

export const TextLoading = styled.Text`
  color: ${colors.PrussianBlue};
  font-size: ${`${fonts.size.big}px`};
  font-family: ${`${fonts.familyType.regular}`};
  margin-top: 20;
`;

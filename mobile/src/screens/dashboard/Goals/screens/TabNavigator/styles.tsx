import styled from 'styled-components/native';

import { fonts, colors } from '../../../../../styles';

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
  background-color: ${(props: any) => props.theme.colors.cultured};
  margin-bottom: 10px;
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
  right: -20;
  top: -20;
  width: 60;
  height: 60;
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

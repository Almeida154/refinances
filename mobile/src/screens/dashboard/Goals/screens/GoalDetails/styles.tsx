import styled from 'styled-components/native';
import { heightPixel, widthPixel } from '../../../../../helpers/responsiveness';

import { fonts, colors } from '../../../../../styles';

export const Valor = styled.View`
  flex-direction: row;
  flex: 1;
  width: 100%;
  justify-content: center;
`;

export const TextRS = styled.Text`
  text-align: center;
  font-family: ${`${fonts.familyType.bold}`};
  color: ${(props : any) => props.theme.colors.silver};
  opacity: 0.5;
`;

export const TextValor = styled.Text`
  font-family: ${`${fonts.familyType.black}`};
  font-size: ${`${fonts.size.super}px`};
  text-align: center;
  color: ${(props : any) => props.theme.colors.davysGrey};
`;

export const DaysLeft = styled.Text`
  font-family: ${`${fonts.familyType.semiBold}`};
  font-size: ${`${fonts.size.medium}px`};
  margin-bottom: 10px;
  opacity: 0.5;
  color: ${(props : any) => props.theme.colors.davysGrey};
`;
export const TextProgress = styled.Text`
  font-family: ${`${fonts.familyType.bold}`};
  text-align: center;
  font-size: ${`${fonts.size.medium - widthPixel(6)}px`};
  color: ${(props : any) => props.theme.colors.davysGrey};
  opacity: 0.5;
  margin-top: ${`${heightPixel(10)}px`};
`;

export const TextGoals = styled.Text`
  color: ${(props : any) => props.theme.colors.eerieBlack};
  font-family: ${`${fonts.familyType.black}`};
`;

export const GoalDate = styled.View`
  flex-direction: row;
  width: 100%;
  opacity: 0.9;
`;

export const BtnGroup = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const TextGoalsH = styled.Text`
  font-size: ${`${fonts.size.medium}px`};
  color: ${(props : any) => props.theme.colors.davysGrey};
  font-family: ${`${fonts.familyType.bold}`};
  width: 50%;
`;

export const TextGoalsLighter = styled.Text`
  font-size: ${`${fonts.size.medium}px`};
  color: ${(props : any) => props.theme.colors.davysGrey};
  text-align: right;
  font-family: ${`${fonts.familyType.bold}`};
  width: 50%;
  opacity: 0.5;
`;

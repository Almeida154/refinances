import styled from 'styled-components/native';

import { fonts } from '../../../../../styles';

export const Title = styled.Text`
  margin-bottom: 2%;
  margin-top: 15%;
  font-size: ${`${fonts.size.super}px`};
  color: ${(props: any) => props.theme.colors.davysGrey};
  font-family: ${`${fonts.familyType.black}`};
  text-align: center;
`;

export const Valor = styled.View`
  flex-direction: row;
  flex: 1;
  width: 100%;
  justify-content: center;
`;

export const TextRS = styled.Text`
  text-align: center;
  font-family: ${`${fonts.familyType.regular}`};
  color: ${(props: any) => props.theme.colors.silver};
`;

export const TextValor = styled.Text`
  font-family: ${`${fonts.familyType.black}`};
  font-size: ${`${fonts.size.super}px`};
  text-align: center;
  color: ${(props: any) => props.theme.colors.davysGrey};
`;

export const DaysLeft = styled.Text`
  font-family: ${`${fonts.familyType.semiBold}`};
  font-size: ${`${fonts.size.medium}px`};
  margin-bottom: 10px;
  opacity: 0.5;
`;

export const TextProgress = styled.Text`
  font-family: ${`${fonts.familyType.semiBold}`};
  text-align: center;
  font-size: ${`${fonts.size.medium}px`};
  color: ${(props: any) => props.theme.colors.davysGrey};
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const TextGoals = styled.Text`
  font-size: ${`${fonts.size.medium}px`};
  color: ${(props: any) => props.theme.colors.jet};
  font-family: ${`${fonts.familyType.bold}`};
`;

export const GoalDate = styled.View`
  flex-direction: row;
  width: 100%;
  padding-bottom: 1%;
`;
export const TextGoalsH = styled.Text`
  font-size: ${`${fonts.size.medium}px`};
  color: ${(props: any) => props.theme.colors.davysGrey};
  font-family: ${`${fonts.familyType.bold}`};
  width: 50%;
`;

export const TextGoalsLighter = styled.Text`
  font-size: ${`${fonts.size.medium}px`};
  color: ${(props: any) => props.theme.colors.davysGrey};
  text-align: right;
  font-family: ${`${fonts.familyType.bold}`};
  width: 50%;
  opacity: 0.85;
`;

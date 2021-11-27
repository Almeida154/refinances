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
<<<<<<< HEAD
    textAlign: center;
    fontFamily: ${`${fonts.familyType.regular}`};
    color: ${colors.silver};
`
=======
  text-align: center;
  font-family: ${`${fonts.familyType.bold}`};
  color: ${colors.davysGrey};
  opacity: 0.5;
`;
>>>>>>> 25aaaa6a65f8e24264778a6b523f90e10ce0ca9a

export const TextValor = styled.Text`
  font-family: ${`${fonts.familyType.black}`};
  font-size: ${`${fonts.size.super}px`};
  text-align: center;
  color: ${colors.davysGrey};
`;

export const DaysLeft = styled.Text`
<<<<<<< HEAD
    fontFamily: ${`${fonts.familyType.semiBold}`};
    fontSize: ${`${fonts.size.medium}px`};
    margin-bottom: 10px;
    opacity: 0.5
    color: ${colors.davysGrey};
`
=======
  font-family: ${`${fonts.familyType.semiBold}`};
  font-size: ${`${fonts.size.medium}px`};
  margin-bottom: 10px;
  opacity: 0.5;
`;
>>>>>>> 25aaaa6a65f8e24264778a6b523f90e10ce0ca9a

export const TextProgress = styled.Text`
  font-family: ${`${fonts.familyType.bold}`};
  text-align: center;
  font-size: ${`${fonts.size.small - widthPixel(6)}px`};
  color: ${colors.davysGrey};
  opacity: 0.5;
  margin-top: ${`${heightPixel(10)}px`};
`;

export const TextGoals = styled.Text`
  color: ${colors.eerieBlack};
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
  color: ${colors.davysGrey};
  font-family: ${`${fonts.familyType.bold}`};
  width: 50%;
`;

export const TextGoalsLighter = styled.Text`
  font-size: ${`${fonts.size.medium}px`};
  color: ${colors.davysGrey};
  text-align: right;
  font-family: ${`${fonts.familyType.bold}`};
  width: 50%;
  opacity: 0.5;
`;

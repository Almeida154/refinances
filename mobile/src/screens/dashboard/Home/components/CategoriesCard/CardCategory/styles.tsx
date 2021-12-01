import styled from 'styled-components/native';

import { fonts, colors } from '../../../../../../styles';

import {
  widthPixel,
  heightPixel,
} from '../../../../../../helpers/responsiveness';

export const Category = styled.View`
  position: relative;
  padding-top: 5px;
  padding-bottom: 5px;
  display: flex;
  flex-direction: row;
  margin-top: 5px;
`;

export const CategoryTouchable = styled.TouchableOpacity``;

export const SectionDescription = styled.View`
  display: flex;
  flex-direction: row;
`;

export const SectionName = styled.View`
  margin-left: 5px;
  width: 80%;
  justify-content: center;
  margin-bottom: 5px;
`;
export const SectionText = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
  height: ${`${heightPixel(80)}px`};
`;

export const Progress = styled.View``;

export const SectionIcon = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  border-width: 4px;
  align-items: center;
  justify-content: center;
`;

export const CategoryDesc = styled.Text`
  font-size: ${`${fonts.size.medium}px`};
  color: ${(props: any) => props.theme.colors.davysGrey};
  font-family: ${`${fonts.familyType.semiBold}`};
  opacity: 0.7;
  bottom: ${heightPixel(35)};
`;

export const AddLimite = styled.Text`
  font-size: ${`${fonts.size.small}px`};
  color: ${(props: any) => props.theme.colors.davysGrey};
  font-family: ${`${fonts.familyType.semiBold}`};
  opacity: 0.7;
`;

export const CategoryAddTetoGasto = styled.TouchableOpacity`
  opacity: 0.7;
  margin-left: auto;
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

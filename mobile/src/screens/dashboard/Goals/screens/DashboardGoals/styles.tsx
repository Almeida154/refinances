import styled from 'styled-components/native';

import { fonts, colors } from '../../../../../styles';

export const Title = styled.Text`
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

export const Container = styled.View`
  padding: 10%;
  padding-top: 15%;
  background-color: ${(props: any) => props.theme.colors.back};
  height: 100%;
`;

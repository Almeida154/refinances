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

export const Subtitle = styled.Text`
  font-family: ${`${fonts.familyType.semiBold}`};
  font-size: ${`${fonts.size.medium}px`};
  text-align: center;
  color: ${(props: any) => props.theme.colors.darkGray};
  padding-bottom: 7%;
  margin-left: 3%;
  margin-right: 3%;
`;

export const SubtitleT = styled.Text`
  font-family: ${`${fonts.familyType.bold}`};
  font-size: ${`${fonts.size.medium}px`};
  text-align: center;
  color: ${(props: any) => props.theme.colors.darkGray};
  padding-bottom: 7%;
  margin-left: 3%;
  margin-right: 3%;
`;

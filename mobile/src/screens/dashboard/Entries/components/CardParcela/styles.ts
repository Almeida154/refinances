import styled from 'styled-components/native';
import { widthPixel, heightPixel } from '../../../../../helpers/responsiveness';

import { colors, fonts, metrics } from '../../../../../styles';

export const ContainerCardParcela = styled.SafeAreaView`
  width: ${widthPixel(500)}px;
  height: ${heightPixel(800)}px;
  border-radius: ${heightPixel(50)}px;
  padding: 7%;
  border-width: 1px;
  margin-right: 20px;
  justify-content: center;
  align-self: center;
`;
export const TituloCardParcela = styled.Text`
  font-size: ${fonts.size.big}px;
  font-family: ${fonts.familyType.bold};
  text-align: center;
  color: ${(props: any) => props.theme.colors.jet};
`;
export const LabelCardParcela = styled.Text`
  font-family: ${fonts.familyType.semiBold};
`;

export const InputCardParcela = styled.TextInput`
  font-size: ${fonts.size.medium}px;
  font-family: ${fonts.familyType.semiBold};
  color: ${(props: any) => props.theme.colors.jet};
`;

export const InputControlStatus = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const LabelStatus = styled.Text`
  font-size: ${fonts.size.medium}px;
  font-family: ${fonts.familyType.bold};
`;

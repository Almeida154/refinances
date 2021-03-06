import styled from 'styled-components/native';

import { fonts, colors } from '../../../../../styles';

export const Container = styled.View`
  width: 100%;
`;

export const Header = styled.View``;

export const Body = styled.View``;
export const ListaCategorias = styled.FlatList``;

export const SectionImage = styled.View`
  border-width: 3px;
  padding: 1%;
  border-radius: 50px;
  border-color: ${(props: any) => props.theme.colors.darkGray};
`;

export const ContainerItem = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4%;
`;
export const NomeItem = styled.Text`
  margin-left: 10px;
  font-family: ${`${fonts.familyType.semiBold}`};
  color: ${(props: any) => props.theme.colors.darkGray};
`;

export const BotaoAdicionarCategoria = styled.View`
  padding: 7%;
  align-items: center;
  justify-content: center;
  background-color: ${(props: any) => props.theme.colors.blackSilver};
`;

export const LabelAdicionarCategoria = styled.Text`
  font-family: ${`${fonts.familyType.semiBold}`};
  color: ${(props: any) => props.theme.colors.darkGray};
  font-size: ${`${fonts.size.medium}px`};
`;

export const ButtonText = styled.TouchableOpacity``;
export const Separator = styled.View``;

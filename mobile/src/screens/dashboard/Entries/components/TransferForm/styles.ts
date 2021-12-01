import styled from 'styled-components/native';

import { colors, fonts, metrics } from '../../../../../styles';

export const ContainerForm = styled.View`
  display: flex;
  align-items: center;
  flex: 1;
  background-color: ${(props: any) => props.theme.colors.white};
  padding: 7%;
`;

export const InputControl = styled.View`
  display: flex;
  width: 100%;
  margin-top: 10px;
`;

export const TextInput = styled.TextInput`
  border-bottom-width: 2px;
  width: 100%;
  color: ${(props: any) => props.theme.colors.battleGray};
  height: 40px;
  border-color: ${(props: any) => props.theme.colors.battleGray};
  opacity: 0.7;
`;

export const TextInputValor = styled.TextInput`
  border-bottom-width: 2px;
  width: 100%;
  color: ${(props: any) => props.theme.colors.battleGray};
  height: 60px;
  border-color: ${(props: any) => props.theme.colors.battleGray};
  opacity: 0.7;

  font-size: 30px;
`;

export const Label = styled.Text`
  font-size: 17px;
  font-weight: bold;
`;

export const SectionDetalhes = styled.View`
  margin-top: 20px;
  margin-bottom: 20px;
  width: 90%;
  align-items: center;
`;

export const TextDetalhes = styled.Text``;

export const ButtonDetalhes = styled.TouchableHighlight``;

export const SectionCardsParcelas = styled.View``;

export const LabelView = styled.Text`
  font-family: ${fonts.familyType.bold};
  font-size: ${`${fonts.size.big}px`};
  color: ${(props: any) => props.theme.colors.redCrayola};
  line-height: 28px;
`;

export const InputView = styled.View`
  color: ${(props: any) => props.theme.colors.davysGrey};
  padding: 0;
  margin-top: -4px;
`;

export const Container = styled.TouchableHighlight`
  width: 100%;
  background-color: ${(props: any) => props.theme.colors.white};
  border-radius: ${`${metrics.inputText.radius}px`};
  padding: 8px 20px;
  flex-direction: row;
  border-width: 1px;
  border-color: ${(props: any) => props.theme.colors.white};
`;

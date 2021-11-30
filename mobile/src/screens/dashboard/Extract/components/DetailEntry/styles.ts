import styled from 'styled-components/native';
import { heightPixel, widthPixel } from '../../../../../helpers/responsiveness';

import { colors, fonts, metrics } from '../../../../../styles/';

export const Container = styled.View`
  padding: ${`${metrics.default.boundaries}px`};
`;

export const LabelTitle = styled.Text`
  font-size: ${`${fonts.size.bigger}px`};
  font-family: ${fonts.familyType.bold};
  color: ${(props: any) => props.theme.colors.black};
`;

export const LabelQuantity = styled.Text`
  font-size: ${`${fonts.size.medium}px`};
  font-family: ${fonts.familyType.black};
  color: ${(props: any) => props.theme.colors.redCrayola};
  margin-top: ${`${heightPixel(-10)}px`};
`;

export const Detail = styled.Text`
  font-size: ${`${fonts.size.small}px`};
  font-family: ${fonts.familyType.bold};
  color: ${(props: any) => props.theme.colors.blackSilver};
`;

export const GroupLabel = styled.View`
  width: 30%;
  margin-top: 15px;
`;

export const Label = styled.Text`
  font-size: ${`${fonts.size.medium}px`};
  font-family: ${fonts.familyType.bold};
  color: ${(props: any) => props.theme.colors.eerieBlack};
  opacity: 0.7;
`;

export const Value = styled.Text`
  font-size: ${`${fonts.size.small}px`};
  font-family: ${fonts.familyType.semiBold};
  color: ${(props: any) => props.theme.colors.eerieBlack};
  opacity: 0.3;
`;

export const SectionDescription = styled.View``;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const SectionTitle = styled.View``;

export const SepareRow = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const SepareColumn = styled.View`
  flex-direction: column;
`;

export const CircleIcon = styled.TouchableOpacity`
  background-color: ${colors.diffWhite};
  width: ${`${widthPixel(100)}px`};
  height: ${`${widthPixel(100)}px`};
  border-radius: ${`${widthPixel(100 / 2)}px`};
  align-items: center;
  justify-content: center;
`;

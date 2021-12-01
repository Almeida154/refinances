import styled from 'styled-components/native';
import { heightPixel } from '../../../../../helpers/responsiveness';
import { fonts, colors } from '../../../../../styles';

export const Container = styled.View`
  width: 100%;
  margin-bottom: ${`${heightPixel(60)}px`};
`;
export const HeaderDate = styled.View``;

export const BodyEntries = styled.View``;

export const LabelDate = styled.Text`
  font-family: ${`${fonts.familyType.bold}`};
  color: ${(props: any) => props.theme.colors.silver};
  font-size: ${`${fonts.size.medium}px`};
  margin-bottom: ${`${heightPixel(40)}px`};
  opacity: 0.4;
`;

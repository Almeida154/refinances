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
  font-size: ${`${fonts.size.medium}px`};
  font-family: ${`${fonts.familyType.semiBold}`};
  color: ${colors.silver};
  opacity: 0.5;
  margin-bottom: ${`${heightPixel(40)}px`};
`;

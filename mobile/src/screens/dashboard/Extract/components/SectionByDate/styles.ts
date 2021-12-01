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
    fontSize: ${`${fonts.size.medium}px`};
    fontFamily: ${`${fonts.familyType.semiBold}`};
    color: ${(props : any) => props.theme.colors.silver};
    font-size: 22px;
    margin-bottom: ${`${heightPixel(40)}px`};
    opacity: 0.5;

`;

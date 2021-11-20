import styled from 'styled-components/native';
import { colors, fonts, metrics } from '../../../../../../styles';
import { heightPixel, widthPixel } from '../../../../../../helpers/responsiveness';

export const Container = styled.View`
  padding-top: ${`${heightPixel(350)}px`};
  flex: 1;
  elevation: 0;
`;

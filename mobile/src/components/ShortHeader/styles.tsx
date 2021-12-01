import styled from 'styled-components/native';
import { heightPixel, widthPixel } from '../../helpers/responsiveness';
import { colors, fonts, metrics } from '../../styles';

export const Boundaries = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: ${`${metrics.default.boundaries / 2}px`};
  padding-bottom: ${`${metrics.default.boundaries / 2}px`};
  padding-left: ${`${metrics.default.boundaries}px`};
  padding-right: ${`${metrics.default.boundaries}px`};
`;

export const Title = styled.Text`
  opacity: 0.7;
  font-family: ${fonts.familyType.bold};
  color: ${(props : any) => props.theme.colors.davysGrey};
  line-height: ${`${fonts.size.big + widthPixel(18)}px`};
  font-size: ${`${fonts.size.big}px`};
  margin-left: ${`${metrics.default.boundaries / 2}px`};
`;

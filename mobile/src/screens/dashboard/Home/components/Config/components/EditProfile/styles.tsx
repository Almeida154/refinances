import styled from 'styled-components/native';

import { fonts, colors, metrics } from '../../../../../../../styles';
import { heightPixel } from '../../../../../../../helpers/responsiveness';

export const Title = styled.Text`
  margin-top: ${`${heightPixel(100)}px`};
  font-size: ${`${fonts.size.super}px`};
  color: ${colors.davysGrey};
  font-family: ${`${fonts.familyType.bold}`};
  text-align: center;
`;

export const Container = styled.View`
  padding-top: ${`${metrics.default.statusBarHeight}px`};
  height: 100%;
  background-color: ${(props : any) => props.theme.colors.back};
`;

export const InputController = styled.View`
  padding: 10% 10% 0 10%;
`;

export const RequisitContainer = styled.View`
  left: ${`${metrics.default.boundaries}px`};
  top: ${`${metrics.default.boundaries}px`};
  margin-bottom: ${`${heightPixel(50)}px`};
`;

export const Requisit = styled.Text`
  font-size: ${`${fonts.size.small}px`};
  font-family: ${fonts.familyType.regular};
  color: ${(props: any) => props.theme.colors.davysGrey};
  opacity: 0.7;
`;

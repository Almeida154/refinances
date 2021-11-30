import styled from 'styled-components/native';
import { colors, fonts, metrics } from '../../../../styles';

export const Container = styled.View`
  padding-top: ${`${metrics.default.statusBarHeight}px`};
  background-color: ${(props : any) => props.theme.colors.diffWhite};
  flex: 1;
`;

export const Content = styled.ScrollView`
  flex: 1;
  padding-top: ${`${metrics.default.boundaries}px`};
  margin-bottom: 80px;
`;

export const ButtonContainer = styled.View`
  padding-top: ${`${metrics.default.boundaries / 2}px`};
  padding-left: ${`${metrics.default.boundaries}px`};
  padding-right: ${`${metrics.default.boundaries}px`};
  padding-bottom: ${`${metrics.default.boundaries * 2}px`};
`;

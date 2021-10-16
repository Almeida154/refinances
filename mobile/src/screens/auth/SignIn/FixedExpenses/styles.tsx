import styled from 'styled-components/native';
import { colors, fonts, metrics } from '../../../../styles';

export const Container = styled.View`
  padding-top: ${`${metrics.default.statusBarHeight}px`};
  background-color: ${colors.diffWhite};
  flex: 1;
`;

export const Content = styled.View`
  padding: ${`${metrics.default.boundaries}px`};
  flex: 1;
  align-items: center;
`;

export const TagContainer = styled.View`
  background-color: red;
`;

export const Tag = styled.View`
  background-color: green;
`;

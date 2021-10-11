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

export const PhotoContainer = styled.View`
  margin-bottom: ${`${metrics.default.boundaries}px`};
  border-radius: 160px;
  width: 160px;
  height: 160px;
  border: 10px solid ${colors.silver};
  align-items: center;
  justify-content: center;
`;

export const Pic = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 140px;
`;

export const CameraDetail = styled.TouchableHighlight`
  background-color: ${colors.paradisePink};
  width: 50px;
  height: 50px;
  border-radius: 25px;
  position: absolute;
  bottom: -5px;
  right: -5px;
  align-items: center;
  justify-content: center;
`;

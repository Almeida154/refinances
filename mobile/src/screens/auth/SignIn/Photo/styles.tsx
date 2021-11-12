import styled from 'styled-components/native';
import { heightPixel, widthPixel } from '../../../../helpers/responsiveness';
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
  border: ${`${heightPixel(16)}px`} solid ${colors.silver};
  width: ${`${widthPixel(300)}px`};
  height: ${`${heightPixel(300)}px`};
  border-radius: ${`${widthPixel(80)}px`};
  align-items: center;
  justify-content: center;
`;

export const Pic = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: ${`${widthPixel(60)}px`};
`;

export const CameraDetail = styled.TouchableHighlight`
  background-color: ${colors.paradisePink};
  position: absolute;
  border-radius: ${`${widthPixel(120 / 3)}px`};
  width: ${`${widthPixel(120)}px`};
  height: ${`${heightPixel(120)}px`};
  bottom: ${`${-widthPixel(120 / 5)}px`};
  right: ${`${-widthPixel(120 / 4)}px`};
  align-items: center;
  justify-content: center;
`;

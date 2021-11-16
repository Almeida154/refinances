import styled from 'styled-components/native';
import hexToRGB from '../../../../helpers/hexToRgba';
import { heightPixel, widthPixel } from '../../../../helpers/responsiveness';
import { colors, fonts, metrics } from '../../../../styles';

export const Container = styled.View`
  padding-top: ${`${metrics.default.statusBarHeight}px`};
  background-color: ${colors.diffWhite};
  flex: 1;
`;

export const Content = styled.TouchableOpacity`
  padding: ${`${metrics.default.boundaries}px`};
  flex: 1;
`;

export const Writting = styled.View`
  margin-top: 10%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const PrefixReaisSymbol = styled.Text`
  font-size: ${`${fonts.size.super}px`};
  font-family: ${fonts.familyType.bold};
  align-self: flex-start;
  color: ${colors.eerieBlack};
  opacity: 0.1;
  margin-right: 2%;
`;

export const SmoothPickerContainer = styled.View`
  position: absolute;
  width: 100%;
  height: ${`${heightPixel(380)}px`};
  background-color: ${hexToRGB(colors.redCrayola, 0.8)};
  justify-content: center;
  align-items: center;
  bottom: 0;
`;

export const SmoothPickerTopDetail = styled.View`
  position: absolute;
  top: 0px;
  align-items: center;
  justify-content: center;
  width: ${`${widthPixel(60)}`};
  height: ${`${widthPixel(60)}`};
`;

export const SmoothPickerBottomDetail = styled.View`
  position: absolute;
  width: 3px;
  height: ${`${heightPixel(50)}px`};
  bottom: 0;
  background-color: ${colors.bigDipOruby};
`;

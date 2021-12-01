import styled from 'styled-components/native';
import { widthPixel } from '../../../../../helpers/responsiveness';
import { colors, fonts, metrics } from '../../../../../styles';

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  background-color: ${(props : any)  => props.theme.colors.white};
  border-radius: ${widthPixel(40)};
  margin-bottom: ${`${metrics.default.boundaries / 1.4}px`};
`;

export const Title = styled.Text`
  font-size: ${`${fonts.size.big}px`};
  font-family: ${`${fonts.familyType.black}`};
  color: ${(props : any)  => props.theme.colors.davysGrey};
  margin-bottom: ${`${metrics.default.boundaries / 4}px`};
`;

export const Item = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Icon = styled.View`
  width: ${`${widthPixel(120)}px`};
  height: ${`${widthPixel(120)}px`};
  border-radius: ${`${widthPixel(120 / 2)}px`};
  background-color: tan;
`;

export const DescriptionContainer = styled.View`
  padding-right: ${`${metrics.default.boundaries / 3}px`};
  flex: 1;
`;

export const Description = styled.Text`
  font-family: ${fonts.familyType.bold};
  font-size: ${`${fonts.size.small}px`};
  line-height: ${`${fonts.size.small + widthPixel(6)}px`};
  color: ${(props : any)  => props.theme.colors.davysGrey};
  opacity: 0.4;
`;

export const RightButton = styled.TouchableOpacity`
  position: absolute;
  border-bottom-right-radius: ${widthPixel(40)};
  border-top-right-radius: ${widthPixel(40)};
  background-color: ${(props : any)  => props.theme.colors.redCrayola};
  right: 0;
  height: 100%;
  width: ${`${widthPixel(140)}px`};
  justify-content: center;
  align-items: center;
`;

export const Plus = styled.Text`
  font-size: ${`${fonts.size.super}px`};
  font-family: ${`${fonts.familyType.black}`};
  color: ${(props : any)  => props.theme.colors.bigDipOruby};
`;

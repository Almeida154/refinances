import styled from 'styled-components/native';
import hexToRGB from '../../helpers/hexToRgba';
import { heightPixel, widthPixel } from '../../helpers/responsiveness';
import { colors, fonts, metrics } from '../../styles';

export const Container = styled.View`
  width: 100%;
  height: ${`${heightPixel(280)}px`};
  background-color: ${(props : any) => props.theme.colors.white};
  border-radius: ${`${widthPixel(16)}px`};
  margin: ${`${heightPixel(22)}px`} 0;
`;

export const Content = styled.TouchableOpacity`
  width: 100%;
  height: ${`${heightPixel(280 - 60)}px`};
  background-color: ${(props : any) => props.theme.colors.white};
  border-top-right-radius: ${`${widthPixel(20)}px`};
  border-top-left-radius: ${`${widthPixel(20)}px`};
  padding: ${`${metrics.default.boundaries / 2}px`};
  align-items: center;
  flex-direction: row;
`;

export const Data = styled.View`
  position: absolute;
  bottom: 0;
  justify-content: center;
  width: 100%;
  height: ${`${heightPixel(60)}px`};
  background-color: ${(props : any) => props.theme.colors.diffWhite};
  border-bottom-right-radius: ${`${widthPixel(20)}px`};
  border-bottom-left-radius: ${`${widthPixel(20)}px`};
`;

export const IconContainer = styled.View`
  width: ${`${widthPixel(140)}px`};
  height: ${`${widthPixel(140)}px`};
  border-radius: ${`${widthPixel(140 / 2)}px`};
  justify-content: center;
  align-items: center;
  border-width: ${`${widthPixel(10)}px`};
`;

export const Info = styled.View`
  flex: 1;
  height: 100%;
  padding: 0 ${`${metrics.default.boundaries / 3}px`};
  justify-content: center;
`;

export const Description = styled.Text`
  font-size: ${`${fonts.size.medium}px`};
  color: ${(props : any) => props.theme.colors.davysGrey};
  font-family: ${fonts.familyType.bold};
`;

export const Category = styled.Text`
  font-size: ${`${fonts.size.small}px`};
  color: ${(props: any) => hexToRGB(props.theme.colors.davysGrey, 0.4)};
  font-family: ${fonts.familyType.light};
`;

export const IconEdit = styled.View`
  width: ${`${widthPixel(100)}px`};
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const PercentDetail = styled.View`
  position: absolute;
  background-color: ${(props : any) => props.theme.colors.white};
  top: ${`${widthPixel(-18)}px`};
  right: ${`${widthPixel(-18)}px`};
  width: ${`${widthPixel(65)}px`};
  height: ${`${widthPixel(65)}px`};
  border-radius: ${`${widthPixel(65 / 2)}px`};
  justify-content: center;
  align-items: center;
  border-width: 2px;
`;

export const Percent = styled.Text`
  font-size: ${`${fonts.size.smaller}px`};
  color: ${(props: any) => hexToRGB(props.theme.colors.davysGrey, 0.7)};
  font-family: ${fonts.familyType.black};
`;

import styled from 'styled-components/native';
import { heightPixel, widthPixel } from '../../../../helpers/responsiveness';
import { colors, fonts, metrics } from '../../../../styles';

export const Container = styled.View`
  padding-top: ${`${metrics.default.statusBarHeight}px`};
  background-color: ${(props: any) => props.theme.colors.diffWhite};
  flex: 1;
`;

export const Content = styled.ScrollView`
  padding: ${`${metrics.default.boundaries}px`} 0;
  margin-bottom: 80px;
  flex: 1;
`;

export const Title = styled.Text`
  color: ${(props: any) => props.theme.colors.black};
  text-align: center;
  font-family: ${fonts.familyType.black};
  font-size: ${`${fonts.size.medium}px`};
  line-height: ${`${fonts.size.bigger + widthPixel(8)}px`};
  margin-top: ${`${heightPixel(40)}px`};
  opacity: 0.5;
  padding: 0 ${`${metrics.default.boundaries}px`};
`;

export const SubTitle = styled.Text`
  color: ${(props: any) => props.theme.colors.davysGrey};
  text-align: center;
  font-family: ${fonts.familyType.bold};
  font-size: ${`${fonts.size.small}px`};
  line-height: ${`${fonts.size.small + heightPixel(8)}px`};
  opacity: 0.3;
  margin: 0 ${`${metrics.default.boundaries}px`};
  margin-top: ${`${heightPixel(60)}px`};
`;

export const PieContainer = styled.View`
  height: ${`${heightPixel(660)}px`};
  margin-top: ${`${heightPixel(60)}px`};
  margin-bottom: ${`${heightPixel(-120)}px`};
  padding: 0 ${`${metrics.default.boundaries}px`};
`;

export const Pic = styled.Image`
  background-color: ${colors.white};
  width: ${`${widthPixel(210)}px`};
  height: ${`${widthPixel(210)}px`};
  border-radius: ${`${widthPixel(210 / 2)}px`};
`;

export const LegendContainer = styled.View`
  border-radius: ${`${widthPixel(20)}px`};
  background-color: ${(props: any) => props.theme.colors.white};
  margin: 0 ${`${metrics.default.boundaries}px`};

  padding-top: ${`${metrics.default.boundaries / 2}px`};
  padding-bottom: ${`${metrics.default.boundaries / 2}px`};
  padding-left: ${`${metrics.default.boundaries / 1.5}px`};
  padding-right: ${`${metrics.default.boundaries / 1.5}px`};
`;

export const LabelContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const LabelIcon = styled.View`
  width: ${`${widthPixel(30)}px`};
  height: ${`${heightPixel(30)}px`};
  border-radius: 4px;
`;

export const LabelSubtitle = styled.Text`
  margin-left: ${`${widthPixel(20)}px`};
  font-family: ${fonts.familyType.black};
  font-size: ${`${fonts.size.small}px`};
  color: ${(props: any) => props.theme.colors.davysGrey};
  opacity: 0.7;
`;

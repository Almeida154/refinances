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
`;

export const PieContainer = styled.View`
  margin-bottom: ${`${heightPixel(60)}px`};
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  color: ${colors.paradisePink};
  text-align: center;
  font-family: ${fonts.familyType.black};
  font-size: ${`${fonts.size.big}px`};
  line-height: ${`${fonts.size.big + widthPixel(8)}px`};
  margin-top: ${`${heightPixel(60)}px`};
`;

export const SubTitle = styled.Text`
  color: ${colors.davysGrey};
  text-align: center;
  font-family: ${fonts.familyType.black};
  font-size: ${`${fonts.size.small}px`};
  opacity: 0.7;
  margin-bottom: ${`${heightPixel(60)}px`};
`;

export const Pic = styled.Image`
  position: absolute;
  width: ${`${widthPixel(260)}px`};
  height: ${`${heightPixel(260)}px`};
  border-radius: ${`${widthPixel(260 / 2)}px`};
`;

export const LabelContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
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
  color: ${colors.davysGrey};
  opacity: 0.7;
`;

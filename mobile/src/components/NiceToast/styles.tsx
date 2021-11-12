import styled from 'styled-components/native';
import { metrics, colors, fonts } from '../../styles';
import { heightPixel } from '../../helpers/responsiveness';

export const StatusBarDetail = styled.View`
  position: relative;
  height: ${`${metrics.default.statusBarHeight}px`};
`;

export const Container = styled.TouchableOpacity`
  width: ${metrics.screen.width}px;
  flex-direction: row;
  align-items: center;

  padding-top: ${`${metrics.screen.height * 0.02}px`};
  padding-bottom: ${`${metrics.screen.height * 0.02}px`};
  padding-left: ${`${metrics.default.boundaries}px`};
  padding-right: ${`${metrics.default.boundaries}px`};
`;

export const Title = styled.Text`
  font-family: ${fonts.familyType.bold};
  font-size: ${`${fonts.size.medium}px`};
  margin: 0 ${`${metrics.default.boundaries / 2}px`};
  margin-bottom: ${`${heightPixel(-10)}px`};
  line-height: ${`${fonts.size.medium + heightPixel(8)}px`};
  color: ${colors.white};
`;

export const Message = styled(Title)`
  font-family: ${fonts.familyType.semiBold};
  font-size: ${`${fonts.size.small}px`};
  opacity: 0.7;
  margin: 0 ${metrics.default.boundaries / 2}px;
  color: ${colors.white};
`;

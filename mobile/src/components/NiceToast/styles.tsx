import styled from 'styled-components/native';
import { metrics, colors, fonts } from '../../styles';

export const Container = styled.TouchableOpacity`
  width: ${metrics.screen.width}px;
  padding: ${metrics.screen.height * 0.02}px ${metrics.default.boundaries}px;
  padding-top: ${metrics.screen.height * 0.02 +
  metrics.default.statusBarHeight}px;
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: ${fonts.familyType.bold};
  font-size: ${fonts.size.medium}px;
  margin: 0 ${metrics.default.boundaries / 2}px;
  color: ${colors.white};
`;

export const Message = styled(Title)`
  font-family: ${fonts.familyType.semiBold};
  font-size: ${fonts.size.small}px;
  opacity: 0.7;
  margin: 0 ${metrics.default.boundaries / 2}px;
  color: ${colors.white};
`;

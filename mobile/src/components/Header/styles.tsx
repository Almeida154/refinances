import styled from 'styled-components/native';
import { colors, fonts, metrics } from '../../styles';

export const Container = styled.View`
  position: absolute;
  font-family: ${fonts.familyType.regular};
`;

export const Boundaries = styled.View`

  padding: ${`${metrics.default.boundaries}px`};
`;

export const Title = styled.Text`
  font-family: ${fonts.familyType.black};
  color: ${(props : any) => props.theme.colors.davysGrey};
  margin-top: -15%;
  line-height: 38px;
  font-size: ${`${fonts.size.super}px`};
`;

export const Subtitle = styled.Text`
  font-family: ${fonts.familyType.bold};
  color: ${(props : any) => props.theme.colors.davysGrey};
  line-height: 18px;
  font-size: ${`${fonts.size.small}px`};
  opacity: 0.3;
`;

export const TopContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Step = styled.Text`
  font-family: ${fonts.familyType.black};
  color: ${(props : any) => props.theme.colors.paradisePink};
  font-size: ${`${fonts.size.medium}px`};
  opacity: 0.7;
`;

export const LastWordAccent = styled.Text`
  color: ${(props : any) => props.theme.colors.paradisePink};
`;

export const TouchableOpacity = styled.TouchableOpacity`
`;
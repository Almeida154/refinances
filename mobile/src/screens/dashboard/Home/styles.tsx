import styled from 'styled-components/native';
import { heightPixel, widthPixel } from '../../../helpers/responsiveness';
import { fonts, colors, metrics } from '../../../styles';

export const Container = styled.ScrollView`
  padding-top: ${`${metrics.default.statusBarHeight}px`};
  flex: 1;
`;

export const Header = styled.View`
  flex-direction: row;
  height: ${`${heightPixel(300)}px`};
  padding: ${`${metrics.default.boundaries / 1.4}px`};
  justify-content: space-between;
  align-items: center;
`;

export const Greeting = styled.View``;

export const Name = styled.Text`
  font-size: ${`${fonts.size.bigger}px`};
  font-family: ${fonts.familyType.bold};
  color: ${colors.davysGrey};
  opacity: 0.9;
`;

export const Salutation = styled.Text`
  font-size: ${`${fonts.size.medium}px`};
  font-family: ${fonts.familyType.bold};
  margin-top: ${`${heightPixel(-18)}px`};
  color: ${colors.davysGrey};
  opacity: 0.3;
`;

export const ActionsAndAssets = styled.View`
  flex-direction: row;
`;

export const NotificationContainer = styled.TouchableOpacity`
  background-color: ${colors.cultured};
  width: ${`${widthPixel(100)}`};
  height: ${`${widthPixel(100)}`};
  border-radius: ${`${widthPixel(35)}`};
  margin-right: ${`${metrics.default.boundaries / 5}px`};
  justify-content: center;
  align-items: center;
`;

export const Photo = styled.Image`
  background-color: ${colors.white};
  width: ${`${widthPixel(100)}`};
  height: ${`${widthPixel(100)}`};
  border-radius: ${`${widthPixel(35)}`};
`;

export const Content = styled.View`
  padding: ${`${metrics.default.boundaries / 1.6}px`};
  padding-top: 0;
  padding-bottom: ${`${heightPixel(160)}px`};
`;

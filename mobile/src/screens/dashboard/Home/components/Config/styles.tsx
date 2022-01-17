import styled from 'styled-components/native';
import { colors, fonts, metrics } from '../../../../../styles';
import { widthPixel, heightPixel } from '../../../../../helpers/responsiveness';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
  },
})`
  background-color: ${(props: any) => props.theme.colors.cultured};
`;

export const Header = styled.View`
  height: ${`${heightPixel(400)}px`};
  background-color: ${(props: any) => props.theme.colors.back};
  margin-bottom: ${`${widthPixel(260 / 2)}px`};
`;

export const ImageBg = styled.Image.attrs({
  resizeMode: 'cover',
})`
  position: absolute;
  height: ${`${heightPixel(400)}px`};
  width: 100%;
  opacity: 0.4;
`;

export const AvatarContainer = styled.View`
  position: absolute;
  bottom: ${`${-widthPixel(260 / 2)}px`};
  width: ${`${widthPixel(260)}px`};
  height: ${`${widthPixel(260)}px`};
  align-self: center;
`;

export const Avatar = styled.Image`
  position: absolute;
  width: ${`${widthPixel(260)}px`};
  height: ${`${widthPixel(260)}px`};
  border-radius: ${`${widthPixel(260 / 2)}px`};
  border-width: 2px;
  border-color: ${(props: any) => props.theme.colors.back};
`;

export const AvatarIcon = styled.View`
  position: absolute;
  right: 0;
  bottom: 0;
  width: ${`${widthPixel(90)}px`};
  height: ${`${widthPixel(90)}px`};
  border-radius: ${`${widthPixel(90 / 2)}px`};
  border-width: 2px;
  border-color: ${(props: any) => props.theme.colors.back};
  background-color: ${colors.redCrayola};
  justify-content: center;
  align-items: center;
`;

export const BlockTitle = styled.Text`
  font-family: ${fonts.familyType.bold};
  font-size: ${`${fonts.size.big}px`};
  padding-left: ${`${metrics.default.boundaries}px`};
  padding-right: ${`${metrics.default.boundaries}px`};
  padding-top: ${`${heightPixel(30)}px`};
  padding-bottom: ${`${heightPixel(30)}px`};
  color: ${(props: any) => props.theme.colors.black};
  opacity: 0.15;
`;

export const CreditsTitle = styled.Text`
  font-family: ${fonts.familyType.bold};
  font-size: ${`${fonts.size.bigger}px`};
  text-align: center;
  margin-top: ${`${heightPixel(150)}px`};
  color: ${`${colors.redCrayola}`};
`;

export const CreditsDescription = styled.Text`
  font-family: ${fonts.familyType.semiBold};
  font-size: ${`${fonts.size.medium}px`};
  text-align: center;
  margin-top: ${`${heightPixel(50)}px`};
  padding-left: ${`${metrics.default.boundaries}px`};
  padding-right: ${`${metrics.default.boundaries}px`};
  line-height: ${`${fonts.size.medium + widthPixel(8)}px`};
  color: ${(props: any) => props.theme.colors.black};
  opacity: 0.3;
`;

export const CreditsSocialContainer = styled.View`
  margin-top: ${`${heightPixel(50)}px`};
  justify-content: center;
  flex-direction: row;
`;

interface CreditsSocialItemProps {
  isTheLastItem?: boolean;
}

export const CreditsSocialItem = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})<CreditsSocialItemProps>`
  background-color: ${(props: any) => props.theme.colors.platinum};
  width: ${`${widthPixel(90)}px`};
  height: ${`${widthPixel(90)}px`};
  margin-right: ${props => (props.isTheLastItem ? 0 : '10px')};
  border-radius: ${`${widthPixel(30)}px`};
  justify-content: center;
  align-items: center;
`;

export const CreditsCopy = styled.Text`
  font-family: ${fonts.familyType.bold};
  font-size: ${`${fonts.size.small}px`};
  text-align: center;
  margin-top: ${`${metrics.default.boundaries}px`};
  margin-bottom: ${`${metrics.default.boundaries}px`};
  color: ${(props: any) => props.theme.colors.black};
  opacity: 0.2;
`;

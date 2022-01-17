import styled from 'styled-components/native';
import { colors, fonts, metrics } from '../../../../../../../styles';
import {
  widthPixel,
  heightPixel,
} from '../../../../../../../helpers/responsiveness';

interface ContainerProps {
  isTheLastOne?: boolean;
}

export const Container = styled.View<ContainerProps>`
  height: ${`${heightPixel(180)}px`};
  background-color: ${(props: any) => props.theme.colors.white};
  padding-left: ${`${metrics.default.boundaries}px`};
  padding-right: ${`${metrics.default.boundaries}px`};
  flex-direction: row;
  border-bottom-width: ${(props: any) => (props.isTheLastOne ? 0 : '2px')};
  border-bottom-color: ${(props: any) => props.theme.colors.cultured};
`;

export const ItemIcon = styled.View`
  width: ${`${widthPixel(100)}px`};
  height: 100%;
  justify-content: center;
`;

export const ItemContent = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  flex: 1;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

export const ContentData = styled.View`
  padding-left: ${`${widthPixel(20)}px`};
`;

export const DataTitle = styled.Text`
  font-family: ${fonts.familyType.bold};
  font-size: ${`${fonts.size.medium}px`};
  color: ${(props: any) => props.theme.colors.black};
  opacity: 0.6;
`;

export const DataDescription = styled.Text`
  font-family: ${fonts.familyType.semiBold};
  font-size: ${`${fonts.size.small}px`};
  margin-top: ${`${heightPixel(-6)}px`};
  color: ${(props: any) => props.theme.colors.black};
  opacity: 0.3;
`;

export const ContentAction = styled.View`
  width: ${`${widthPixel(140)}px`};
  height: 100%;
  justify-content: center;
  align-items: flex-end;
  opacity: 0.3;
`;

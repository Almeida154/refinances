import React from 'react';

import { useTheme } from 'styled-components/native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

import Icon from '../../../../../../../helpers/gerarIconePelaString';

import { widthPixel } from '../../../../../../../helpers/responsiveness';

import {
  Container,
  ItemIcon,
  ItemContent,
  ContentData,
  ContentAction,
  DataTitle,
  DataDescription,
} from './styles';
import hexToRGB from '../../../../../../../helpers/hexToRgba';
import { colors } from '../../../../../../../styles';

interface IProps {
  icon: string;
  title: string;
  titleColor?: string;
  description: string;
  isTheLastOne?: boolean;
  onPress: () => void;
}

const BlockItem: React.FC<IProps> = ({
  icon,
  title,
  titleColor,
  description,
  isTheLastOne,
  onPress,
}) => {
  const theme: any = useTheme();

  return (
    <Container isTheLastOne={isTheLastOne}>
      <ItemIcon>
        <Icon
          stringIcon={icon}
          color={hexToRGB(theme.colors.black, 0.4)}
          size={widthPixel(60)}
        />
      </ItemIcon>
      <ItemContent onPress={onPress}>
        <ContentData>
          <DataTitle
            style={titleColor ? { color: titleColor, opacity: 1 } : {}}>
            {title}
          </DataTitle>
          <DataDescription numberOfLines={1}>{description}</DataDescription>
        </ContentData>
        <ContentAction>
          <Entypo
            name="chevron-right"
            color={hexToRGB(theme.colors.black, 0.4)}
            size={widthPixel(60)}
          />
        </ContentAction>
      </ItemContent>
    </Container>
  );
};

export default BlockItem;

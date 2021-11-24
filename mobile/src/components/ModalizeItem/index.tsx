import React from 'react';
import { TouchableOpacityProps, View } from 'react-native';

import { Container, Description, Icon, Image } from './styles';

interface IProps extends TouchableOpacityProps {
  description?: string;
  accent?: string;
  icon?: any;
}

const ModalizeItem: React.FC<IProps> = ({
  description,
  accent,
  icon,
  ...rest
}) => {
  return (
    <Container activeOpacity={1} {...rest}>
      <Icon>
        <Image style={{ borderWidth: 3, borderColor: accent }} source={icon} />
      </Icon>
      <Description>{description}</Description>
    </Container>
  );
};

export default ModalizeItem;

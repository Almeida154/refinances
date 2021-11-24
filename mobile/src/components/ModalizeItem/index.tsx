import React from 'react';
import { TouchableOpacityProps, View } from 'react-native';

import { Container, Description, Icon, Image } from './styles';

interface IProps extends TouchableOpacityProps {
  description?: string;
  accent?: string;
  icon?: any;
}

const ModalizeItem: React.FC<IProps> = ({ description, accent, icon }) => {
  return (
    <Container>
      <Icon>
        <Image style={{ borderWidth: 4, borderColor: accent }} source={icon} />
      </Icon>
      <Description>{description}</Description>
    </Container>
  );
};

export default ModalizeItem;

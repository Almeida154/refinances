import React from 'react';
import { colors } from '../../styles';
import { Container, Text } from './styles';

interface IProps {
  onPress: () => void;
  title?: string;
  backgroundColor?: string;
  color?: string;
  lastOne?: boolean;
}

const Button: React.FC<IProps> = ({
  onPress,
  title,
  backgroundColor,
  color,
  lastOne,
}) => {
  return (
    <Container
      onPress={onPress}
      style={[
        backgroundColor != undefined
          ? { backgroundColor: backgroundColor }
          : {},
        lastOne ? {} : { marginBottom: 10, marginTop: 10 },
      ]}>
      <Text style={color ? { color } : { color: colors.cultured }}>
        {title}
      </Text>
    </Container>
  );
};

export default Button;

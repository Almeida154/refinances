import React from 'react';
import { colors } from '../../styles';
import { Container, Text } from './styles';
import { TouchableOpacityProps } from 'react-native';

interface IProps extends TouchableOpacityProps {
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
  ...rest
}) => {
  return (
    <Container
      onPress={onPress}
      style={[
        backgroundColor != undefined
          ? { backgroundColor: backgroundColor }
          : {},
        lastOne ? {} : { marginBottom: 10, marginTop: 10 },
      ]}
      {...rest}>
      <Text style={color ? { color } : { color: colors.cultured }}>
        {title}
      </Text>
    </Container>
  );
};

export default Button;

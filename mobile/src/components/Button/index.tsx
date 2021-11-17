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
    <Container {...rest} onPress={onPress} lastOne={lastOne != undefined}>
      <Text style={color ? { color } : { color: colors.darkGray }}>
        {title}
      </Text>
    </Container>
  );
};

export default Button;

import React from 'react';
import { colors } from '../../styles';
import { Container, Text } from './styles';

interface IProps {
  onPress: () => void;
  title?: string;
  color?: string;
}

const Button: React.FC<IProps> = ({ onPress, title, color }) => {
  return (
    <Container
      onPress={onPress}
      underlayColor={color != undefined ? color : colors.redCrayola}
      style={color != undefined ? { backgroundColor: color } : {}}>
      <Text>{title}</Text>
    </Container>
  );
};

export default Button;

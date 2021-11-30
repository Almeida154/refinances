import React from 'react';
import { colors } from '../../styles';
import { Container, Text } from './styles';
import { TouchableOpacityProps } from 'react-native';
import { useTheme } from 'styled-components/native';
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
  const theme: any = useTheme()
  return (
    <Container {...rest} onPress={onPress} lastOne={lastOne != undefined}>
      <Text style={color ? { color } : { color: theme.colors.darkGray }}>
        {title}
      </Text>
    </Container>
  );
};

export default Button;

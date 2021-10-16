import React from 'react';
import { colors } from '../../styles';
import { Container, Button, Icon} from './styles';

import Icon2 from 'react-native-vector-icons/Entypo';

interface IProps {
  onPress: () => void;
  backgroundColor?: string;
}

const ButtonAdd: React.FC<IProps> = ({
  onPress,
  backgroundColor,
}) => {
  return (
    <Container>
      <Button
        onPress={onPress}
        style={[
          backgroundColor != undefined
            ? { backgroundColor: backgroundColor }
            : {},
        ]}>
        <Icon>
          <Icon2 name="plus" color={'#ee4266'} size={35} />
        </Icon>
      </Button>
    </Container>
  );
};

export default ButtonAdd;

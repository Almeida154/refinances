import React from 'react';

// Styles
import { Container, Description } from './styles';
import { colors } from '../../../../styles';

// Icon
import IonIcons from 'react-native-vector-icons/Ionicons';

interface IProps {
  onPress?: () => void;
  isCentered?: boolean;
  description?: string;
  color?: string;
}

const BottomNavigation: React.FC<IProps> = ({
  onPress,
  isCentered,
  description,
  color,
}) => {
  return (
    <Container underlayColor={colors.white} onPress={onPress}>
      <>
        <Description
          style={[
            isCentered ? { textAlign: 'center' } : {},
            color != undefined ? { color: color } : {},
          ]}>
          {description}
        </Description>
        {!isCentered && (
          <IonIcons
            name="md-arrow-forward-sharp"
            size={30}
            color={colors.redCrayola}
          />
        )}
      </>
    </Container>
  );
};

export default BottomNavigation;

import React from 'react';

// Styles
import { Container, Content, Description } from './styles';
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
      <Content
        style={{
          shadowColor: 'rgba(0, 0, 0, 1)',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.08,
          shadowRadius: 20,
          elevation: 20, // Com elevation, o Modalize fica sobreposto pelo BottomNavigation
        }}>
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
      </Content>
    </Container>
  );
};

export default BottomNavigation;

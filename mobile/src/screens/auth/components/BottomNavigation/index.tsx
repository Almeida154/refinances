import React from 'react';

// Styles
import { Container, Content, Description } from './styles';
import { colors } from '../../../../styles';

// Icon
import IonIcons from 'react-native-vector-icons/Ionicons';
import hexToRGB from '../../../../helpers/hexToRgba';
import { heightPixel } from '../../../../helpers/responsiveness';

interface IProps {
  onPress?: () => void;
  isCentered?: boolean;
  description?: string;
  color?: string;
  backgroundColor?: string;
  iconColor?: string;
  pickerOn?: boolean;
}

const BottomNavigation: React.FC<IProps> = ({
  onPress,
  isCentered,
  description,
  color,
  backgroundColor,
  iconColor,
  pickerOn,
}) => {
  return (
    <Container
      underlayColor={colors.white}
      onPress={onPress}
      style={{
        bottom: pickerOn ? heightPixel(440) : 0,
      }}>
      <Content
        style={[
          {
            shadowColor: 'rgba(0, 0, 0, 1)',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.08,
            shadowRadius: 20,
            elevation: 20,
          },
          backgroundColor ? { backgroundColor } : {},
        ]}>
        <Description
          lowOpacity={backgroundColor == undefined}
          style={[
            isCentered ? { textAlign: 'center' } : {},
            color ? { color: color } : {},
          ]}>
          {description}
        </Description>
        {!isCentered && (
          <IonIcons
            name="md-arrow-forward-sharp"
            size={30}
            color={iconColor ? iconColor : colors.redCrayola}
          />
        )}
      </Content>
    </Container>
  );
};

export default BottomNavigation;

import React from 'react';
import { StatusBar, View } from 'react-native';

// Styles
import { Title, Boundaries } from './styles';
import { colors } from '../../styles';

// Icon
import IonIcons from 'react-native-vector-icons/Ionicons';
import { widthPixel } from '../../helpers/responsiveness';
import { useTheme } from 'styled-components/native';
interface IProps {
  onBackButton: () => void;
  title?: string;
}

const ShortHeader: React.FC<IProps> = ({ onBackButton, title }) => {
  const theme: any = useTheme();
  return (
    <View
      style={{
        backgroundColor: theme.colors.white,
        shadowColor: 'rgba(0, 0, 0, .2)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
        elevation: 10,
      }}>
      <Boundaries>
        <IonIcons
          style={{ marginLeft: -6, opacity: 0.2 }}
          name="md-arrow-back-sharp"
          size={widthPixel(70)}
          color={theme.colors.davysGrey}
          onPress={onBackButton}
        />
        <Title numberOfLines={1}>
          {title != undefined ? title : 'Sem título'}
        </Title>
      </Boundaries>
    </View>
  );
};

export default ShortHeader;

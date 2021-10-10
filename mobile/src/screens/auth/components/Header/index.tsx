import React from 'react';

// Styles
import { Container, Title, Subtitle, Boundaries } from './styles';

import { colors, fonts, metrics } from '../../../../styles';

// Icon
import IonIcons from 'react-native-vector-icons/Ionicons';

interface IProps {
  onBackButton: () => void;
  title?: string;
  subtitle?: string;
  hasShadow?: boolean;
}

const Header: React.FC<IProps> = ({
  onBackButton,
  title,
  subtitle,
  hasShadow,
}) => {
  return (
    <Container>
      <Boundaries>
        <IonIcons
          style={{ marginTop: 16, opacity: 0.3 }}
          name="md-arrow-back-sharp"
          size={40}
          color={colors.davysGrey}
          onPress={onBackButton}
        />
        <Title>{title != undefined ? title : 'Sem título'}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </Boundaries>
    </Container>
  );
};

export default Header;

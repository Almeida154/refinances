import React from 'react';

// Styles
import {
  Container,
  Title,
  Subtitle,
  Boundaries,
  TopContainer,
  Step,
  LastWordAccent,
} from './styles';

import { colors, fonts, metrics } from '../../../../styles';

// Icon
import IonIcons from 'react-native-vector-icons/Ionicons';

interface IProps {
  onBackButton: () => void;
  title?: string;
  subtitle?: string;
  hasShadow?: boolean;
  step?: string;
  lastWordAccent?: string;
}

const Header: React.FC<IProps> = ({
  onBackButton,
  title,
  subtitle,
  hasShadow,
  step,
  lastWordAccent,
}) => {
  return (
    <Container>
      <Boundaries>
        <TopContainer>
          <IonIcons
            style={{ marginLeft: -6, opacity: 0.3 }}
            name="md-arrow-back-sharp"
            size={40}
            color={colors.davysGrey}
            onPress={onBackButton}
          />
          {step && <Step>{step}</Step>}
        </TopContainer>
        {lastWordAccent ? (
          <Title>
            {title != undefined ? title : 'Sem título'}{' '}
            <LastWordAccent> {lastWordAccent}?</LastWordAccent>
          </Title>
        ) : (
          <Title>{title != undefined ? title : 'Sem título'}</Title>
        )}
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </Boundaries>
    </Container>
  );
};

export default Header;

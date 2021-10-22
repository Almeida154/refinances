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

import { colors } from '../../../../styles';

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
    <Container
      style={
        hasShadow
          ? {
              backgroundColor: colors.white,
              shadowColor: 'rgba(0, 0, 0, .3)',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.08,
              shadowRadius: 20,
              elevation: 40,
            }
          : {}
      }>
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
            <LastWordAccent> {lastWordAccent}</LastWordAccent>
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

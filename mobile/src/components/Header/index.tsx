import React from 'react'
import { useTheme } from 'styled-components/native';
// Styles
import {
  Container,
  Title,
  Subtitle,
  Boundaries,
  TopContainer,
  Step,
  LastWordAccent,
  TouchableOpacity
} from './styles';

import { colors } from '../../styles';
// Icon
import IonIcons from 'react-native-vector-icons/Ionicons';
import { ToastAndroid } from 'react-native';

interface IProps {
  backButton: () => void;
  title?: string;
  subtitle?: string;
  hasShadow?: boolean;
  step?: string;
  lastWordAccent?: string;
  color?: string;
  accent?: string;
  isShort?: boolean;
}

const Header: React.FC<IProps> = ({
  backButton,
  title,
  subtitle,
  hasShadow,
  step,
  lastWordAccent,
  color,
  isShort,
  accent,
}) => {
  const theme: any = useTheme()
  
  return (  
    <Container
      style={
        hasShadow
          ? {
            
              backgroundColor: theme.colors.white,
              shadowColor: 'rgba(0, 0, 0, .3)',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.08,
              shadowRadius: 20,
              elevation: 10,
            }
          : {}
      }>
      <Boundaries>
        <TopContainer>
          <TouchableOpacity onPress={backButton}>
            <IonIcons
              style={{opacity: 0.3 }}
              name="md-arrow-back-sharp"
              size={40}
              color={theme.colors.davysGrey}
            />
          </TouchableOpacity>
            {step && <Step style={accent ? { color: accent } : {}}>{step}</Step>}
        </TopContainer>
        {lastWordAccent ? (
          <Title
            style={[
              color ? { color } : {},
              isShort ? { marginTop: '0%' } : {},
            ]}>
            {title != undefined ? title : 'Sem título'}{' '}
            <LastWordAccent style={accent ? { color: accent } : {}}>
              {lastWordAccent}
            </LastWordAccent>
          </Title>
        ) : (
          <Title
            style={[
              color ? { color } : {},
              isShort ? { marginTop: '0%' } : {},
            ]}>
            {title != undefined ? title : 'Sem título'}
          </Title>
        )}
        {subtitle && (
          <Subtitle
            style={[
              color ? { color, opacity: 0.3 } : {},
              isShort ? { marginTop: 0 } : {},
            ]}>
            {subtitle}
          </Subtitle>
        )}
      </Boundaries>
    </Container>
  );
};

export default Header;

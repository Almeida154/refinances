import React, { forwardRef, VoidFunctionComponent } from 'react';
import { useTheme } from 'styled-components/native';
import {
  Title,
  Subtitle,
  Body,
  SearchContainer,
  Search,
  SearchDeleteButton,
} from './styles';
import { Modalize as Modal } from 'react-native-modalize';
import { ModalizeProps } from 'react-native-modalize'; // Deviamos ter usado as props :|
import { metrics } from '../../styles';

import IonIcons from 'react-native-vector-icons/Ionicons';
import hexToRGB from '../../helpers/hexToRgba';
import { View } from 'react-native';

interface IProps {
  title?: string;
  subtitle?: string;
  height?: number;
  snapPoint?: number;
  headerHasFullBoundaries?: boolean;
  isCentered?: boolean;
  backgroundColor?: string;
  hasBodyBoundaries?: boolean;
  searchEvent?: (txt: string) => void;
  searchValue?: string;
  onClearSearch?: () => void;
  children: React.ReactNode;
}

const Modalize: React.ForwardRefRenderFunction<Modal, IProps> = (
  {
    title,
    subtitle,
    height,
    snapPoint,
    headerHasFullBoundaries,
    isCentered,
    backgroundColor,
    hasBodyBoundaries,
    searchEvent,
    searchValue,
    onClearSearch,
    children,
  },
  ref,
) => {
  const theme: any = useTheme();
  return (
    <Modal
      ref={ref}
      adjustToContentHeight={!height && !snapPoint}
      snapPoint={snapPoint}
      modalHeight={height}
      modalStyle={{ backgroundColor: backgroundColor || theme.colors.white }}
      openAnimationConfig={{
        spring: {
          // speed: 3,
          // bounciness: 10,
          // damping: 9,
          // mass: 3,
          // stiffness: 6,
          tension: 1,
        },
        timing: {
          duration: 300,
        },
      }}
      HeaderComponent={
        title ? (
          <>
            <Title
              style={{
                paddingBottom:
                  subtitle == null && headerHasFullBoundaries
                    ? metrics.default.boundaries
                    : 0,
              }}>
              {title}
            </Title>
            {subtitle && (
              <Subtitle
                style={{
                  paddingBottom:
                    headerHasFullBoundaries && searchEvent == null
                      ? metrics.default.boundaries
                      : headerHasFullBoundaries
                      ? metrics.default.boundaries / 2
                      : 0,
                }}>
                {subtitle}
              </Subtitle>
            )}
            {searchEvent && (
              <SearchContainer>
                <Search
                  onChangeText={txt => searchEvent(txt)}
                  value={searchValue}
                  placeholder="Buscar"
                  placeholderTextColor={hexToRGB(theme.colors.davysGrey, 0.4)}
                />
                <SearchDeleteButton activeOpacity={1} onPress={onClearSearch}>
                  <IonIcons
                    name="close"
                    size={24}
                    color={`rgba(82, 82, 82, .1)`}
                  />
                </SearchDeleteButton>
              </SearchContainer>
            )}
          </>
        ) : (
          <View></View>
        )
      }>
      <Body
        hasBodyBoundaries={hasBodyBoundaries}
        style={
          isCentered ? { justifyContent: 'center', alignItems: 'center' } : {}
        }>
        {children}
      </Body>
    </Modal>
  );
};

export default forwardRef(Modalize);

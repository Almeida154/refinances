import React, { forwardRef, VoidFunctionComponent } from 'react';

import { Title, Subtitle, Body } from './styles';
import { Modalize as Modal } from 'react-native-modalize';
import { ModalizeProps } from 'react-native-modalize'; // Deviamos ter usado as props :|
import { colors } from '../../styles';

interface IProps {
  title?: string;
  subtitle?: string;
  height?: number;
  snapPoint?: number;
  isCentered?: boolean;
  backgroundColor?: string;
  hasBodyBoundaries?: boolean;
  children: React.ReactNode;
}

const Modalize: React.ForwardRefRenderFunction<Modal, IProps> = (
  {
    title,
    subtitle,
    height,
    snapPoint,
    isCentered,
    backgroundColor,
    hasBodyBoundaries,
    children,
  },
  ref,
) => {
  return (
    <Modal
      ref={ref}
      adjustToContentHeight={!height && !snapPoint}
      snapPoint={snapPoint}
      modalHeight={height}
      modalStyle={{ backgroundColor: backgroundColor || colors.white }}
      HeaderComponent={
        <>
          <Title>{title}</Title>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
        </>
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

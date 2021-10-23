import React, { forwardRef, VoidFunctionComponent } from 'react';

import { Title, Body } from './styles';
import { Modalize as Modal } from 'react-native-modalize';
import { colors } from '../../styles';

interface IProps {
  title?: string;
  height?: number;
  maxHeight?: number;
  isCentered?: boolean;
  backgroundColor?: string;
  hasBodyBoundaries?: boolean;
  children: React.ReactNode;
}

const Modalize: React.ForwardRefRenderFunction<Modal, IProps> = (
  {
    title,
    height,
    maxHeight,
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
      adjustToContentHeight
      snapPoint={maxHeight}
      modalHeight={height}
      modalStyle={{ backgroundColor: backgroundColor || colors.white }}
      HeaderComponent={<Title>{title}</Title>}>
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

import React, { forwardRef, VoidFunctionComponent } from 'react';

import { Boundaries, Title } from './styles';
import { Modalize as Modal } from 'react-native-modalize';
import { colors } from '../../styles';

interface IProps {
  title?: string;
  height?: number;
  maxHeight?: number;
  isCentered?: boolean;
  backgroundColor?: string;
  children: React.ReactNode;
}

const Modalize: React.ForwardRefRenderFunction<Modal, IProps> = (
  { title, height, maxHeight, isCentered, backgroundColor, children },
  ref,
) => {
  return (
    <Modal
      ref={ref}
      adjustToContentHeight
      modalStyle={{
        backgroundColor: backgroundColor || colors.white,
      }}
      HeaderComponent={
        <Boundaries style={{ paddingBottom: 0 }}>
          <Title>{title}</Title>
        </Boundaries>
      }>
      <Boundaries
        style={
          isCentered ? { justifyContent: 'center', alignItems: 'center' } : {}
        }>
        {children}
      </Boundaries>
    </Modal>
  );
};

export default forwardRef(Modalize);

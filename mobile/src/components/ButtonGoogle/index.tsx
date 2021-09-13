import React from 'react';
import { Btn } from './styles';

interface Props {
    children?: React.ReactNode;
    onPress: () => void;
}

const ButtonGoogle: React.FC<Props> = ({ onPress, children }) => { 
  return (
    <Btn onPress={onPress}>
        {children}
    </Btn>
  );
}

export default ButtonGoogle;
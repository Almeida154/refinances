import React from 'react';
import { Container, Day } from './styles';

interface IProps {
  isSelected?: boolean;
  isIncome?: boolean;
}

const SmoothPickerItem: React.FC<IProps> = ({
  isSelected,
  isIncome,
  children,
}) => (
  <Container isSelected={isSelected} isIncome={isIncome}>
    <Day isSelected={isSelected} isIncome={isIncome}>
      {children}
    </Day>
  </Container>
);

export default SmoothPickerItem;

import React from 'react';
import { Container, Day } from './styles';

interface IProps {
  isSelected?: boolean;
  lastDay?: boolean;
}

const SmoothPickerItem: React.FC<IProps> = ({
  isSelected,
  lastDay,
  children,
}) => (
  <Container isSelected={isSelected} lastDay={lastDay}>
    <Day isSelected={isSelected}>{children}</Day>
  </Container>
);

export default SmoothPickerItem;

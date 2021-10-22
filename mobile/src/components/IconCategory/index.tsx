import React from 'react';

import Icon from '../../helpers/gerarIconePelaString';
import { colors } from '../../styles';

import { SectionIcon } from './styles';

type PropsIconCategory = {
  stringIcon: string;
  color: string;
};

const IconCategory = ({ stringIcon, color }: PropsIconCategory) => {
  return (
    <SectionIcon color={color}>
      <Icon size={26} stringIcon={stringIcon} color={colors.platinum} />
    </SectionIcon>
  );
};

export default IconCategory;

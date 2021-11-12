import React from 'react';

import Icon from '../../helpers/gerarIconePelaString';
import { widthPixel } from '../../helpers/responsiveness';
import { colors } from '../../styles';

import { SectionIcon } from './styles';

type PropsIconCategory = {
  stringIcon: string;
  color: string;
};

const IconCategory = ({ stringIcon, color }: PropsIconCategory) => {
  return (
    <SectionIcon color={color}>
      <Icon size={widthPixel(50)} stringIcon={stringIcon} color={color} />
    </SectionIcon>
  );
};

export default IconCategory;

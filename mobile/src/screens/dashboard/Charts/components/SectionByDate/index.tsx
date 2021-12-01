import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { useTheme } from 'styled-components/native'; 
import { ReadParcela } from '../../../../../contexts/InstallmentContext';
import {
  UseTransferencias,
  Transferencia,
} from '../../../../../contexts/TransferContext';

import CardInstallment from '../CardInstallment';
import CardTransfer from '../CardTransfer';

import converterDataParaManuscrito from '../../../../../helpers/converterDataParaManuscrito';

import { Container, HeaderDate, LabelDate, BodyEntries } from './styles';

type PropsSectionByDate = {
  date: string;
  parcelas: ReadParcela[];
  transferencias: Transferencia[];
};

const SectionByDate = ({
  date,
  parcelas,
  transferencias,
}: PropsSectionByDate) => {
  const theme: any = useTheme()

  return (
    <Container>
      <HeaderDate>
        <LabelDate>{converterDataParaManuscrito(date)}</LabelDate>
      </HeaderDate>
      <BodyEntries>
        {parcelas.map((item, index) => (
          <CardInstallment item={item} key={index} />
        ))}
        {transferencias.map((item, index) => (
          <CardTransfer item={item} key={-index} />
        ))}
      </BodyEntries>
    </Container>
  );
};

export default SectionByDate;

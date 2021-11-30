import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPixel } from '../../../helpers/responsiveness';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Transferencia,
  UseTransferencias,
} from '../../../contexts/TransferContext';
import { ReadParcela, UseParcelas } from '../../../contexts/InstallmentContext';

import { Modalize as Modal } from 'react-native-modalize';

import { ConvertToParcela, ConvertToTransferencia } from './typecast';

import { converterNumeroParaData } from '../../../helpers/converterDataParaManuscrito';
import retornarIdDoUsuario from '../../../helpers/retornarIdDoUsuario';
import generateDates from '../../../helpers/generateDates';

import DetailEntry from './components/DetailEntry';

import Modalize from '../../../components/Modalize';

import { addMonths, toDate } from '../../../helpers/manipularDatas';

import SectionByDate from './components/SectionByDate';
import { useTheme } from 'styled-components/native'; 
import { UseDadosTemp } from '../../../contexts/TemporaryDataContext';
import Feather from 'react-native-vector-icons/Feather';
import {
  Header,
  PeriodoAnterior,
  PeriodoAtual,
  PeriodoPosterior,
  LabelPeriodo,
  Body,
  Container,
  Footer,
  CardBalance,
  LabelBalance,
  LabelValueBalance,
  ScrollBody,
  ButtonAccessDetail,
} from './styles';
import { colors } from '../../../styles';

interface PropsRenderSection {
  item: (ReadParcela[] | Transferencia[])[];
}
const RenderSection: React.FC<PropsRenderSection> = ({ item }) => {
  let readByParcelas: ReadParcela[] = ConvertToParcela(item[0]);
  let readByTransferencias: Transferencia[] = ConvertToTransferencia(item[1]);

  const date: Date = !readByParcelas[0]
    ? new Date(readByTransferencias[0].dataTransferencia)
    : new Date(readByParcelas[0].dataParcela);

  return (
    <SectionByDate
      date={date.toLocaleDateString()}
      parcelas={readByParcelas}
      transferencias={readByTransferencias}
    />
  );
};

const Extrato = () => {
  const { readParcelas, handleInstallmentGroupByDate } = UseParcelas();
  const { readTransferencias, handleTransferGroupByDate } = UseTransferencias();
  const { modalizeRefDetailEntry, selectedItemExtract } = UseDadosTemp();

  const yearCurrent = String(new Date(Date.now()).getFullYear());

  const [dateCurrent, setDateCurrent] = useState(
    new Date(Date.now()).toLocaleDateString(),
  );

  const [allDatas, setAllDatas] = useState<
    (ReadParcela[] | Transferencia[])[][] | null
  >(null);

  const [gasto, setGasto] = useState('00,00');
  const [ganho, setGanho] = useState('00,00');
  const [saldo, setSaldo] = useState('00,00');

  function calcBalance(alldata: (ReadParcela[] | Transferencia[])[][]) {
    let gastos = 0,
      ganhos = 0,
      balance = 0;

    alldata.map((item, index) => {
      const parcelas: ReadParcela[] = ConvertToParcela(item[0]);

      parcelas.map(parcela => {
        if (
          typeof parcela.lancamentoParcela != 'number'
            ? parcela.lancamentoParcela.tipoLancamento == 'despesa'
            : false
        ) {
          gastos += parcela.valorParcela;
        } else if (
          typeof parcela.lancamentoParcela != 'number'
            ? parcela.lancamentoParcela.tipoLancamento == 'receita'
            : false
        ) {
          ganhos += parcela.valorParcela;
        }
      });
    });

    setGasto(
      gastos.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
    );
    setGanho(
      ganhos.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
    );
    setSaldo(
      (ganhos - gastos).toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      }),
    );
  }

  function loadInAllDatas() {
    var i = 0,
      j = 0;

    if (!readTransferencias || !readParcelas) {
      return;
    }

    let aux = [];

    while (i < readParcelas.length) {
      const dateOfInstallment = new Date(
        readParcelas[i][0].dataParcela,
      ).toLocaleDateString();
      let dateOfTransfer;

      if (readTransferencias[j])
        dateOfTransfer = new Date(
          readTransferencias[j][0].dataTransferencia,
        ).toLocaleDateString();

      if (
        !dateOfTransfer ||
        toDate(dateOfInstallment) < toDate(dateOfTransfer)
      ) {
        aux.push([readParcelas[i], []]);
        i++;
      } else if (toDate(dateOfInstallment) > toDate(dateOfTransfer)) {
        aux.push([[], readTransferencias[j]]);
        j++;
      } else {
        aux.push([readParcelas[i], readTransferencias[j]]);
        j++;
        i++;
      }
    }

    while (j < readTransferencias.length) {
      aux.push([[], readTransferencias[j]]);
      j++;
    }

    setAllDatas(aux);
    calcBalance(aux);
  }

  async function loadTransferencias(date: Date) {
    handleTransferGroupByDate(await retornarIdDoUsuario(), date.toISOString());
  }

  async function loadParcelas(date: Date) {
    handleInstallmentGroupByDate(
      await retornarIdDoUsuario(),
      date.toISOString(),
    );
  }

  useEffect(() => {
    const getDate = toDate(dateCurrent);
    loadParcelas(getDate);
    loadTransferencias(getDate);
  }, []);

  useEffect(() => {
    loadInAllDatas();
  }, [readTransferencias, readParcelas]);

  function updateDate(action: number) {
    const newDate = addMonths(toDate(dateCurrent), action);
    setDateCurrent(newDate.toLocaleDateString());

    loadParcelas(newDate);
    loadTransferencias(newDate);
  }
  const theme: any = useTheme()

  return (
    <Container>
      <ScrollBody>
      <Header>
        <PeriodoAnterior onPress={() => updateDate(-1)}>
          <Feather
            size={widthPixel(60)}
            name={'chevron-left'}
            color={theme.colors.darkGray}
          />
        </PeriodoAnterior>

        <PeriodoAtual>
          <LabelPeriodo>
            {converterNumeroParaData(
              dateCurrent,
              !(yearCurrent == dateCurrent.split('/')[2]),
            )}
          </LabelPeriodo>
        </PeriodoAtual>

        <PeriodoPosterior onPress={() => updateDate(1)}>
          <Feather
            size={widthPixel(60)}
            name={'chevron-right'}
            color={theme.colors.darkGray}
          />
        </PeriodoPosterior>
      </Header>
        <Body>
          <FlatList
            data={allDatas}
            renderItem={({ item }) => <RenderSection item={item} />}
            keyExtractor={(item, index) => String(index)}
            extraData={allDatas}
          />
        </Body>
      </ScrollBody>
      <Footer>
        <CardBalance>
          <LabelBalance> Ganhos </LabelBalance>
          <LabelValueBalance style={{ color: theme.colors.slimyGreen }}>
            {ganho}
          </LabelValueBalance>
        </CardBalance>

        <CardBalance>
          <LabelBalance> Gastos </LabelBalance>
          <LabelValueBalance style={{ color: theme.colors.redCrayola }}>
            {gasto}
          </LabelValueBalance>
        </CardBalance>

        <CardBalance>
          <LabelBalance> Saldo atual </LabelBalance>
          <LabelValueBalance style={{ color: '#999' }}>
            {saldo}
          </LabelValueBalance>
        </CardBalance>
      </Footer>


      <Modalize ref={modalizeRefDetailEntry} backgroundColor={theme.colors.cultured}>
        {/* @ts-ignore */}
        <DetailEntry item={selectedItemExtract} />
      </Modalize>
    </Container>
  );
};

export default Extrato;

import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';

import { heightPixel, widthPixel } from '../../../helpers/responsiveness';

import {
  Transferencia,
  UseTransferencias,
} from '../../../contexts/TransferContext';
import { ReadParcela, UseParcelas } from '../../../contexts/InstallmentContext';

import { ConvertToParcela, ConvertToTransferencia } from './typecast';

import { converterNumeroParaData } from '../../../helpers/converterDataParaManuscrito';
import retornarIdDoUsuario from '../../../helpers/retornarIdDoUsuario';

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
} from './styles';
import { colors, metrics } from '../../../styles';
import hexToRGB from '../../../helpers/hexToRgba';
import shadowBox from '../../../helpers/shadowBox';
import doubleToCurrency from '../../../helpers/doubleToCurrency';
import ExtractPlaceholder from './components/ExtractPlaceholder';
import ViewButtons from '../../../components/ViewButtons';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import RowPlaceholder from './components/RowPlaceholder';
import BalancePlaceholder from './components/BalancePlaceholder';

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

  const [isLoading, setLoading] = useState(true);

  function calcBalance(alldata: (ReadParcela[] | Transferencia[])[][]) {
    let gastos = 0,
      ganhos = 0;

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

    setGasto(doubleToCurrency(gastos));
    setGanho(doubleToCurrency(ganhos));
    setSaldo(doubleToCurrency(ganhos - gastos));
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
    await handleInstallmentGroupByDate(
      await retornarIdDoUsuario(),
      date.toISOString(),
    );
    setTimeout(() => setLoading(false), 200);
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
    setLoading(true);
    const newDate = addMonths(toDate(dateCurrent), action);
    setDateCurrent(newDate.toLocaleDateString());

    loadParcelas(newDate);
    loadTransferencias(newDate);
  }

  const theme: any = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <Container>
        <View style={{ elevation: 0 }}>
          <Header style={shadowBox(20, 0.2)}>
            <PeriodoAnterior onPress={() => updateDate(-1)}>
              <Feather
                size={widthPixel(60)}
                name={'chevron-left'}
                color={colors.darkGray}
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
                color={colors.darkGray}
              />
            </PeriodoPosterior>
          </Header>
        </View>
        {!isLoading ? (
          <Body>
            <FlatList
              style={{
                padding: metrics.default.boundaries / 1.6,
                marginBottom: heightPixel(224),
              }}
              data={allDatas}
              renderItem={({ item }) => <RenderSection item={item} />}
              keyExtractor={(item, index) => String(index)}
              extraData={allDatas}
            />
          </Body>
        ) : (
          <View style={{ flex: 1, padding: metrics.default.boundaries / 1.6 }}>
            <RowPlaceholder />
            <ExtractPlaceholder />
            <ExtractPlaceholder />
            <RowPlaceholder />
            <ExtractPlaceholder />
            <ExtractPlaceholder />
            <ExtractPlaceholder />
          </View>
        )}
        <Modalize ref={modalizeRefDetailEntry}>
          {/* @ts-ignore */}
          <DetailEntry item={selectedItemExtract} />
        </Modalize>
      </Container>

      <View style={{ elevation: 10 }}>
        <Footer style={shadowBox(10, 1)}>
          <CardBalance style={shadowBox(16, 0.3)}>
            {!isLoading ? (
              <>
                <LabelBalance>Ganhos</LabelBalance>
                <LabelValueBalance style={{ color: colors.slimyGreen }}>
                  {ganho}
                </LabelValueBalance>
              </>
            ) : (
              <BalancePlaceholder />
            )}
          </CardBalance>

          <CardBalance style={shadowBox(16, 0.3)}>
            {!isLoading ? (
              <>
                <LabelBalance>Gastos</LabelBalance>
                <LabelValueBalance style={{ color: colors.redCrayola }}>
                  {gasto}
                </LabelValueBalance>
              </>
            ) : (
              <BalancePlaceholder />
            )}
          </CardBalance>

          <CardBalance style={shadowBox(16, 0.3)}>
            {!isLoading ? (
              <>
                <LabelBalance>Saldo atual</LabelBalance>
                <LabelValueBalance
                  style={{ color: hexToRGB(theme.colors.eerieBlack, 0.3) }}>
                  {saldo}
                </LabelValueBalance>
              </>
            ) : (
              <BalancePlaceholder />
            )}
          </CardBalance>
        </Footer>
      </View>

      <ViewButtons />
    </View>
  );
};

export default Extrato;

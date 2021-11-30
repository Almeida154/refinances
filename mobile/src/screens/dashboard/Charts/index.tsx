import React, { useEffect, useRef, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Feather from 'react-native-vector-icons/Feather';

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

import { addMonths, toDate } from '../../../helpers/manipularDatas';

import SectionByDate from './components/SectionByDate';

import { UseDadosTemp } from '../../../contexts/TemporaryDataContext';
import { Categoria } from '../../../contexts/CategoriesContext';

import {
  Header,
  PeriodoAnterior,
  PeriodoAtual,
  PeriodoPosterior,
  LabelPeriodo,
  Container,
  TopData,
  TopDataItem,
  TopDataTitle,
  TopDataBalance,
  TopDataDescription,
  Content,
  CountCard,
  CountCardsContainer,
  Count,
  CountDescription,
} from './styles';

import { colors, metrics } from '../../../styles';
import { ScrollView, View } from 'react-native';
import { widthPixel } from '../../../helpers/responsiveness';

import doubleToCurrency from '../../../helpers/doubleToCurrency';
import shadowBox from '../../../helpers/shadowBox';
import GeneralCard from './components/GeneralCard';
import CategoryCard from './components/CategoryCard';

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

type GastosCategorias = {
  totalGasto: number;
  categoria: Categoria;
};

const Graficos = () => {
  const { readParcelas, handleInstallmentGroupByDate } = UseParcelas();
  const { readTransferencias, handleTransferGroupByDate } = UseTransferencias();

  const yearCurrent = String(new Date(Date.now()).getFullYear());

  const [dateCurrent, setDateCurrent] = useState(
    new Date(Date.now()).toLocaleDateString(),
  );

  const [allDatas, setAllDatas] = useState<
    (ReadParcela[] | Transferencia[])[][] | null
  >(null);

  const [gasto, setGasto] = useState(0);
  const [ganho, setGanho] = useState(0);
  const [saldo, setSaldo] = useState(0);

  const [maiorGasto, setMaiorGasto] = useState({
    valor: 0,
    descricao: '',
  });
  const [maiorGanho, setMaiorGanho] = useState({
    valor: 0,
    descricao: '',
  });

  const [qntdGanhos, setQntdGanhos] = useState(0);
  const [qntdGastos, setQntdGastos] = useState(0);

  const [gastosCategorias, setGastosCategorias] = useState([
    {} as GastosCategorias,
  ]);

  function calcStats(alldata: (ReadParcela[] | Transferencia[])[][]) {
    let gastos = 0;
    let ganhos = 0;
    let maiorGasto = { valor: 0, descricao: '' };
    let maiorGanho = { valor: 0, descricao: '' };
    let qntdGastos = 0;
    let qntdGanhos = 0;
    let gastosCategorias: GastosCategorias[] = [];

    alldata.map((item, index) => {
      const parcelas: ReadParcela[] = ConvertToParcela(item[0]);

      parcelas.map(parcela => {
        if (
          typeof parcela.lancamentoParcela != 'number'
            ? parcela.lancamentoParcela.tipoLancamento == 'despesa'
            : false
        ) {
          gastos += parcela.valorParcela;
          qntdGastos++;

          if (maiorGasto.valor < parcela.valorParcela) {
            maiorGasto.valor = parcela.valorParcela;
            maiorGasto.descricao =
              parcela.lancamentoParcela.descricaoLancamento;
          }

          let category = parcela.lancamentoParcela
            .categoryLancamento as Categoria;

          var categIndex = gastosCategorias.findIndex(
            gastoCategoia =>
              gastoCategoia.categoria.nomeCategoria == category.nomeCategoria,
          );

          // console.log('o que ta vindo é', categIndex);

          if (categIndex == -1) {
            // console.log('if n achou');
            gastosCategorias.push({
              totalGasto: parcela.valorParcela,
              categoria: parcela.lancamentoParcela
                .categoryLancamento as Categoria,
            });
          } else
            gastosCategorias[categIndex].totalGasto += parcela.valorParcela;
        } else if (
          typeof parcela.lancamentoParcela != 'number'
            ? parcela.lancamentoParcela.tipoLancamento == 'receita'
            : false
        ) {
          if (maiorGanho.valor < parcela.valorParcela) {
            maiorGanho.valor = parcela.valorParcela;
            maiorGanho.descricao =
              parcela.lancamentoParcela.descricaoLancamento;
          }

          ganhos += parcela.valorParcela;
          qntdGanhos++;
        }
      });
    });

    setGasto(gastos);
    setGanho(ganhos);
    setSaldo(ganhos - gastos);

    setMaiorGasto(maiorGasto);
    setMaiorGanho(maiorGanho);

    setQntdGanhos(qntdGanhos);
    setQntdGastos(qntdGastos);

    // gastosCategorias.map(cat => {
    //   console.log(`${cat.categoria.nomeCategoria} - ${cat.totalGasto}`);
    // });

    setGastosCategorias(gastosCategorias);
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
    calcStats(aux);
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

  return (
    <Container>
      <Header>
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

      <TopData style={shadowBox(20, 0.42)}>
        <TopDataItem
          style={{
            borderRightWidth: widthPixel(2),
            borderRightColor: colors.cultured,
          }}>
          <View>
            <TopDataTitle>Maior receita</TopDataTitle>
            <TopDataBalance style={{ color: colors.slimyGreen }}>
              {doubleToCurrency(maiorGanho.valor)}
            </TopDataBalance>
            <TopDataDescription>
              {maiorGanho.descricao != ''
                ? maiorGanho.descricao
                : 'Nada encontrado'}
            </TopDataDescription>
          </View>
        </TopDataItem>
        <TopDataItem
          style={{
            borderLeftWidth: widthPixel(2),
            borderLeftColor: colors.cultured,
          }}>
          <View>
            <TopDataTitle>Maior despesa</TopDataTitle>
            <TopDataBalance style={{ color: colors.redCrayola }}>
              {doubleToCurrency(maiorGasto.valor)}
            </TopDataBalance>
            <TopDataDescription numberOfLines={1}>
              {maiorGasto.descricao != ''
                ? maiorGasto.descricao
                : 'Nada encontrado'}
            </TopDataDescription>
          </View>
        </TopDataItem>
      </TopData>
      <ScrollView>
        <Content>
          <GeneralCard
            name="Geral"
            totalIncome={ganho}
            totalExpense={gasto}
            balance={saldo}
          />
          <CountCardsContainer>
            <CountCard
              style={[
                {
                  marginRight: metrics.default.boundaries / 1.6 / 2,
                },
                shadowBox(),
              ]}>
              <Count>{qntdGanhos}</Count>
              <CountDescription>Receitas lançadas</CountDescription>
            </CountCard>
            <CountCard
              style={[
                {
                  marginLeft: metrics.default.boundaries / 1.6 / 2,
                },
                shadowBox(),
              ]}>
              <Count>{qntdGastos}</Count>
              <CountDescription>Despesas lançadas</CountDescription>
            </CountCard>
          </CountCardsContainer>
          <CategoryCard
            name="Gastos por categoria"
            gastosCategorias={gastosCategorias}
            total={gasto}
          />
        </Content>
      </ScrollView>
    </Container>
  );
};
export default Graficos;

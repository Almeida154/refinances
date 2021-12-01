import React, { useEffect, useRef, useState } from 'react';

import Feather from 'react-native-vector-icons/Feather';

import {
  Transferencia,
  UseTransferencias,
} from '../../../contexts/TransferContext';
import { ReadParcela, UseParcelas } from '../../../contexts/InstallmentContext';

import { Modalize as Modal } from 'react-native-modalize';

import { ConvertToParcela } from './typecast';

import { converterNumeroParaData } from '../../../helpers/converterDataParaManuscrito';
import retornarIdDoUsuario from '../../../helpers/retornarIdDoUsuario';

import { addMonths, toDate } from '../../../helpers/manipularDatas';
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

import {
  Category,
  CategoryData,
  CategoryIcon,
  CategoryName,
  Name,
  Percent,
  Total,
} from './components/CategoryCard/styles';

import { useTheme } from 'styled-components/native';
import { metrics } from '../../../styles';
import { ScrollView, Text, View } from 'react-native';
import { heightPixel, widthPixel } from '../../../helpers/responsiveness';
import Icon from '../../../helpers/gerarIconePelaString';

import ViewButtons from '../../../components/ViewButtons';

import doubleToCurrency from '../../../helpers/doubleToCurrency';
import shadowBox from '../../../helpers/shadowBox';
import GeneralCard from './components/GeneralCard';
import CategoryCard from './components/CategoryCard';
import CardPlaceholder from './components/CardPlaceholder';
import DetailPlaceholder from './components/DetailPlaceholder';
import Modalize from '../../../components/Modalize';

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

  const [isLoading, setLoading] = useState(true);

  const modalizeRef = useRef<Modal>(null);

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

        <TopData style={shadowBox(20, 0.42)}>
          <TopDataItem
            style={{
              borderRightWidth: widthPixel(2),
              borderRightColor: theme.colors.cultured,
            }}>
            {!isLoading ? (
              <View>
                <TopDataTitle>Maior receita</TopDataTitle>
                <TopDataBalance style={{ color: theme.colors.slimyGreen }}>
                  {doubleToCurrency(maiorGanho.valor)}
                </TopDataBalance>
                <TopDataDescription>
                  {maiorGanho.descricao != ''
                    ? maiorGanho.descricao
                    : 'Nada encontrado'}
                </TopDataDescription>
              </View>
            ) : (
              <DetailPlaceholder />
            )}
          </TopDataItem>
          <TopDataItem
            style={{
              borderLeftWidth: widthPixel(2),
              borderLeftColor: theme.colors.cultured,
            }}>
            {!isLoading ? (
              <View>
                <TopDataTitle>Maior despesa</TopDataTitle>
                <TopDataBalance style={{ color: theme.colors.redCrayola }}>
                  {doubleToCurrency(maiorGasto.valor)}
                </TopDataBalance>
                <TopDataDescription numberOfLines={1}>
                  {maiorGasto.descricao != ''
                    ? maiorGasto.descricao
                    : 'Nada encontrado'}
                </TopDataDescription>
              </View>
            ) : (
              <DetailPlaceholder />
            )}
          </TopDataItem>
        </TopData>
        <ScrollView>
          <Content>
            {!isLoading ? (
              <GeneralCard
                name="Geral"
                totalIncome={ganho}
                totalExpense={gasto}
                balance={saldo}
              />
            ) : (
              <CardPlaceholder />
            )}
            <CountCardsContainer>
              <CountCard
                style={[
                  {
                    marginRight: metrics.default.boundaries / 1.6 / 2,
                  },
                  shadowBox(),
                ]}>
                {!isLoading ? (
                  <>
                    <Count>{qntdGanhos}</Count>
                    <CountDescription>Receitas lançadas</CountDescription>
                  </>
                ) : (
                  <DetailPlaceholder />
                )}
              </CountCard>
              <CountCard
                style={[
                  {
                    marginLeft: metrics.default.boundaries / 1.6 / 2,
                  },
                  shadowBox(),
                ]}>
                {!isLoading ? (
                  <>
                    <Count>{qntdGastos}</Count>
                    <CountDescription>Despesas lançadas</CountDescription>
                  </>
                ) : (
                  <DetailPlaceholder />
                )}
              </CountCard>
            </CountCardsContainer>
            {!isLoading ? (
              <CategoryCard
                name="Gastos por categoria"
                gastosCategorias={gastosCategorias}
                total={gasto}
                modalizeRef={modalizeRef}
              />
            ) : (
              <View
                style={{ marginVertical: metrics.default.boundaries / 1.6 }}>
                <CardPlaceholder />
              </View>
            )}
          </Content>
        </ScrollView>
      </Container>

      <Modalize
        ref={modalizeRef}
        title="Todos"
        height={
          metrics.screen.height / 1.2 - metrics.default.statusBarHeight * 2
        }
        snapPoint={
          metrics.screen.height / 1.4 - metrics.default.statusBarHeight * 2
        }
        headerHasFullBoundaries>
        {gastosCategorias != undefined &&
          gastosCategorias
            .sort((a, b) => {
              if (a.totalGasto > b.totalGasto) return 1;
              if (a.totalGasto < b.totalGasto) return -1;
              return 0;
            })
            .reverse()
            .map((gastoCateg, index) => {
              if (gastoCateg.categoria != undefined)
                return (
                  <Category
                    key={index}
                    style={{
                      borderTopLeftRadius: index == 0 ? widthPixel(24) : 0,
                      borderTopRightRadius: index == 0 ? widthPixel(24) : 0,
                      borderBottomWidth:
                        index != gastosCategorias.length - 1
                          ? heightPixel(6)
                          : 0,
                      borderBottomColor: theme.colors.cultured,
                    }}>
                    <CategoryIcon
                      style={{
                        borderWidth: widthPixel(10),
                        borderColor: gastoCateg.categoria.corCategoria,
                      }}>
                      <Icon
                        stringIcon={gastoCateg.categoria.iconeCategoria}
                        color={
                          gastoCateg.categoria.corCategoria ||
                          theme.colors.white
                        }
                        size={widthPixel(60)}
                      />
                    </CategoryIcon>
                    <CategoryName>
                      <Name numberOfLines={1}>
                        {gastoCateg.categoria.nomeCategoria}
                      </Name>
                    </CategoryName>
                    <CategoryData>
                      <Total numberOfLines={1}>
                        {doubleToCurrency(
                          gastoCateg.totalGasto,
                          'pt-br',
                          'BRL',
                          true,
                        )}
                      </Total>
                      <Percent>
                        {((gastoCateg.totalGasto * 100) / (gasto || 1)).toFixed(
                          1,
                        )}
                        %
                      </Percent>
                    </CategoryData>
                  </Category>
                );
            })}
      </Modalize>

      <ViewButtons />
    </View>
  );
};
export default Graficos;

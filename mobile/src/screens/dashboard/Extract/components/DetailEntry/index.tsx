import React from 'react';

import {
  ReadParcela,
  Parcela,
} from '../../../../../contexts/InstallmentContext';
import { UseLancamentos } from '../../../../../contexts/EntriesContext';
import { UseDadosTemp } from '../../../../../contexts/TemporaryDataContext';

import { StackActions } from '@react-navigation/native';
import { colors, fonts, metrics } from '../../../../../styles';
import Icon from '../../../../../helpers/gerarIconePelaString';

import {
  Container,
  LabelTitle,
  LabelQuantity,
  GroupLabel,
  Label,
  Value,
  SectionDescription,
  Row,
  SepareRow,
  SepareColumn,
  Detail,
  CircleIcon,
} from './styles';
import { useTheme } from 'styled-components/native';
import doubleToCurrency from '../../../../../helpers/doubleToCurrency';
import { widthPixel } from '../../../../../helpers/responsiveness';
import shadowBox from '../../../../../helpers/shadowBox';

interface PropsDetail {
  item: ReadParcela | null;
}

const DetailEntry: React.FC<PropsDetail> = ({ item }) => {
  const { navigation, showNiceToast } = UseDadosTemp();
  const { handleLoadOneLancamentos } = UseLancamentos();

  if (!item) {
    return <></>;
  }

  if (typeof item.lancamentoParcela == 'number') {
    showNiceToast('error', 'O lançamento não foi reconhecido');
    return <></>;
  }
  if (typeof item.lancamentoParcela.categoryLancamento == 'string') {
    showNiceToast('A categoria do lançamento não foi reconhecida');
    return <></>;
  }
  if (!item.contaParcela) {
    showNiceToast('A Conta não foi reconhecida');
    return <></>;
  }

  async function navigateEdit() {
    if (item) {
      const receiveEntry = await handleLoadOneLancamentos(
        item?.lancamentoParcela.id,
      );

      if (typeof receiveEntry == 'string')
        return showNiceToast(
          'error',
          'Ocorreu um erro ao carregar esse lançamento',
        );

      if (receiveEntry.parcelaBaseada != -1) {
        const parcelaUpdate = {
          id: item.id,
          contaParcela: item.contaParcela,
          dataParcela: new Date(item.dataParcela),
          indexOfLancamento: 0,
          statusParcela: item.statusParcela,
          valorParcela: item.valorParcela,
          lancamentoParcela: -1,
        } as Parcela;

        receiveEntry.parcelasLancamento = [parcelaUpdate];
        // @ts-ignore
        receiveEntry.totalParcelas = item.valorParcela;
      }
      navigation.dispatch(
        StackActions.replace('Lancamentos', {
          screen: 'Main',
          params: {
            receiveEntry:
              typeof receiveEntry == 'string' ? undefined : receiveEntry,
          },
        }),
      );
    }
  }

  async function navigateDelete() {
    if (item) {
      const response = await handleLoadOneLancamentos(
        item?.lancamentoParcela.id,
      );

      navigation.dispatch(
        StackActions.replace('Lancamentos', {
          screen: 'Main',
          params: {
            receiveEntry: typeof response == 'string' ? undefined : response,
          },
        }),
      );
    }
  }

  //console.log(item.lancamentoParcela)
  const theme: any = useTheme();

  return (
    <Container>
      <SepareRow style={{ justifyContent: 'space-between', marginBottom: 10 }}>
        <SepareColumn>
          <LabelTitle numberOfLines={1}>
            {item.lancamentoParcela.descricaoLancamento}
          </LabelTitle>
          <LabelQuantity>
            {item.lancamentoParcela.parcelaBaseada == -1 && (
              <Detail>{item.totalParcelas}x </Detail>
            )}
            {doubleToCurrency(item.valorParcela, 'pt-br', 'BRL', true)}
          </LabelQuantity>
        </SepareColumn>
        <SepareRow>
          <CircleIcon style={shadowBox(10, 0.3)} onPress={navigateEdit}>
            <Icon
              stringIcon="MaterialCommunityIcons:pencil"
              color={theme.colors.black}
              size={widthPixel(45)}
            />
          </CircleIcon>
          <CircleIcon
            style={[{ marginLeft: widthPixel(20) }, shadowBox(10, 0.3)]}
            onPress={navigateDelete}>
            <Icon
              stringIcon="Ionicons:trash-bin-sharp"
              color={theme.colors.black}
              size={widthPixel(45)}
            />
          </CircleIcon>
        </SepareRow>
      </SepareRow>
      <SectionDescription>
        <Row>
          <GroupLabel>
            <Label>Data</Label>
            <Value>{new Date(item.dataParcela).toLocaleDateString()}</Value>
          </GroupLabel>

          <GroupLabel>
            <Label>Categoria</Label>
            <Value numberOfLines={1}>
              {item.lancamentoParcela.categoryLancamento.nomeCategoria}
            </Value>
          </GroupLabel>

          <GroupLabel>
            <Label>Situação</Label>
            <Value>
              {item.statusParcela
                ? item.lancamentoParcela.tipoLancamento == 'despesa'
                  ? 'Pago'
                  : 'Recebido'
                : item.lancamentoParcela.tipoLancamento == 'despesa'
                ? 'Não pago'
                : 'Não recebido'}
            </Value>
          </GroupLabel>
        </Row>
        <Row>
          <GroupLabel>
            <Label>Conta</Label>
            <Value>{item.contaParcela.descricao}</Value>
          </GroupLabel>

          <GroupLabel>
            <Label>
              {item.lancamentoParcela.parcelaBaseada == -1
                ? 'Total'
                : 'Incidência'}
            </Label>
            <Value>
              {item.lancamentoParcela.parcelaBaseada == -1
                ? // @ts-ignore
                  doubleToCurrency(item.lancamentoParcela.valueLancamento)
                : doubleToCurrency(item.valorParcela)}
            </Value>
          </GroupLabel>
        </Row>
      </SectionDescription>
    </Container>
  );
};

export default DetailEntry;

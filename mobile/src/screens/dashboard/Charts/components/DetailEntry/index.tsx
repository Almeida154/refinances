import React from 'react';
import { ToastAndroid } from 'react-native';

import { ReadParcela } from '../../../../../contexts/InstallmentContext';
import { UseDadosTemp } from '../../../../../contexts/TemporaryDataContext';
import { StackActions } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
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
  CircleIcon,
} from './styles';

interface PropsDetail {
  item: ReadParcela | null;
}

const DetailEntry: React.FC<PropsDetail> = ({ item }) => {
  const { navigation } = UseDadosTemp();

  if (!item) {
    return <></>;
  }

  if (typeof item.lancamentoParcela == 'number') {
    ToastAndroid.show('O lançamento não foi reconhecido', ToastAndroid.SHORT);
    return <></>;
  }
  if (typeof item.lancamentoParcela.categoryLancamento == 'string') {
    ToastAndroid.show(
      'A categoria do lançamento não foi reconhecida',
      ToastAndroid.SHORT,
    );
    return <></>;
  }
  if (!item.contaParcela) {
    ToastAndroid.show('A Conta não foi reconhecida', ToastAndroid.SHORT);
    return <></>;
  }

  function navigateEdit() {
    navigation.dispatch(
      StackActions.replace('Lancamentos', {
        screen: 'Main',
        params: { receiveEntry: item },
      }),
    );
  }
  const theme: any = useTheme()
  return (
    <Container>
      <SepareRow style={{ justifyContent: 'space-between', marginBottom: 50 }}>
        <SepareColumn>
          <LabelTitle>{item.lancamentoParcela.descricaoLancamento}</LabelTitle>
          <LabelQuantity>{item.valorParcela}</LabelQuantity>
        </SepareColumn>
        <SepareRow>
          <CircleIcon onPress={navigateEdit}>
            <Icon
              stringIcon="MaterialCommunityIcons:pencil"
              size={25}
              color="#000"
            />
          </CircleIcon>
          <CircleIcon>
            <Icon
              stringIcon="Ionicons:trash-bin-sharp"
              size={25}
              color="#000"
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
            <Value>
              {item.lancamentoParcela.categoryLancamento.nomeCategoria}
            </Value>
          </GroupLabel>

          <GroupLabel>
            <Label>Nota</Label>
            <Value>Adicionar</Value>
          </GroupLabel>
        </Row>
        <Row>
          <GroupLabel>
            <Label>Conta</Label>
            <Value>{item.contaParcela.descricao}</Value>
          </GroupLabel>

          <GroupLabel>
            <Label>Total</Label>
            <Value>R$ 940,00</Value>
          </GroupLabel>
        </Row>
      </SectionDescription>
    </Container>
  );
};

export default DetailEntry;

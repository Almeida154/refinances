import React, { createContext, useContext, useEffect, useState } from 'react';

import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UseAuth } from './AuthContext';

import { Parcela, UseParcelas } from './InstallmentContext';
import { Categoria } from './CategoriesContext';
import { ToastAndroid } from 'react-native';

export type Lancamento = {
  id: number;
  descricaoLancamento: string;
  tipoLancamento: string;
  lugarLancamento: string;
  parcelaBaseada: number;
  categoryLancamento: Categoria | string;
  parcelasLancamento: Parcela[];
  essencial: boolean;
};

interface LancamentoContextType {
  lancamentos: Lancamento[] | null;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;

  handleLoadLancamentos(idUser: number): Promise<void>;
  handleAdicionarLancamento(
    lancamentoProps: Lancamento,
    idUser: number,
  ): Promise<string>;
  handleEditLancamento(
    lancamentoProps: Lancamento,
    idUser: number,
  ): Promise<string>;
  handleLoadOneLancamentos(idEntry: number): Promise<Lancamento | string>;
}

const LancamentoContext = createContext<LancamentoContextType>(
  {} as LancamentoContextType,
);

export const UseLancamentos = () => useContext(LancamentoContext);

export const LancamentoProvider: React.FC = ({ children }) => {
  const [lancamentos, setLancamentos] = useState<Lancamento[] | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    handleAdicionarParcela,
    handleInstallmentGroupByDate,
    handleEditParcela,
  } = UseParcelas();

  async function handleLoadLancamentos(idUser: number) {
    try {
      setLoading(true);

      const response = await api.post(`/entry/findbyuser/${idUser}`);

      if (response.data.error) throw response.data.error;

      // console.log("Lancamentos carregados, ", response.data.message)

      setLancamentos(response.data.message);
      setLoading(false);
    } catch (error) {
      console.log('Deu um erro no handleLoadLancamentos: ', error);
    }
  }

  async function handleLoadOneLancamentos(idEntry: number) {
    try {
      const response = await api.get(`/entry/read/${idEntry}`);

      if (response.data.error) {
        return response.data.error;
      }

      const readEntry: Lancamento = response.data.message;

      readEntry.parcelasLancamento.map((item, index) => {
        readEntry.parcelasLancamento[index].dataParcela = new Date(
          item.dataParcela,
        );
      });

      return readEntry;
    } catch (error) {
      console.log('Deu um erro no handleLoadLancamentos: ', error);
    }
  }

  async function handleAdicionarLancamento(
    lancamento: Lancamento,
    idUser: number,
  ) {
    try {
      const responseCategory = await api.post(
        `/category/findbyname/${idUser}`,
        {
          nomeCategoria: lancamento.categoryLancamento,
        },
      );

      const response = await api.post('/entry/create', {
        descricaoLancamento: lancamento.descricaoLancamento,
        tipoLancamento: lancamento.tipoLancamento,
        parcelaBaseada: lancamento.parcelaBaseada,
        lugarLancamento: lancamento.lugarLancamento,
        categoryLancamento: responseCategory.data.idCategory,
      });

      if (response.data.error) return response.data.error;

      lancamento.parcelasLancamento.map((item, index) => {
        lancamento.parcelasLancamento[index].lancamentoParcela =
          response.data.message.id;
      });
      
      const responseParcela = await handleAdicionarParcela(lancamento.parcelasLancamento);

      return responseParcela
    } catch (error) {
      console.log('Deu um erro no handleAdicionarLancamento: ' + error);
    }
  }

  async function handleEditLancamento(lancamento: Lancamento, idUser: number) {
    try {
      if (typeof lancamento.categoryLancamento == 'string') {
        return ToastAndroid.show(
          'Coloque a categoria como Categoria ao invés de string',
          ToastAndroid.SHORT,
        );
      }

      const response = await api.put(`/entry/edit/${lancamento.id}`, {
        descricaoLancamento: lancamento.descricaoLancamento,
        tipoLancamento: lancamento.tipoLancamento,
        parcelaBaseada: lancamento.parcelaBaseada,
        lugarLancamento: lancamento.lugarLancamento,
        categoryLancamento: lancamento.categoryLancamento.id,
        essencial: lancamento.essencial,
      });

      if (response.data.error) return response.data.error;

      console.debug('response.data.message.id ', response.data);

      lancamento.parcelasLancamento.map((item, index) => {
        lancamento.parcelasLancamento[index].lancamentoParcela =
          response.data.message.id;
      });

      await handleEditParcela(lancamento.parcelasLancamento);

      return '';
    } catch (error) {
      console.log('Deu um erro no handleEditLancamento: ' + error);
    }
  }

  return (
    <LancamentoContext.Provider
      value={{
        handleLoadOneLancamentos,
        handleEditLancamento,
        setLoading,
        loading,
        handleLoadLancamentos,
        lancamentos,
        handleAdicionarLancamento,
      }}>
      {children}
    </LancamentoContext.Provider>
  );
};

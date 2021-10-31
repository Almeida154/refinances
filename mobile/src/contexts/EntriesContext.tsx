import React, { createContext, useContext, useEffect, useState } from 'react';

import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UseAuth } from './AuthContext';

import { Parcela, UseParcelas } from './InstallmentContext';
import { Categoria } from './CategoriesContext';

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
}

const LancamentoContext = createContext<LancamentoContextType>(
  {} as LancamentoContextType,
);

export const UseLancamentos = () => useContext(LancamentoContext);

export const LancamentoProvider: React.FC = ({ children }) => {
  const [lancamentos, setLancamentos] = useState<Lancamento[] | null>(null);
  const [loading, setLoading] = useState(false);

  const { handleAdicionarParcela, handleInstallmentGroupByDate } =
    UseParcelas();

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

  async function handleAdicionarLancamento(
    lancamento: Lancamento,
    idUser: number,
  ) {
    try {
      setLoading(true);
      const responseCategory = await api.post(
        `/category/findbyname/${idUser}`,
        {
          nomeCategoria: lancamento.categoryLancamento,
        },
      );

      const response = await api.post('/entry/create', {
        descricaoLancamento: lancamento.descricaoLancamento,
        tipoLancamento: lancamento.tipoLancamento,
        lugarLancamento: lancamento.lugarLancamento,
        categoryLancamento: responseCategory.data.idCategory,
      });

      console.log('response', response.data.message.id)

      if (response.data.error) return response.data.error;

      lancamento.parcelasLancamento.map((item, index) => {
        lancamento.parcelasLancamento[index].lancamentoParcela = response.data.message.id          
      });

      console.log("Parcelas handlelizadas", lancamento.parcelasLancamento)
      await handleAdicionarParcela(lancamento.parcelasLancamento);

      return '';
    } catch (error) {
      console.log('Deu um erro no handleAdicionarLancamento: ' + error);
    }
  }

  return (
    <LancamentoContext.Provider
      value={{
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

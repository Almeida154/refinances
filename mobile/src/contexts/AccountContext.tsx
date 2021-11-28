import React, { createContext, useContext, useEffect, useState } from 'react';

import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';

export type Conta = {
  id: number;
  saldoConta: number;
  instituicao: string | null;
  tipo: string;
  descricao: string;
  userConta: number;
};

interface ContaContextType {
  contas: Conta[] | null;
  loading: boolean;
  handleAdicionarConta(contaProps: Conta): Promise<string>;
  handleEditarConta(contaProps: Conta): Promise<string>;

  handleReadByUserContas(idUser: number): Promise<void>;
}

const ContaContext = createContext<ContaContextType>({} as ContaContextType);

export const UseContas = () => useContext(ContaContext);

export const ContasProvider: React.FC = ({ children }) => {
  const [contas, setContas] = useState<Conta[] | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleAdicionarConta(conta: Conta) {
    try {
      const response = await api.post('/account/create', {
        saldoConta: conta.saldoConta,
        descricao: conta.descricao,
        instituicao: conta.instituicao,
        tipo: conta.tipo,
        userConta: conta.userConta,
      });

      if (response.data.error) return response.data.error;

      await AsyncStorage.setItem('idConta', String(response.data.message.id));

      if (contas != null) {
        const newContas = contas;
        newContas.push(response.data.message);
        setContas(newContas);
      }

      return '';
    } catch (error) {
      console.log('Deu um erro no handleAdicionarConta: ' + error);
    }
  }

  async function handleEditarConta(conta: Conta) {
    try {
      const response = await api.put(`/account/edit/${conta.id}`, {
        saldoConta: conta.saldoConta,
        descricao: conta.descricao,
        instituicao: conta.instituicao,
        tipo: conta.tipo,
        userConta: conta.userConta,
      });

      if (response.data.error) return response.data.error;      

      if (contas != null) {
        const newContas = contas;
        newContas.push(response.data.message);
        setContas(newContas);
      }

      return '';
    } catch (error) {
      console.log('Deu um erro no handleEditarConta: ' + error);
    }
  }

  async function handleReadByUserContas(idUser: number) {
    setLoading(true);
    try {
      const response = await api.post(`/account/findbyuser/${idUser}`);

      if (response.data.error) {
        ToastAndroid.show(response.data.error, ToastAndroid.SHORT);
      }
      setContas(response.data.contas);

      setLoading(false);
    } catch (error) {}
  }

  return (
    <ContaContext.Provider
      value={{ handleEditarConta, contas, handleReadByUserContas, loading, handleAdicionarConta }}>
      {children}
    </ContaContext.Provider>
  );
};

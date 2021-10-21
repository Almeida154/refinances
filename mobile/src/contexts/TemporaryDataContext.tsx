import React, { createContext, useContext, useEffect, useState } from 'react';

import api from '../services/api';

import { UseAuth } from './AuthContext';

import { Lancamento } from './EntriesContext';
import { Categoria } from './CategoriesContext';
import { Conta } from './AccountContext';
import { PropsMainRoutes } from '../@types/RootStackParamApp';
import { StackNavigationProp } from '@react-navigation/stack';

interface DadosTempContextType {
  categoriasTemp: Categoria[];
  rendaTemp: string;
  contaTemp: Conta;
  configuracoesDeConta: boolean[];
  navigation: StackNavigationProp<PropsMainRoutes, 'Main'>;

  setNavigation: React.Dispatch<
    React.SetStateAction<StackNavigationProp<PropsMainRoutes, 'Main'>>
  >;
  setupCategoriasPadroes(): void;
  setupConta(conta: Conta): Promise<void>;
  setRendaTemp: React.Dispatch<React.SetStateAction<string>>;
  setCategoriasTemp: React.Dispatch<React.SetStateAction<Categoria[]>>;
  setupConfiguracaoConta(quantidade: number): void;
  mudarConfiguracaoConta(configuracaoContaProps: boolean[]): void;
}

const DadosTempContext = createContext<DadosTempContextType>(
  {} as DadosTempContextType,
);

export const UseDadosTemp = () => useContext(DadosTempContext);

export const DadosTempProvider: React.FC = ({ children }) => {
  const [categoriasTemp, setCategoriasTemp] = useState<Categoria[]>([
    {},
  ] as Categoria[]);
  const [rendaTemp, setRendaTemp] = useState('00.00');
  const [contaTemp, setContaTemp] = useState<Conta>({} as Conta);
  const [configuracoesDeConta, setConfiguracoesDeConta] = useState(
    [] as boolean[],
  );
  const [navigation, setNavigation] = useState(
    {} as StackNavigationProp<PropsMainRoutes, 'Main'>,
  );

  const { user } = UseAuth();

  function setupCategoriasPadroes() {
    const nomesCategoriasPadroes = [
      'Educação',
      'Casa',
      'Restaurantes',
      'Família',
      'Impostos',
      'Lazer',
      'Mercado',
      'Pets',
      'Transporte',
      'Viagem',
    ];

    const newCategorias: Categoria[] = [];

    nomesCategoriasPadroes.map(item => {
      const categoria = {
        id: -1,
        nomeCategoria: item,
        tetoDeGastos: 0,
        tipoCategoria: 'despesa',
        essencial: false,
        userCategoria: user.id,
      };

      newCategorias.push(categoria);
    });

    setCategoriasTemp(newCategorias);
  }

  async function setupConfiguracaoConta(quantidade: number) {
    const aux = [];
    for (var i = 0; i < quantidade; i++) aux.push(false);
    console.log('aux + ', aux);
    setConfiguracoesDeConta(aux);
  }

  function mudarConfiguracaoConta(configuracaoConta: boolean[]) {
    setConfiguracoesDeConta(configuracaoConta);
  }

  async function setupConta(conta: Conta) {
    try {
      const newConta: Conta = {
        id: -1,
        saldoConta: conta.saldoConta,
        descricao: conta.descricao,
        userConta: conta.userConta,
        categoryConta: conta.categoryConta,
      };
      setContaTemp(newConta);
    } catch (error) {
      console.log('Deu um erro no setupConta: ' + error);
    }
  }

  return (
    <DadosTempContext.Provider
      value={{
        setNavigation,
        navigation,
        contaTemp,
        configuracoesDeConta,
        mudarConfiguracaoConta,
        setupConfiguracaoConta,
        categoriasTemp,
        rendaTemp,
        setRendaTemp,
        setupConta,
        setupCategoriasPadroes,
        setCategoriasTemp,
      }}>
      {children}
    </DadosTempContext.Provider>
  );
};

import React, { createContext, useContext, useEffect, useState } from 'react';

import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UseAuth } from './AuthContext';

import retornarIdDoUsuario from '../helpers/retornarIdDoUsuario';

export type Categoria = {
  id: number;
  nomeCategoria: string;
  tetoDeGastos: number | null;
  tipoCategoria: string;
  userCategoria: number;
  iconeCategoria: string;
  corCategoria: string;
  isSelected: boolean;
};

interface CategoriaContextType {
  categorias: Categoria[] | null;
  loading: boolean;

  handleAdicionar(categoriaProps: Categoria): Promise<string>;
  setupCategorias(): Promise<void>;
  handleReadByUserCategorias(
    idUser: number,
    tipoCategoria: string,
  ): Promise<void>;
  handleGetCategoryById(id: number): Promise<void>;
  handleAtualizarCategoria(categoria: Categoria, id: number): Promise<void>;
  handleCountByEntry(
    idUser: number,
    tipoCategoria: string,
  ): Promise<void>;
}

const CategoriaContext = createContext<CategoriaContextType>(
  {} as CategoriaContextType,
);

export const UseCategories = () => useContext(CategoriaContext);

export const CategoriasProvider: React.FC = ({ children }) => {
  const [categorias, setCategorias] = useState<Categoria[] | null>(null);
  const [loading, setLoading] = useState(false);

  const { user } = UseAuth();

  async function setupCategorias() {
    const nomesCategoriasPadroes = [
      ['Educação', 'FontAwesome:book'],
      ['Casa', 'MaterialCommunityIcons:home-variant'],
      ['Restaurantes', 'Ionicons:restaurant-sharp'],
      ['Família', 'MaterialIcons:family-restroom'],
      ['Impostos', 'FontAwesome5:file-invoice-dollar'],
      ['Lazer', 'MaterialIcons:park'],
      ['Mercado', 'MaterialCommunityIcons:point-of-sale'],
      ['Pets', 'MaterialIcons:pets'],
      ['Transporte', 'FontAwesome5:car-side'],
      ['Viagem', 'Fontisto:plane'],
    ];

    const newCategorias = categorias;

    nomesCategoriasPadroes.map(async item => {
      const response = await api.post('/category/create', {
        nomeCategoria: item[0],
        tetoDeGastos: null,
        tipoCategoria: 'despesa',
        iconeCategoria: item[1],
        userCategory: user.id,
      });

      if (newCategorias == null) {
        setCategorias([response.data.message]);
      } else {
        newCategorias.push(response.data.message);
      }
    });

    setCategorias(newCategorias);
  }

  async function handleAdicionar(categoria: Categoria) {
    setLoading(true);
    console.log('veio aqui no handleAdicionar');
    try {
      const response = await api.post('/category/create', {
        nomeCategoria: categoria.nomeCategoria,
        tetoDeGastos: categoria.tetoDeGastos,
        tipoCategoria: categoria.tipoCategoria,
        iconeCategoria: categoria.iconeCategoria,
        userCategory: categoria.userCategoria,
        corCategoria: categoria.corCategoria,
      });

      console.log(response.data);
      if (response.data.error) {
        return response.data.error;
      }

      const newCategorias = categorias;

      if (newCategorias == null) {
        setCategorias([response.data.message]);
      } else {
        newCategorias.push(response.data.message);
        setCategorias(newCategorias);
      }
      setLoading(false);

      return '';
    } catch (error) {
      console.log('Deu um erro no handleAdicionar: ' + error);
    }
  }

  async function handleReadByUserCategorias(
    idUser: number,
    tipoCategoria: string,
  ) {
    console.debug('handleReadByUserCategorias | entrou');
    setLoading(true);
    try {
      const response = await api.post(`/category/findbyuser/${idUser}`, {
        tipoCategoria,
      });
      //console.debug('handleReadByUserCategorias | ', response.data.categories);
      setCategorias(response.data.categories);
      setLoading(false);
    } catch (error) {}
  }

  async function handleAtualizarCategoria(categoria: Categoria, id: number) {
    try {
      const response = await api.put(`/category/edit/${id}`, {
        nomeCategoria: categoria.nomeCategoria,
        tetoDeGastos: categoria.tetoDeGastos,
        tipoCategoria: categoria.tipoCategoria,
        iconeCategoria: categoria.iconeCategoria,
        userCategory: categoria.userCategoria,
        corCategoria: categoria.corCategoria,
      });

      console.log(response.data);

      if (response.data.error) console.log(response.data.error);

      console.log('response.data', response.data);

      const updateCategorias = categorias == null ? null : categorias.slice();

      if (!updateCategorias) {
        //Caso atualizou e não tinha nenhuma outras categorias carregadas, carregar todas contando com a atual
        handleReadByUserCategorias(await retornarIdDoUsuario(), 'despesa');
      } else {
        console.log(response.data.categorias);
        setCategorias(response.data.categorias);

        console.log('categorias: ' + categorias);
      }
    } catch (error) {
      console.log('Deu um erro no handleUpdatecategoria: ' + error);
    }
  }

  async function handleGetCategoryById(id: number) {
    try {
      const response = await api.get(`/category/read/${id}`);
      return response.data.categories;
    } catch (error) {
      console.debug('CategoriesContext | handleGetCategoryById: ' + error);
    }
  }

  async function handleCountByEntry(idUser: number, tipoCategoria: string) {
    try {
      const response = await api.get(`/category/countbyentry/${idUser}`);
      return response.data.categories;
    } catch (error) {
      console.debug('CategoriesContext | handleCountByEntry: ' + error);
    }
  }

  return (
    <CategoriaContext.Provider
      value={{
        categorias,
        loading,
        handleReadByUserCategorias,
        handleAdicionar,
        setupCategorias,
        handleAtualizarCategoria,
        handleGetCategoryById,
        handleCountByEntry
      }}>
      {children}
    </CategoriaContext.Provider>
  );
};

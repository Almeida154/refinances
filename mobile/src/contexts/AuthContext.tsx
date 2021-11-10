import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Categoria } from './CategoriesContext';
import { Conta } from './AccountContext';
import { Lancamento } from './EntriesContext';

import Toast from 'react-native-toast-message';
import global from '../global';

import api from '../services/api';
import { StatusBar } from 'react-native';

export type User = {
  id: number;
  nomeUsuario: string;
  emailUsuario: string;
  fotoPerfilUsuario: string | undefined | null;
  senhaUsuario: string;
  signed: boolean;
};

export interface SetupUser {
  expenseTags: string[];
  expenseTagsCount: number;
  incomeTags: string[];
  incomeTagsCount: number;

  createdCategories: Categoria[];
  allCategories: Categoria[];
  entries: Lancamento[];
  account: Conta[];
}

export interface error {
  error?: string;
  message?: string;
  ok?: boolean;
}

interface AuthContextType {
  token: string;
  user: User;
  setupUser: SetupUser;
  handleLogin(logUser: User): Promise<error>;
  handleRegister(): Promise<string>;
  updateUserProps(userProps: User): void;
  updateSetupUserProps(setupUserProps: SetupUser): void;
  handleLogout(): void;
  emailExists(email: string): Promise<boolean>;
  userAvatar(): Promise<string | undefined | null>;

  niceToast(
    type: string,
    title: string | null,
    message?: string | null,
    time?: number,
  ): any;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const UseAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>({} as User);
  const [setupUser, setSetupUserData] = useState<SetupUser>({} as SetupUser);

  useEffect(() => {
    (async () => {
      const storagedUser = await AsyncStorage.getItem('user');
      console.debug('ASYNC STORAGE: ', await AsyncStorage.getItem('user'));
      if (storagedUser) setUser(JSON.parse(storagedUser));
    })();
  }, []);

  async function emailExists(email: string) {
    try {
      const response = await api.post('/user/emailexists', {
        emailUsuario: email,
      });
      return response.data.exists;
    } catch (error) {
      console.log('AuthContext | emailExists(): ', error);
    }
  }

  async function userAvatar() {
    try {
      if (user.id != undefined) {
        const response = await api.get(`/user/avatar/${user.id}`);
        return JSON.stringify(response.data.avatar);
      }
      console.debug('AuthContext | getUserAvatar(): ', 'Algo deu errado!');
    } catch (error) {
      console.debug('AuthContext | getUserAvatar(): ', error);
    }
  }

  async function handleRegister() {
    try {
      const response = await api.post('/user/create', {
        nomeUsuario: user.nomeUsuario,
        emailUsuario: user.emailUsuario,
        senhaUsuario: user.senhaUsuario,
        fotoPerfilUsuario: user.fotoPerfilUsuario,
      });

      if (response.data.error) {
        return response.data.error.toString();
      }

      const newUser: User = response.data.user;
      newUser.fotoPerfilUsuario =
        newUser.fotoPerfilUsuario != null ? 'base64' : null; // Definindo 'base64' porque a imagem é gigante

      await AsyncStorage.setItem('user', JSON.stringify(newUser));

      return '';
    } catch (error) {
      console.debug('AuthContext | handleRegister(): ', error);
    }
  }

  async function handleLogin(user: User) {
    try {
      const response = await api.post('/user/auth', {
        emailUsuario: user.emailUsuario,
        senhaUsuario: user.senhaUsuario,
      });
      if (response.data.error) {
        console.debug('AuthContext | handleLogin(): ', response.data.error);
        return response.data;
      }
      console.debug(
        'handleLogin | response',
        JSON.stringify(response).substr(0, 200) + '...',
      );

      const loggedUser: User = response.data.user;

      loggedUser.fotoPerfilUsuario =
        loggedUser.fotoPerfilUsuario != null ? 'base64' : null; // Definindo 'base64' porque a imagem é gigante
      loggedUser.signed = true;

      await AsyncStorage.setItem('user', JSON.stringify(loggedUser));
      setUser(loggedUser);

      return { ok: true };
    } catch (error) {
      console.log('AuthContext | handleLogin(): ', error);
    }
  }

  function handleLogout() {
    AsyncStorage.clear();
    setUser({} as User);
  }

  function updateUserProps(userProps: User) {
    setUser(userProps);
  }

  function updateSetupUserProps(setupUserDataProps: SetupUser) {
    setSetupUserData(setupUserDataProps);
  }

  function niceToast(
    type: string,
    title: string | null,
    message?: string | null,
    time?: 3000,
  ) {
    Toast.show({
      type: 'niceToast',
      visibilityTime: time,
      position: 'top',
      props: {
        type,
        title,
        message,
      },
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setupUser,
        handleLogout,
        handleLogin,
        token: '',
        handleRegister,
        updateUserProps,
        updateSetupUserProps,
        emailExists,
        userAvatar,
        niceToast,
      }}>
      <StatusBar backgroundColor="transparent" translucent />
      {children}
      <Toast topOffset={0} config={global.TOAST_CONFIG} />
    </AuthContext.Provider>
  );
};

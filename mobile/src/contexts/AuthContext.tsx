import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

export type User = {
  id: number;
  name: string;
  email: string;
  avatar: string;
  password: string;
  signed: boolean;
};

export interface error {
  error?: string;
  message?: string;
  ok?: boolean;
}

// interface AuthContextType {
//     token: string;
//     user: User,
//     handleLogin(regUser: User): Promise<string>
//     handleRegister(regUser: User): Promise<string>
//     updateUserProps(userProps: User): void
//     handleLogout(): void
// }

interface AuthContextType {
  token: string;
  user: User;
  handleLogin(logUser: User): Promise<error>;
  handleRegister(): Promise<string>;
  updateUserProps(userProps: User): void;
  handleLogout(): void;
  emailExists(email: string): Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const UseAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    (async () => {
      const storagedUser = await AsyncStorage.getItem('user');
      //console.debug('AuthContext | useEffect(): ', storagedUser);

      if (storagedUser) {
        setUser(JSON.parse(storagedUser));
      }
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

  async function handleLogin(logUser: User) {
    try {
      const response = await api.post('/user/auth', {
        emailUsuario: logUser.email,
        senhaUsuario: logUser.password,
      });
        
      if (response.data.error) {
        console.debug('AuthContext | handleLogin(): ', response.data.error);
        return response.data;
      }

      const loginUser: User = response.data.user;
      loginUser.signed = true;
      setUser(loginUser);
      await AsyncStorage.setItem('user', JSON.stringify(loginUser));

      return { ok: true };
    } catch (error) {
      console.log('AuthContext | handleLogin(): ', error);
    }
  }
/* 
  async function handleRegister(regUser: User) {
      try {
          const response = await api.post('/user/create', {
              nomeUsuario: regUser.name,
              emailUsuario: regUser.email,
              senhaUsuario: regUser.password,
          });

          console.debug('AuthContext | handleRegister(): ', response.data);

          if (response.data.error) {
              return response.data.error.toString();
          }

          const newUser: User = response.data.message;
          updateUserProps(newUser);

          await AsyncStorage.setItem('user', JSON.stringify(newUser))
          return '';

      } catch (error) {
          console.debug("Deu erro no Registrar: ", error);
      }
  }

  function handleLogout() {
      AsyncStorage.clear()
      setUser({} as User)
  } */

  async function handleRegister() {
    try {
      const response = await api.post('/user/create', {
        nomeUsuario: user.name,
        emailUsuario: user.email,
        senhaUsuario: user.password,
        fotoPerfilUsuario: user.avatar,
      });

      console.debug('AuthContext | handleRegister(): ', response.data);

      if (response.data.error) {
        return response.data.error.toString();
      }

      const newUser: User = response.data.message;
      updateUserProps(newUser);

      await AsyncStorage.setItem('user', JSON.stringify(newUser));
      return '';
    } catch (error) {
      console.debug('Deu erro no Registrar: ', error);
    }
  }

  function handleLogout() {
    AsyncStorage.clear();
    setUser({} as User);
  }

  function updateUserProps(userProps: User) {
    setUser(userProps);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        handleLogout,
        handleLogin,
        token: '',
        handleRegister,
        updateUserProps,
        emailExists,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

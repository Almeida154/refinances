import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';
import { UseCategorias } from './CategoriesContext';

type User = {
    id: number,
    nomeUsuario: string,
    emailUsuario: string,
    fotoPerfilUsuario: Buffer,
    senhaUsuario: string,
    signed: boolean
}

interface AuthContextType {    
    token: string;
    user: User,

    handleLogin(): Promise<string>
    handleRegister(): Promise<string>
    updateUserProps(userProps: User): void    
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const UseAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User>({} as User);
    const { setupCategorias } = UseCategorias();
    
    async function handleLogin() {
        try {
            const response = await api.post('/user/auth', {
                emailUsuario: user.emailUsuario,
                senhaUsuario: user.senhaUsuario
            });
            
            if( response.data.error) {
                return response.data.error;
            }

            const loginUser: User = response.data.user;
            loginUser.signed = true;
            setUser(loginUser)            
            console.log(user)

            return '';

        } catch (error) {
            console.log("Deu erro no Login:", error);
        }
    }

    async function handleRegister() {
        try {
            const response = await api.post('/user/create', {
                nomeUsuario: user.nomeUsuario,
                emailUsuario: user.emailUsuario,
                senhaUsuario: user.senhaUsuario,
            });

            console.log(response.data);

            if (response.data.error) {           
                return response.data.error.toString();
            }
            
            const newUser: User = response.data.message;
            updateUserProps(newUser);
            await AsyncStorage.setItem('idUser', String(newUser.id));
            return '';

        } catch (error) {
            console.log("Deu erro no Registrar:", error);
        }
    }    

    function updateUserProps(userProps: User) {
        setUser(userProps);
    }

    return (
        <AuthContext.Provider value={{ user, handleLogin, token: '', handleRegister, updateUserProps }}>
            {children}
        </AuthContext.Provider>
    );
}
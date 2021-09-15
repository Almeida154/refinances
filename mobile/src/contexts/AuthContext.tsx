import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

export type User = {
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
    handleLogout(): void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const UseAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User>({} as User);    
    
    async function handleLogin() {
        try {
            const response = await api.post('/user/auth', {
                emailUsuario: user.emailUsuario,
                senhaUsuario: user.senhaUsuario
            });
            
            if( response.data.error) {
                console.log('response.data=' + response.data.error)
                return response.data.error;
            }


            const loginUser: User = response.data.user;
            loginUser.signed = true;
            setUser(loginUser)            
            await AsyncStorage.setItem('user', JSON.stringify(loginUser))

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
            
            await AsyncStorage.setItem('user', JSON.stringify(newUser))
            return '';

        } catch (error) {
            console.log("Deu erro no Registrar:", error);
        }
    }    

    function handleLogout() {
        AsyncStorage.clear()

        setUser({} as User)
    }

    function updateUserProps(userProps: User) {
        setUser(userProps);
    }

    useEffect(() => {
        async function VerifyLogin() {
            const storagedUser = await AsyncStorage.getItem('user')
            console.log(storagedUser)

            if(storagedUser) {
                setUser(JSON.parse(storagedUser))
            }
        }

        VerifyLogin()
    }, [])

    return (
        <AuthContext.Provider value={{ user, handleLogout, handleLogin, token: '', handleRegister, updateUserProps }}>
            {children}
        </AuthContext.Provider>
    );
}
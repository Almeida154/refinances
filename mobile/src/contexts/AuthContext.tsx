import React, { createContext, useContext, useEffect, useState } from 'react';
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
    handleLogin(regUser: User): Promise<string>
    handleRegister(regUser: User): Promise<string>
    updateUserProps(userProps: User): void 
    handleLogout(): void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const UseAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User>({} as User);

    useEffect(() => {
        (async () => {
            const storagedUser = await AsyncStorage.getItem('user')
            console.log(storagedUser)

            if (storagedUser) {
                setUser(JSON.parse(storagedUser))
            }
        })();
    }, []);
    
    async function handleLogin(logUser: User) {
        try {
            const response = await api.post('/user/auth', {
                emailUsuario: logUser.emailUsuario,
                senhaUsuario: logUser.senhaUsuario
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

    async function handleRegister(regUser: User) {
        try {
            const response = await api.post('/user/create', {
                nomeUsuario: regUser.nomeUsuario,
                emailUsuario: regUser.emailUsuario,
                senhaUsuario: regUser.senhaUsuario,
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
    }

    function updateUserProps(userProps: User) {
        setUser(userProps);
    }

    return (
        <AuthContext.Provider value={{ user, handleLogout, handleLogin, token: '', handleRegister, updateUserProps }}>
            {children}
        </AuthContext.Provider>
    );
}
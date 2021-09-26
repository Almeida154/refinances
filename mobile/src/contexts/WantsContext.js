import React, { createContext, useContext, useEffect } from 'react';
import { useState } from 'react/cjs/react.development';

const WantsContext = createContext({
    wants: [
        {
            id: 1,
            quantidade: 0.5,
            descricao: "Mobilidade"
        },
        {
            id: 2,
            quantidade: 0.2,
            descricao: "Entretenimento"
        },
        {
            id: 3,
            quantidade: 0.5,
            descricao: "Diversão"
        },
        {
            id: 4,
            quantidade: 0.5,
            descricao: "Comodo"
        }

    ],

    setWants: (data: Array) => { }
})

export const UseWants = () => useContext(WantsContext);

export const WantsProvider = ({ children }) => {
    const [wants, setWants] = useState(
        [
            {
                id: 1,
                quantidade: 50,
                descricao: "Comida"
            },
            {
                id: 2,
                quantidade: 80,
                descricao: "Comodo"
            },
            {
                id: 3,
                quantidade: 20,
                descricao: "Mobilidade"
            },
            {
                id: 4,
                quantidade: 50,
                descricao: "Entretenimento"
            }
        ])

    return (
        <WantsContext.Provider
            value={{ wants, setWants }}
        >
            { children }
        </WantsContext.Provider>
    )
}
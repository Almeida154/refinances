import React, { createContext, useContext, useEffect } from 'react';
import { useState } from 'react/cjs/react.development';

const ItemsContext = createContext({
    items: [
        {
            id: 1,
            descricao: "Comer fora",
            preco: 60,
            conectaNecessidades: [
                {
                    necessidade: "Comida",
                    index: 1,
                    valor: 30
                },
                {
                    necessidade: "Entretenimento",
                    index: 4,
                    valor: 20
                }
            ]
        },
        {
            id: 2,
            descricao: "Bicicleta",
            preco: 300,
            conectaNecessidades: [
                {
                    necessidade: "Mobilidade",
                    index: 3,
                    valor: 40
                },
                {
                    necessidade: "Entretenimento",
                    index: 4,
                    valor: 25
                },
                {
                    necessidade: "Comodo",
                    index: 2,
                    valor: 10
                }
            ]
        },
        {
            id: 3,
            descricao: "Ir No Shopping",
            preco: 200,
            conectaNecessidades: [
                {
                    necessidade: "Comida",
                    index: 1,
                    valor: 30
                },
                {
                    necessidade: "Entretenimento",
                    index: 4,
                    valor: 40
                }
            ]
        },
        {
            id: 4,
            descricao: "Roupinha no free fire",
            preco: 50,
            conectaNecessidades: [
                {
                    necessidade: "Entretenimento",
                    index: 4,
                    valor: 40
                }
            ]
        },
        {
            id: 5,
            descricao: "Quiosque",
            preco: 40,
            conectaNecessidades: [
                {
                    necessidade: "Comida",
                    index: 1,
                    valor: 20
                },
                {
                    necessidade: "Entretenimento",
                    index: 4,
                    valor: 10
                }
            ]
        },
        {
            id: 6,
            descricao: "Comprar o Assassin's Creed Novo",
            preco: 120,
            conectaNecessidades: [
                {
                    necessidade: "Entretenimento",
                    index: 4,
                    valor: 30
                },
                {
                    necessidade: "Comodo",
                    index: 2,
                    valor: 10
                }
            ]
        },
    ],

    setItems: (data: Array) => { }
})

export const UseItems = () => useContext(ItemsContext)

export const ItemsProvider = ({ children }) => {
    const [items, setItems] = useState([
        {
            id: 1,
            descricao: "Comer fora",
            preco: 60,
            conectaNecessidades: [
                {
                    necessidade: "Comida",
                    index: 1,
                    valor: 30
                },
                {
                    necessidade: "Entretenimento",
                    index: 4,
                    valor: 20
                }
            ]
        },
        {
            id: 2,
            descricao: "Bicicleta",
            preco: 300,
            conectaNecessidades: [
                {
                    necessidade: "Mobilidade",
                    index: 3,
                    valor: 40
                },
                {
                    necessidade: "Entretenimento",
                    index: 4,
                    valor: 25
                },
                {
                    necessidade: "Comodo",
                    index: 2,
                    valor: 10
                }
            ]
        },
        {
            id: 3,
            descricao: "Ir No Shopping",
            preco: 200,
            conectaNecessidades: [
                {
                    necessidade: "Comida",
                    index: 1,
                    valor: 30
                },
                {
                    necessidade: "Entretenimento",
                    index: 4,
                    valor: 40
                }
            ]
        },
        {
            id: 4,
            descricao: "Roupinha no free fire",
            preco: 50,
            conectaNecessidades: [
                {
                    necessidade: "Entretenimento",
                    index: 4,
                    valor: 40
                }
            ]
        },
        {
            id: 5,
            descricao: "Quiosque",
            preco: 40,
            conectaNecessidades: [
                {
                    necessidade: "Comida",
                    index: 1,
                    valor: 20
                },
                {
                    necessidade: "Entretenimento",
                    index: 4,
                    valor: 10
                }
            ]
        },
        {
            id: 6,
            descricao: "Comprar o Assassin's Creed Novo",
            preco: 120,
            conectaNecessidades: [
                {
                    necessidade: "Entretenimento",
                    index: 4,
                    valor: 30
                },
                {
                    necessidade: "Comodo",
                    index: 2,
                    valor: 10
                }
            ]
        },
    ])

    return (
        <ItemsContext.Provider
            value={{ items, setItems }}
        >
            { children }
        </ItemsContext.Provider>
    )
}
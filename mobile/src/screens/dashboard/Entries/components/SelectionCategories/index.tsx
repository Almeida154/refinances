import React, { useEffect, useState } from 'react'
import {Text} from 'react-native'
import {Categoria, UseCategories} from '../../../../../contexts/CategoriesContext'

import {Searchbar} from 'react-native-paper'

import {
    Container,
    Header
} from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SelectionCategorias: React.FC = () => {
    const [search, setSearch] = useState('')
    
    const {categorias, loading, handleReadByUserCategorias} = UseCategories()

    useEffect(() => {

    }, [search])

    useEffect(() => {
        async function loadCategorias() {
            const getUser = await AsyncStorage.getItem('user')
            const idUser = JSON.parse(getUser == null ? '{}' : getUser).id
            handleReadByUserCategorias(idUser, 'despesa')
        }

        loadCategorias()
    }, [])

    return (
        <Container>
            <Header>
                <Searchbar 
                   placeholder="Type Here..."
                   onChangeText={setSearch}
                   value={search}
                />

                {loading
                    &&
                    <Text>Carregando</Text>}
            </Header>
        </Container>
    )
}

export default SelectionCategorias
import React, { useEffect, useState } from 'react'
import {Text} from 'react-native'
import {Categoria, UseCategories} from '../../../../../contexts/CategoriesContext'

import {Searchbar} from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome'

import {
    Container,
    Header,
    Body,
    ListaCategorias,

    ContainerItem,
    NomeItem,
    Separator,

    BotaoAdicionarCategoria,
    LabelAdicionarCategoria
} from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {
    CustomPicker,
    FieldTemplateSettings,
    OptionTemplateSettings
} from 'react-native-custom-picker'

const RenderOption = (settings: OptionTemplateSettings) => {
    const { item, getLabel } = settings

    return (
        <ContainerItem>
            <Icon size={24} name="dollar"/>
            <NomeItem >{getLabel(item)}</NomeItem>

            <Separator />
        </ContainerItem>
    )
}

type PropsRenderHeader = {
    search: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

const RenderHeader = ({search, setSearch}: PropsRenderHeader) => {    
    return (
        <Searchbar 
            placeholder="Type Here..."
            onChangeText={setSearch}
            value={search}
        />
    )
}

const RenderFooter = () => {    
    return (
        <BotaoAdicionarCategoria>
            <LabelAdicionarCategoria>Adicionar Categoria</LabelAdicionarCategoria>
        </BotaoAdicionarCategoria>
    )
}


type PropsSelectionCategorias = {
    tipoCategoria: string,
    categoria: string,
    setCategoria: React.Dispatch<React.SetStateAction<string>>
}

const SelectionCategorias = ({tipoCategoria, categoria, setCategoria}: PropsSelectionCategorias) => {        
    const [search, setSearch] = useState('') 

    const {categorias, loading, handleReadByUserCategorias} = UseCategories()

    

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

            {
                console.log("Categorias: ", categorias)
            }
            <CustomPicker 
                placeholder="Selecione a categoria para esse lançamento"
                options={categorias}
                getLabel={item => item.nomeCategoria}
                optionTemplate={RenderOption}
                headerTemplate={() => <RenderHeader search={search} setSearch={setSearch} />}
                footerTemplate={RenderFooter}
            />
{/*             
                

                {loading
                    &&
                    <Text>Carregando</Text>} */}
            
            
        </Container>
    )
}

export default SelectionCategorias
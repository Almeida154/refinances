import React, { useEffect, useState } from 'react'
import {Alert, Text} from 'react-native'
import {CategoriaConta, UseCategoriasConta} from '../../../../../../../contexts/CategoriesAccountContext'

import {Searchbar} from 'react-native-paper'

import Icon from '../../../../../../../helpers/gerarIconePelaString'

import retornarIdDoUsuario from '../../../../../../../helpers/retornarIdDoUsuario'

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

import {HomeAccountStack} from '../../../../../../../@types/RootStackParamApp'

import {
    CustomPicker,
    FieldTemplateSettings,
    OptionTemplateSettings
} from 'react-native-custom-picker'
import { StackNavigationProp } from '@react-navigation/stack'


type PropsSelectionCategorias = {
    setCategoriaConta: React.Dispatch<React.SetStateAction<string>>,
    navigation: StackNavigationProp<HomeAccountStack, "CreateAccount">,    
}

const RenderOption = (settings: OptionTemplateSettings) => {
    const { item, getLabel } = settings

    return (
        <ContainerItem>
            <Icon size={24} stringIcon={item.iconeCategoryConta} color={'red'}/>
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


type PropsRenderFooter = {
    navigation: StackNavigationProp<HomeAccountStack, "CreateAccount">,    
}

const RenderFooter = ({navigation}: PropsRenderFooter) => {    
    return (
        <BotaoAdicionarCategoria>
            <LabelAdicionarCategoria>Adicionar Categoria</LabelAdicionarCategoria>
        </BotaoAdicionarCategoria>
    )
}



const SelectionCategorias = ({setCategoriaConta, navigation}: PropsSelectionCategorias) => {        
    const {categoriasConta, handleReadByUserCategoriesAccount} = UseCategoriasConta()    

    const [search, setSearch] = useState('') 
    const [categoriasAtual, setCategoriasAtual] = useState([] as CategoriaConta[])
    
    useEffect(() => {
        async function loadCategorias() {
            
            handleReadByUserCategoriesAccount(await retornarIdDoUsuario())
        }

        loadCategorias()
    }, [])

    useEffect(() => {
        setCategoriasAtual(categoriasConta)
    }, [categoriasConta])

    useEffect(() => {
        if(search == '') {
            setCategoriasAtual(categoriasConta)
        } else {
            const aux: CategoriaConta[] = []

            categoriasConta.map((item, index) => {
                if(item.descricaoCategoryConta.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !=  -1) {
                    aux.push(item)
                }
            })

            setCategoriasAtual(aux)
        }
    }, [search])

    

    return (
        <Container>

            
            <CustomPicker 
                placeholder={!categoriasAtual ? "Carregando" : "Selecione a categoria para esse lançamento" }
                options={!categoriasAtual  ? [{}] : categoriasAtual}
                getLabel={item => item.descricaoCategoryConta}
                optionTemplate={RenderOption}
                headerTemplate={() => <RenderHeader search={search} setSearch={setSearch} />}
                footerTemplate={() => <RenderFooter navigation={navigation} />}                
                maxHeight={400}
                modalStyle={{minHeight: 400}}
                onValueChange={value => {
                    setCategoriaConta(value.descricaoCategoryConta)
                }}
            />
        </Container>
    )
}

export default SelectionCategorias
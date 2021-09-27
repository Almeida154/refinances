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

import {FormLancamentoStack} from '../../../../../@types/RootStackParamApp'

import {
    CustomPicker,
    FieldTemplateSettings,
    OptionTemplateSettings
} from 'react-native-custom-picker'
import { StackNavigationProp } from '@react-navigation/stack'


type PropsSelectionCategorias = {
    tipoCategoria: string,
    categoria: string,
    setCategoria: React.Dispatch<React.SetStateAction<string>>,
    navigation: StackNavigationProp<FormLancamentoStack, "Main">,    
}

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

type PropsRenderFooter = {
    navigation: StackNavigationProp<FormLancamentoStack, "Main">,    
    tipoCategoria: string
}


const RenderFooter = ({navigation, tipoCategoria}: PropsRenderFooter) => {    
    return (
        <BotaoAdicionarCategoria>
            <LabelAdicionarCategoria onPress={() => navigation.navigate('AddCategory', {
                tipoCategoria
            })}>Adicionar Categoria</LabelAdicionarCategoria>
        </BotaoAdicionarCategoria>
    )
}



const SelectionCategorias = ({tipoCategoria, categoria, navigation}: PropsSelectionCategorias) => {        
    const {categorias, loading, handleReadByUserCategorias} = UseCategories()    

    const [search, setSearch] = useState('') 
    const [categoriasAtual, setCategoriasAtual] = useState([] as Categoria[])
    
    useEffect(() => {
        async function loadCategorias() {
            const getUser = await AsyncStorage.getItem('user')
            const idUser = JSON.parse(getUser == null ? '{}' : getUser).id
            handleReadByUserCategorias(idUser, tipoCategoria)
        }

        loadCategorias()
    }, [])

    useEffect(() => {
        setCategoriasAtual(categorias)
    }, [categorias])

    useEffect(() => {
        if(search == '') {
            setCategoriasAtual(categorias)
        } else {
            const aux: Categoria[] = []

            categorias.map((item, index) => {
                if(item.nomeCategoria.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !=  -1) {
                    aux.push(item)
                }
            })

            setCategoriasAtual(aux)
        }
    }, [search])
    return (
        <Container>

            {
                console.log("Categorias: ", categoriasAtual)
            }
            {
                console.log(loading)
            }
            <CustomPicker 
                placeholder={loading ? "Carregando" : "Selecione a categoria para esse lançamento" }
                options={loading ? [{}] : categoriasAtual}
                getLabel={item => item.nomeCategoria}
                optionTemplate={RenderOption}
                headerTemplate={() => <RenderHeader search={search} setSearch={setSearch} />}
                footerTemplate={() => <RenderFooter navigation={navigation} tipoCategoria={tipoCategoria}/>}                
                maxHeight={400}
                modalStyle={{minHeight: 400}}
            />
{/*             
                

                {loading
                    &&
                    <Text>Carregando</Text>} */}
            
            
        </Container>
    )
}

export default SelectionCategorias
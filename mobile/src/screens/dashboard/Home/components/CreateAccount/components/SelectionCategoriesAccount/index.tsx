import React, { useEffect, useState, useRef } from 'react'
import {Alert, Image, TextInput} from 'react-native'
import {CategoriaConta, UseCategoriasConta} from '../../../../../../../contexts/CategoriesAccountContext'

import retornarIdDoUsuario from '../../../../../../../helpers/retornarIdDoUsuario'

import {Searchbar} from 'react-native-paper'

import Icon from '../../../../../../../helpers/gerarIconePelaString'
import InputText from '../../../../../../../components/InputText'

import {
    Container,
    Header,
    Body,
    ListaCategorias,
    ContainerItem,
    NomeItem,
    SectionImage,
    BotaoAdicionarCategoria,
    LabelAdicionarCategoria
} from './styles'

import {HomeAccountStack} from '../../../../../../../@types/RootStackParamApp'

import {
    CustomPicker,
    FieldTemplateSettings,
    OptionTemplateSettings
} from 'react-native-custom-picker'
import { StackNavigationProp } from '@react-navigation/stack'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { StackActions } from '@react-navigation/native'
import { UseDadosTemp } from '../../../../../../../contexts/TemporaryDataContext'

import { fonts, colors } from '../../../../../../../styles'


const RenderOption = (settings: OptionTemplateSettings) => {
    const { item, getLabel } = settings
    return (
        <ContainerItem>
            {
                item.iconeCategoryConta.indexOf("https://") != -1 ?
                
                <Image source={{uri: item.iconeCategoryConta, 
                    width: 25, 
                    height: 25,
                }}/> :
                <SectionImage>
                    <Icon size={25} color='gray' stringIcon={item.iconeCategoryConta}/>
                </SectionImage>
            }
            <NomeItem >{getLabel(item)}</NomeItem>

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
            placeholder="Pesquisar..."
            onChangeText={setSearch}
            value={search}
            style={{fontFamily: fonts.familyType.semiBold,
            padding: '2%'}}
        />
    )
}

const RenderFooter = () => {    
    const {navigation} = UseDadosTemp()
    return (
        <BotaoAdicionarCategoria>
            <LabelAdicionarCategoria 
                onPress={() => navigation.dispatch(
                    StackActions.replace("StackAccount", 
                    {screen: 'AddCategoryAccount'}
                ))}>Nova categoria
            </LabelAdicionarCategoria>
        </BotaoAdicionarCategoria>
    )
}


type PropsSelectionCategorias = {
    setCategoriaConta: React.Dispatch<React.SetStateAction<CategoriaConta | null>>,
    categoriaConta: CategoriaConta | null
}

const SelectionCategoriesAccount = ({categoriaConta, setCategoriaConta}: PropsSelectionCategorias) => {        
    const {categoriasConta, handleReadByUserCategoriesAccount} = UseCategoriasConta()    

    const [search, setSearch] = useState('') 
    const [categoriasAtual, setCategoriasAtual] = useState([] as CategoriaConta[])
    
    const PickerRef = useRef<CustomPicker>(null)

    useEffect(() => {
        async function loadCategorias() {            
            handleReadByUserCategoriesAccount(await retornarIdDoUsuario())
        }

        loadCategorias()
    }, [])

    useEffect(() => {
        setCategoriasAtual(categoriasConta == null ? [] : categoriasConta)
    }, [categoriasConta])

    useEffect(() => {
        if(search == '') {
            setCategoriasAtual(categoriasConta == null ? [] : categoriasConta)
        } else if(categoriasConta != null){
            const aux: CategoriaConta[] = []

            categoriasConta.map((item: CategoriaConta) => {
                if(item.descricaoCategoryConta.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !=  -1) {
                    aux.push(item)
                }
            })

            setCategoriasAtual(aux)
        }
    }, [search])

    const onOpen = () => {
        PickerRef.current?.showOptions()
    }

    
    return (
        <Container>
            <InputText 
                onPress={onOpen}
                label="Categoria"
                value={categoriaConta == null ? '' : categoriaConta.descricaoCategoryConta}
                placeholder="Selecione uma categoria conta"
                editable={false}
                showClearIcon={false}
                onClear={() => {}}
            />

            {
                categoriasConta &&   
                <CustomPicker 
                    ref={PickerRef}
                    placeholder={"Selecione a categoria para esse lançamento" }
                    options={categoriasAtual}
                    getLabel={(item: CategoriaConta) => item.descricaoCategoryConta}
                    optionTemplate={RenderOption}
                    headerTemplate={() => <RenderHeader search={search} setSearch={setSearch} />}
                    footerTemplate={() => <RenderFooter />}                
                    maxHeight={400}
                    modalStyle={{minHeight: 400}}
                    onValueChange={(value: CategoriaConta) => {
                        setCategoriaConta(value)
                    }}
                    style={{display: 'none', 
                    borderRadius: 20}}
                />
            }
            
        </Container>
    )
}

export default SelectionCategoriesAccount
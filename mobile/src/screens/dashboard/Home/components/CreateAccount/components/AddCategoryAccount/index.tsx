import React, { useEffect, useState, useRef } from 'react'
import {HomeAccountStack} from '../../../../../../../@types/RootStackParamApp'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import {Modalize} from 'react-native-modalize'

import {TouchableOpacity, Text, FlatList, Image} from 'react-native'

import {UseCategoriasConta, CategoriaConta} from '../../../../../../../contexts/CategoriesAccountContext'

import retornarIdDoUsuario from '../../../../../../../helpers/retornarIdDoUsuario'

import ModalizeStyled from '../../../../../../../components/Modalize'

import {
    Container,
    Form,
    InputControl,
    LabelForm,
    TextInputAdd,
    ButtonAdd,
    TextButton,
    BodyModalize,
    ButtonPress,
    Circle,
    RowColor

} from './styles'

import AsyncStorage from '@react-native-async-storage/async-storage';

type PropsNavigation = {
    navigation: StackNavigationProp<HomeAccountStack, "AddCategoryAccount">,    
    route: RouteProp<HomeAccountStack, "AddCategoryAccount">,    
    
}

type PropsRenderItem = {
    item: string
    setSelected: (item: string) => void
}

const RenderItemColor = ({item, setSelected}: PropsRenderItem) => {
    return (
        <ButtonPress onPress={() => setSelected(item)}>
            <Circle style={{backgroundColor: item}}>
                
            </Circle>
        </ButtonPress>
    )
}

const RenderItemIcon = ({item, setSelected}: PropsRenderItem) => {
    return (
        <ButtonPress onPress={() => setSelected(item)}>
            <Circle style={{backgroundColor: '#fff'}}>
                <Image source={{uri: 'https://logodownload.org/wp-content/uploads/2014/02/caixa-logo.jpg', height: 50, width: 50}}/>                
            </Circle>
        </ButtonPress>
    )
}

const AddCategoryAccount = ({route, navigation}: PropsNavigation) => {
    const {handleAdicionarCategoriaConta} = UseCategoriasConta()

    const modalizeColor = useRef<Modalize>(null);
    const modalizeIcon = useRef<Modalize>(null);

    const [descricao, setDescricao] = useState('')
    const [cor, setCor] = useState('')
    const [icone, setIcone] = useState('')

    const onOpenModalizeColor = () => {
        modalizeColor.current?.open()
    }

    const onOpenModalizeIcon = () => {
        modalizeIcon.current?.open()
    }

    const dataColors = ['#DF5C5C', '#D5DF5C', '#5C89DF','#96DF5C' , '#525252', '#E3E3E3', '#DF5CD2', '#00c3ff', '#3d0320', '#c8f307', '#b34242', '#46df09']

    const dataIcons = ['CategoryConta/banco-amazonia', 'CategoryConta/banco-brasil', 'CategoryConta/banco-brasilia', 'CategoryConta/banco-nordeste', 'CategoryConta/banco-real', 'CategoryConta/bank-boston', 'CategoryConta/banestes']

    async function handleSubmit() {
        

        const novaCategoria = {
           descricaoCategoryConta: descricao,
           iconeCategoryConta: icone,
           userCategoryConta: await retornarIdDoUsuario()
        } as CategoriaConta        

        console.log(novaCategoria)
        handleAdicionarCategoriaConta(novaCategoria)
        navigation.goBack()
    }

    function setColorSelected (item2: string){
        console.log(item2)

        setCor(item2)

        modalizeColor.current?.close()
    }

    function setIconSelected(item2: string) {
        setIcone(item2)

        modalizeIcon.current?.close()
    }

    return (
        <Container>            
            <Form>
                <InputControl>
                <LabelForm>Descrição</LabelForm>
                    <TextInputAdd 
                        placeholder="Descrição da categoria" 
                        placeholderTextColor="#ddd"
                        value={descricao}
                        onChangeText={setDescricao}
                        
                    />                    
                </InputControl>

                <InputControl>
                <LabelForm>Cor da categoria</LabelForm>
                    <TouchableOpacity onPress={onOpenModalizeColor}>
                        <TextInputAdd 
                            placeholder="Selecione uma cor"
                            placeholderTextColor="#ddd"
                            value={cor}
                            onChangeText={setCor}
                            editable={false}
                            style={cor == '' ? {color: '#000'} : {color: cor}}
                        />              
                    </TouchableOpacity>                      
                </InputControl>

                <InputControl>
                    <TouchableOpacity onPress={onOpenModalizeIcon}>
                        <LabelForm>Ícone</LabelForm>
                            <TextInputAdd 
                                placeholder="Selecione um ícone"
                                placeholderTextColor="#ddd"
                                value={icone}
                                onChangeText={setIcone}
                                editable={false}
                            />       
                    </TouchableOpacity>                                     
                </InputControl>
                <ButtonAdd onPress={handleSubmit}>
                    <TextButton>Adicionar</TextButton>
                </ButtonAdd>

            </Form>

            <Modalize                 
                ref={modalizeColor} 
                modalHeight={300}
                scrollViewProps={{contentContainerStyle: {height: '100%'}}}                
            >
                <BodyModalize >
                    <FlatList 
                        data={dataColors}
                        renderItem={({item}) => <RenderItemColor item={item} setSelected={setColorSelected}/>}
                        keyExtractor={(item) => item}
                        numColumns={4}
                    />               
                </BodyModalize>
            </Modalize>

            <Modalize                 
                ref={modalizeIcon} 
                modalHeight={300}
                scrollViewProps={{contentContainerStyle: {height: '100%'}}}                
            >
                <BodyModalize >
                    <FlatList 
                        data={dataIcons}
                        renderItem={({item}) => <RenderItemIcon item={item} setSelected={setIconSelected}/>}
                        keyExtractor={(item) => item}
                        numColumns={4}
                    />               
                </BodyModalize>
            </Modalize>                
        </Container>
    )
}

export default AddCategoryAccount
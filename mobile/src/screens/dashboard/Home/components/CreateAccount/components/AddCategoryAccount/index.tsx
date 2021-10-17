import React, { useEffect, useState, useRef } from 'react'
import {HomeAccountStack} from '../../../../../../../@types/RootStackParamApp'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import {Modalize} from 'react-native-modalize'

import {TouchableOpacity, Text, FlatList, Image} from 'react-native'

import {UseCategoriasConta, CategoriaConta} from '../../../../../../../contexts/CategoriesAccountContext'

import retornarIdDoUsuario from '../../../../../../../helpers/retornarIdDoUsuario'

import ModalizeStyled from '../../../../../../../components/Modalize'

import Icon from '../../../../../../../helpers/gerarIconePelaString'

import InputText from '../InputTextForCategory'

import {
    Container,
    Form,
    InputControl,
    LabelForm,
    SectionIcon,
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
                <Image source={{uri:  item, height: 50, width: 50}}/>                
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

    const dataIcons = ['https://logodownload.org/wp-content/uploads/2014/02/caixa-logo.jpg', 'https://play-lh.googleusercontent.com/1-aNhsSPNqiVluwNGZar_7F5PbQ4u1zteuJ1jumnArhe8bfYHHaVwu4aVOF5-NAmLaA', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banco_Ita%C3%BA_logo.svg/1200px-Banco_Ita%C3%BA_logo.svg.png', 'https://projeto-cdn.infra.grancursosonline.com.br/basa.png', 'https://t2.tudocdn.net/354716?w=1200', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg1QN1uIngc6pkX2Zg5Mn_mvZ501sC6x0luIz9TQ1W1jUi8zTSCiwSOMmJKs-uNiu6uXw&usqp=CAU', 'https://play-lh.googleusercontent.com/FDCnEZ5wKIYucB6n63jQC8tymfmoaNtM2GScjDP5fuKzG4bjXqWshysyfDvxccVYwg', 'https://seeklogo.com/images/B/Banco_Safra-logo-517D130E32-seeklogo.com.png', 'data:image/png;base64,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']

    type PropsComponentShowColor = {
        stringColor: string
    }

    const ComponentShowColor = ({stringColor}: PropsComponentShowColor) => {
        return (
            <SectionIcon>
                <Circle />
            </SectionIcon>
        )
    }
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
                    <InputText 
                        label="Descrição"
                        placeholder="Descrição da categoria" 
                        placeholderTextColor="#ddd"
                        value={descricao}
                        onChangeText={setDescricao}
                        onClear={() => {}}
                        showClearIcon={false}
                    />                    
                                
                        <InputText 
                            label="Cor"
                            placeholder="Selecione uma cor"
                            placeholderTextColor="#ddd"
                            value={cor}
                            onChangeText={setCor}
                            editable={false}                            
                            onClear={() => {}}
                            showClearIcon={false}
                            onPress={onOpenModalizeColor}
                        />              

        
                    <InputText 
                        label="Ícone"
                        placeholder="Selecione um ícone"
                        placeholderTextColor="#ddd"
                        value={icone}
                        onChangeText={setIcone}                        
                        showClearIcon={false}
                        onPress={onOpenModalizeIcon}
                        // editable={false}
                    />       
                                            
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
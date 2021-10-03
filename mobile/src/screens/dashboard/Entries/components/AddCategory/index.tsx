import React, { useEffect, useState, useRef } from 'react'
import {FormLancamentoStack} from '../../../../../@types/RootStackParamApp'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import {Modalize} from 'react-native-modalize'

import {TouchableHighlight, Text} from 'react-native'

import {UseCategories, Categoria} from '../../../../../contexts/CategoriesContext'

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
    navigation: StackNavigationProp<FormLancamentoStack, "AddCategory">,    
    route: RouteProp<FormLancamentoStack, "AddCategory">,    
    
}

const AddCategory = ({route, navigation}: PropsNavigation) => {
    const {handleAdicionar, loading, categorias} = UseCategories()

    const modalizeRef = useRef<Modalize>(null);

    const [nome, setNome] = useState('')
    const [cor, setCor] = useState('')
    const [icone, setIcone] = useState('')

    const onOpen = () => {
        modalizeRef.current?.open()
    }

    const {tipoCategoria} = route.params

    navigation.setOptions({title: `Nova categoria de ${tipoCategoria}`})

    //Se ele detectar que a categoria foi adicionada, voltar lá pra seleção de categorias
    // useEffect(() => {
    //     navigation.goBack()
    // }, [loading])
    
    const dataColors = [['#DF5C5C', '#D5DF5C', '#5C89DF'], ['#96DF5C', '#525252', '#E3E3E3'], ['#DF5CD2']]

    async function handleSubmit() {
        const getUser = await AsyncStorage.getItem('user')
        const idUser = JSON.parse(getUser == null ? '{id: 0}' : getUser).id

        const novaCategoria = {
            essencial: false,
            nomeCategoria: nome,
            tetoDeGastos: 0,
            tipoCategoria,
            userCategoria: idUser
        } as Categoria        

        console.log(novaCategoria)
        handleAdicionar(novaCategoria)
        navigation.goBack()
    }

    function setColorSelected() {

    }

    return (
        <Container>            
            <Form>
                <InputControl>
                <LabelForm>Nome</LabelForm>
                    <TextInputAdd 
                        placeholder="Nome da categoria" 
                        placeholderTextColor="#ddd"
                        value={nome}
                        onChangeText={setNome}
                    />                    
                </InputControl>

                <InputControl>
                <LabelForm>Cor da categoria</LabelForm>
                <TouchableHighlight onPress={onOpen}>
                    <TextInputAdd 
                        placeholder="Selecione uma cor"
                        placeholderTextColor="#ddd"
                        value={cor}
                        onChangeText={setCor}
                        editable={false}
                    />              
                </TouchableHighlight>                      
                </InputControl>

                <InputControl>
                <LabelForm>Ícone</LabelForm>
                    <TextInputAdd 
                        placeholder="Selecione um ícone"
                        placeholderTextColor="#ddd"
                        value={icone}
                        onChangeText={setIcone}
                    />                                            
                </InputControl>
                <ButtonAdd onPress={handleSubmit}>
                    <TextButton>Adicionar</TextButton>
                </ButtonAdd>

            </Form>

            <Modalize 
            ref={modalizeRef}
            modalHeight={300}>
                <BodyModalize>
                {
                    dataColors.map((item, index) => {
                        return (
                            <RowColor>
                                {
                                    item.map((item2, index2) => {
                                        return (
                                            <ButtonPress onPress={() => setColorSelected(item2)}>
                                                <Circle style={{backgroundColor: item2}}>
                                                    
                                                </Circle>
                                            </ButtonPress>
                                        )
                                    })
                                }
                            </RowColor>
                        )
                    })
                }
                </BodyModalize>
            </Modalize>
        </Container>
    )
}

export default AddCategory
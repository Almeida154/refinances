import React, { useEffect, useState } from 'react'
import {FormLancamentoStack} from '../../../../../@types/RootStackParamApp'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import {UseCategories, Categoria} from '../../../../../contexts/CategoriesContext'

import {
    Container,
    Form,
    InputControl,
    LabelForm,
    TextInputAdd,
    ButtonAdd,
    TextButton,

} from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage';

type PropsNavigation = {
    navigation: StackNavigationProp<FormLancamentoStack, "AddCategory">,    
    route: RouteProp<FormLancamentoStack, "AddCategory">,    
    
}

const AddCategory = ({route, navigation}: PropsNavigation) => {
    const {handleAdicionar, loading, categorias} = UseCategories()

    const [nome, setNome] = useState('')
    const [cor, setCor] = useState('')
    const [icone, setIcone] = useState('')


    const {tipoCategoria} = route.params

    navigation.setOptions({title: `Nova categoria de ${tipoCategoria}`})

    //Se ele detectar que a categoria foi adicionada, voltar lá pra seleção de categorias
    // useEffect(() => {
    //     navigation.goBack()
    // }, [loading])
    
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
                    <TextInputAdd 
                        placeholder="Selecione uma cor"
                        placeholderTextColor="#ddd"
                        value={cor}
                        onChangeText={setCor}
                    />                                    
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

        </Container>
    )
}

export default AddCategory
import React, { useEffect, useState, useRef } from 'react'
import {HomeAccountStack} from '../../../../../../../@types/RootStackParamApp'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import {Modalize} from 'react-native-modalize'

import {TouchableOpacity, Text} from 'react-native'

import {UseCategoriasConta, CategoriaConta} from '../../../../../../../contexts/CategoriesAccountContext'

import retornarIdDoUsuario from '../../../../../../../helpers/retornarIdDoUsuario'
import Icon from '../../../../../../../assets/images/svg/login-icon'

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

    const dataColors = [['#DF5C5C', '#D5DF5C', '#5C89DF'], ['#96DF5C', '#525252', '#E3E3E3'], ['#DF5CD2']]

    const dataIcons = [['CategoryConta/banco-amazonia', 'CategoryConta/banco-brasil', 'CategoryConta/banco-brasilia'], ['CategoryConta/banco-nordeste', 'CategoryConta/banco-real', 'CategoryConta/bank-boston'], ['CategoryConta/banestes']]

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

    function setColorSelected(item2: string) {
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

            <Modalize 
            ref={modalizeIcon}
            modalHeight={300}>
                <BodyModalize>
                {
                    dataIcons.map((item, index) => {
                        return (
                            <RowColor>
                                {
                                    item.map((item2, index2) => {
                                        console.log(item2)
                                        return (
                                            <ButtonPress onPress={() => setColorSelected(item2)} style={{margin: 10}}>
                                                <Icon style={{ left: 1, top: '10%' }} height={'20%'} />
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

export default AddCategoryAccount
import React, { useEffect, useState, useRef } from 'react'
import {FormLancamentoStack} from '../../../../../@types/RootStackParamApp'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import {Modalize} from 'react-native-modalize'

import {TouchableOpacity, Text, ToastAndroid} from 'react-native'

import {UseCategories, Categoria} from '../../../../../contexts/CategoriesContext'

import retornarIdDoUsuario from '../../../../../helpers/retornarIdDoUsuario'
import Icon from '../../../../../helpers/gerarIconePelaString'

import {
    Container,
    Form,
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

import InputText from '../../../../../components/InputText'

type PropsNavigation = {
    navigation: StackNavigationProp<FormLancamentoStack, "AddCategory">,    
    route: RouteProp<FormLancamentoStack, "AddCategory">,    
    
}

const AddCategoryAccount = ({route, navigation}: PropsNavigation) => {

    const {tipoCategoria} = route.params

    navigation.setOptions({title: `Nova categoria de ${tipoCategoria}`})

    const {handleAdicionar} = UseCategories()

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

    const dataIcons = [['AntDesign:customerservice', 'AntDesign:creditcard', 'AntDesign:camera'], ['AntDesign:pushpin', 'Entypo:aircraft', 'Entypo:baidu'], ['Entypo:bell', 'Entypo:briefcase', 'Entypo:bug'], ['Entypo:cup', 'Entypo:drink', 'Entypo:flower'], ['Entypo:game-controller', 'Entypo:heart', 'Entypo:leaf'], ['Entypo:key', 'Entypo:music', 'Entypo:clapperboard']]

    async function handleSubmit() {        
        const novaCategoria = {
           nomeCategoria: descricao,
           iconeCategoria: icone,
           tipoCategoria: tipoCategoria,
           userCategoria: await retornarIdDoUsuario(),           
           tetoDeGastos: 0,
           id: -1
        } as Categoria        

        const response = await handleAdicionar(novaCategoria)

        console.debug('handleSubmit() | response', response)

        if(response == '') {
            navigation.goBack()
        } else {
            ToastAndroid.show(response, ToastAndroid.SHORT)
        }
    }

    function setColorSelected(item2: string) {        
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
                    placeholder="Descrição da categoria" 
                    label="Descrição"
                    placeholderTextColor="#ddd"
                    value={descricao}
                    onChangeText={setDescricao}                        
                />                    

            
                <InputText 
                    label="Cor"
                    placeholder="Selecione uma cor"
                    placeholderTextColor="#ddd"
                    value={cor}
                    onChangeText={setCor}
                    editable={false}
                    style={cor == '' ? {color: '#000'} : {color: cor}}
                    onPress={onOpenModalizeColor}
                />              

                <InputText 
                    label="Ícone"
                    placeholder="Selecione um ícone"
                    placeholderTextColor="#ddd"
                    value={icone}
                    onChangeText={setIcone}
                    editable={false}
                    onPress={onOpenModalizeIcon}
                />       
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
                                        return (
                                            <ButtonPress onPress={() => setIconSelected(item2)} style={{margin: 10}}>
                                                
                                                <Icon color="gray" size={60} stringIcon={item2} />
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
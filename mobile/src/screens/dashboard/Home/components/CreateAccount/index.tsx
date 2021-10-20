import React, { useEffect, useRef, useState } from 'react'

import {Text} from 'react-native'

import InputText from '../../../../../components/InputText'

import Button from '../../../../../components/Button'
import {Conta, UseContas} from '../../../../../contexts/AccountContext'
import retornarIdDoUsuario from '../../../../../helpers/retornarIdDoUsuario'

import SelectionCategoriesAccount from './components/SelectionCategoriesAccount'

import {
    Container,
    ButtonText,
    
} from './styles'

import fonts from '../../../../../styles/fonts'

import {UseDadosTemp} from '../../../../../contexts/TemporaryDataContext'
import {CategoriaConta} from '../../../../../contexts/CategoriesAccountContext'

import { TouchableOpacity } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/core';
import { HomeAccountStack } from '../../../../../@types/RootStackParamApp';

type PropsCreateAccount = {
    navigation: StackNavigationProp<HomeAccountStack, "CreateAccount">
}

const CreateAccount = ({navigation}: PropsCreateAccount) => {
    const {handleAdicionarConta} = UseContas()
        

    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')    
    const [categoriaConta, setCategoriaConta] = useState<null | CategoriaConta>(null)    

    
    async function handleCreateAccount() {
        const newConta = {
            descricao: description,
            categoryConta: categoriaConta?.descricaoCategoryConta,
            saldoConta: parseFloat(value),
            userConta: await retornarIdDoUsuario()
        } as Conta

        handleAdicionarConta(newConta)
        
        navigation.goBack()
    }

    return (
        <Container>

        <Text 
         style={{marginBottom: '2%', 
         marginTop: '15%',
         fontSize: 20,
         color: '#292929',
         fontFamily: fonts.familyType.black
         }}>Bem vindo à criação de suas contas!</Text>

        <Text style={{marginBottom: '10%', 
         fontSize: 15,
         fontFamily: fonts.familyType.regular,
         color: '#292929'}}>Aqui você adiciona outras contas além da sua principal, como a de outros bancos por exemplo.</Text>
            
            <InputText 
                onChangeText={setDescription}
                value={description}
                label="Descrição"
                placeholder="Descrição de sua nova conta"
                showClearIcon={false}
                onClear={() => {
                    setDescription('')
                }}
            />

            <InputText 
                onChangeText={setValue}
                value={value}
                label="Saldo"
                placeholder="Saldo de sua nova conta"
                keyboardType='decimal-pad'

                showClearIcon={false}
                onClear={() => {
                    setValue('')
                }}
            />


            <SelectionCategoriesAccount navigation={navigation} categoriaConta={categoriaConta} setCategoriaConta={setCategoriaConta}/>

            <Button 
                onPress={handleCreateAccount}
                title="Criar"
                color="#444"
                backgroundColor="#ccc"
            />              
        </Container>
    )
}

export default CreateAccount
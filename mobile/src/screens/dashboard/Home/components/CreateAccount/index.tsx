import React, { useState } from 'react'

import InputText from '../../../../../components/InputText'
import Button from '../../../../../components/Button'

import {
    Container,
    ButtonText
} from './styles'
import { useColorScheme } from 'react-native'

const CreateAccount = () => {
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')
    const [color, setColor] = useState('')
    const [icon, setIcon] = useState('')

    async function handleCreateAccount() {

    }
    return (
        <Container>
            <InputText 
                onChangeText={setDescription}
                value={description}
                label="Descrição"
                placeholder="Descrição de sua nova conta"
            />

            <InputText 
                onChangeText={setValue}
                value={value}
                label="Saldo"
                placeholder="Saldo de sua nova conta"
            />

            <InputText 
                onChangeText={setColor}
                value={color}
                label="Cor"
                placeholder="Cor da borda da categoria"
            />

            <InputText 
                onChangeText={setIcon}
                value={icon}
                label="Ícone"
                placeholder="Ícone de sua nova conta"
            />

            <Button 
                onPress={handleCreateAccount}

            >
                <ButtonText>Criar</ButtonText>
            </Button>
        </Container>
    )
}

export default CreateAccount
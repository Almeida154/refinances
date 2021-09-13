import React from 'react';

import { View, Text, TextInput, TextInputProps } from 'react-native';
import { Container, Input, Label } from './styles';

export const MyInput = (props: TextInputProps, label: '') => {
    return (
        <Container>
            <Label>{label}</Label>
            <Input
                {...props}>
            </Input>
        </Container>
    );
}
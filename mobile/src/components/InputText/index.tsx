import React from 'react';

import { TextInputProps } from 'react-native';
import { 
    Container,
    Input,
    Label
} from './styles';

import { colors, fonts, metrics } from '../../styles';

interface IProps {
    placeholder?: string;
    label?: string;
    lastOne?: boolean;
    value?: string;
    keyboardType?: string;
    autoCapitalize?: string;
    onChangeText: (text: string) => void;
}

const InputText: React.FC<IProps> = (
    { placeholder, label, lastOne, value, keyboardType, autoCapitalize, onChangeText }
    ) => {
    return (
        <Container style={
            lastOne ? {} : { marginBottom: 10 }
        }>
            <Label>{label != undefined ? label : 'Sem label'}</Label>
            <Input
                placeholder={placeholder != undefined ? placeholder : 'Sem placeholder'} 
                placeholderTextColor={colors.platinum}
                value={value}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                onChangeText={text => onChangeText(text)} />
        </Container>
    );
}

export default InputText;
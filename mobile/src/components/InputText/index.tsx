import React from 'react';

import { TextInputProps, StyleSheet } from 'react-native';
import { Container, Input, Label } from './styles';

import { colors } from '../../styles';

interface IProps extends TextInputProps {
  placeholder?: string;
  label?: string;
  lastOne?: boolean;
  value?: string;
  returnKeyType?:
    | 'none'
    | 'done'
    | 'search'
    | 'default'
    | 'go'
    | 'next'
    | 'send'
    | 'previous'
    | 'google'
    | 'join'
    | 'route'
    | 'yahoo'
    | 'emergency-call';
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'visible-password'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'number-pad'
    | 'name-phone-pad'
    | 'decimal-pad'
    | 'twitter'
    | 'web-search'
    | undefined;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  onChangeText: (text: string) => void;
}

const InputText: React.FC<IProps> = ({
  placeholder,
  label,
  lastOne,
  value,
  keyboardType,
  autoCapitalize,
  onChangeText,
}) => {
  return (
    <Container
      style={[
        lastOne ? {} : { marginBottom: 10 },
        {
          shadowColor: 'rgba(0, 0, 0, .4)',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.08,
          shadowRadius: 20,
          elevation: 20,
        },
      ]}>
      <Label>{label != undefined ? label : 'Sem label'}</Label>
      <Input
        placeholder={placeholder != undefined ? placeholder : 'Sem placeholder'}
        placeholderTextColor={colors.platinum}
        value={value}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        onChangeText={text => onChangeText(text)}
      />
    </Container>
  );
};

export default InputText;

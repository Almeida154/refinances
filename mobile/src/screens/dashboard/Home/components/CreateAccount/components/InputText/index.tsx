import React from 'react';

import { TextInputProps } from 'react-native';
import { Container, Input, Label } from './styles';

import { colors } from '../../../../../../../styles';

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
  textContentType?:
    | 'none'
    | 'addressCity'
    | 'addressCityAndState'
    | 'addressState'
    | 'countryName'
    | 'creditCardNumber'
    | 'emailAddress'
    | 'familyName'
    | 'URL'
    | 'fullStreetAddress'
    | 'givenName'
    | 'jobTitle'
    | 'location'
    | 'middleName'
    | 'name'
    | 'namePrefix'
    | 'nickname'
    | 'middleName'
    | 'organizationName'
    | 'postalCode'
    | 'streetAddressLine1'
    | 'streetAddressLine2'
    | 'sublocality'
    | 'telephoneNumber'
    | 'username'
    | 'password'
    | undefined;
  secureTextEntry?: boolean;
  onChangeText: (text: string) => void;
}

const InputText: React.FC<IProps> = ({
  placeholder,
  label,
  lastOne,
  value,
  keyboardType,
  autoCapitalize,
  textContentType,
  secureTextEntry,
  onChangeText,
  editable,
  onPressIn
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
          elevation: 0,
        },
      ]}>
      <Label>{label != undefined ? label : 'Sem label'}</Label>
      <Input
        placeholder={placeholder != undefined ? placeholder : 'Sem placeholder'}
        placeholderTextColor={colors.platinum}
        value={value}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        textContentType={textContentType}
        secureTextEntry={secureTextEntry}
        onChangeText={text => onChangeText(text)}
        editable={editable}
        onPressIn={onPressIn}

      />
    </Container>
  );
};

export default InputText;

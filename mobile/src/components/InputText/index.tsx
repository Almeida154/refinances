import React, { forwardRef, Ref } from 'react';

import { TextInput, TextInputProps } from 'react-native';

import { Container, Input, Label } from './styles';
import { colors } from '../../styles';

interface IProps extends TextInputProps {
  label?: string;
  lastOne?: boolean;
  placeholder?: string;
  colorLabel?: string;
}

const InputText: React.ForwardRefRenderFunction<TextInput, IProps> = (
  { label, lastOne, placeholder, ...rest },
  ref: any,
) => {
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
      ]}
      underlayColor={colors.white}
      onPress={() => ref?.current.focus()}>
      <>
        <Label>{label != undefined ? label : 'Sem label'}</Label>
        <Input
          placeholder={
            placeholder != undefined ? placeholder : 'Sem placeholder'
          }
          placeholderTextColor={colors.platinum}
          ref={ref}
          {...rest}
        />
      </>
    </Container>
  );
};

export default forwardRef(InputText);

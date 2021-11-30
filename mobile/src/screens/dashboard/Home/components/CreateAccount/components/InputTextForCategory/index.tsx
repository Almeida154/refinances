import React, { forwardRef } from 'react';

import { TextInput, TextInputProps } from 'react-native';

import { Container, Writting, IconClean, Input, Label, Error } from './styles';
import { colors } from '../../../../../../../styles';
import { useTheme } from 'styled-components/native'; 
import IonIcons from 'react-native-vector-icons/Ionicons';

interface IProps extends TextInputProps {
  label?: string;
  lastOne?: boolean;
  placeholder?: string;
  colorLabel?: string;
  error?: string | null;
  showClearIcon: boolean;
  onClear?: () => void;
  onPress?: () => void;
  ComponentShow?: any
}

const InputText: React.ForwardRefRenderFunction<TextInput, IProps> = (
  {
    label,
    lastOne,
    placeholder,
    colorLabel,
    error,
    showClearIcon,
    onClear,    
    onPress,
    value,
    ComponentShow,
    ...rest
  },
  ref: any,

) => {
  const theme: any = useTheme()

  return (
    <>
      <Container
        style={[
          lastOne ? {} : { marginBottom: 10 },
          error
            ? {
                marginBottom: 4,
                borderColor: 'rgba(248, 22, 80, .3)',
              }
            : {},
          {
            shadowColor: 'rgba(0, 0, 0, .4)',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.08,
            shadowRadius: 20,
          },
        ]}
        underlayColor={theme.colors.white}
        onPress={onPress}>
        <>
          <Writting>
            <Label style={colorLabel != undefined ? { color: colorLabel } : {}}>
              {label != undefined ? label : 'Sem label'}
            </Label>
            <Input>
              <Label style={{color: theme.colors.platinum}}>{placeholder != undefined && value == '' ? placeholder : value}</Label>
            </Input>
          </Writting>
          <IconClean>
                      
              
            
          </IconClean>
        </>
      </Container>
      {error && <Error>{error}</Error>}
    </>
  );
};

export default forwardRef(InputText);

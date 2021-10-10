import React, { forwardRef, Ref } from 'react';

import { TextInput, TextInputProps } from 'react-native';

import { Container, Writting, IconClean, Input, Label, Error } from './styles';
import { colors, metrics } from '../../styles';

import IonIcons from 'react-native-vector-icons/Ionicons';

interface IProps extends TextInputProps {
  label?: string;
  lastOne?: boolean;
  placeholder?: string;
  colorLabel?: string;
  error?: string | null;
  showClearIcon: boolean;
  onClear: () => void;
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
    ...rest
  },
  ref: any,
) => {
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
            elevation: 20,
          },
        ]}
        underlayColor={colors.white}
        onPress={() => ref?.current.focus()}>
        <>
          <Writting>
            <Label style={colorLabel != undefined ? { color: colorLabel } : {}}>
              {label != undefined ? label : 'Sem label'}
            </Label>
            <Input
              placeholder={
                placeholder != undefined ? placeholder : 'Sem placeholder'
              }
              placeholderTextColor={colors.platinum}
              ref={ref}
              selectionColor={colors.davysGrey}
              {...rest}
            />
          </Writting>
          <IconClean>
            {showClearIcon && (
              <IonIcons
                name="close"
                size={24}
                color={`rgba(82, 82, 82, .1)`}
                onPress={onClear}
              />
            )}
          </IconClean>
        </>
      </Container>
      {error && <Error>{error}</Error>}
    </>
  );
};

export default forwardRef(InputText);

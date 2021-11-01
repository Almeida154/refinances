import React, { forwardRef } from 'react';

import { TextInput, TextInputProps } from 'react-native';

import {
  Container,
  Writting,
  RowAux,
  IconClean,
  Input,
  Label,
  Error,
} from './styles';
import { colors } from '../../styles';

import CurrencyInput from 'react-native-currency-input';

import IonIcons from 'react-native-vector-icons/Ionicons';
import IconByString from '../../helpers/gerarIconePelaString';

export type IconProps = {
  description?: string;
  icon?: string;
  name?: string;
  hex?: string;
};

interface IProps extends TextInputProps {
  label?: string;
  lastOne?: boolean;
  placeholder?: string;
  colorLabel?: string;
  error?: string | null;
  showClearIcon?: boolean;
  icon?: IconProps;
  inputColor?: string;
  onClear?: () => void;
  onPress?: () => void;
}

const InputTextMoney: React.ForwardRefRenderFunction<TextInput, IProps> = (
  {
    label,
    lastOne,
    placeholder,
    colorLabel,
    error,
    showClearIcon,
    icon,
    inputColor,
    onClear,
    onPress,
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
            shadowColor: 'rgba(0, 0, 0, .3)',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.08,
            shadowRadius: 20,
          },
        ]}
        underlayColor={colors.white}
        onPress={onPress != undefined ? onPress : () => ref?.current.focus()}>
        <>
          <Writting>
            <Label style={colorLabel != undefined ? { color: colorLabel } : {}}>
              {label != undefined ? label : 'Sem label'}
            </Label>
            <RowAux>
              {(icon?.hex != null || icon?.icon != null) && (
                <IconByString
                  color={icon.hex ?? colors.davysGrey}
                  stringIcon={icon.icon ?? 'Fontisto:blood-drop'}
                  size={20}
                />
              )}
              <Input
                placeholder={
                  placeholder != undefined ? placeholder : 'Sem placeholder'
                }
                placeholderTextColor={colors.platinum}
                ref={ref}
                selectionColor={colors.davysGrey}
                style={[
                  icon?.hex != null || icon?.icon != null
                    ? { marginLeft: 10 }
                    : {},
                  icon?.hex != null || icon?.icon != null
                    ? { color: icon.hex, opacity: 0.7 }
                    : {},
                  inputColor ? { color: inputColor } : {},
                ]}
                {...rest}
              />
            </RowAux>
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

export default forwardRef(InputTextMoney);
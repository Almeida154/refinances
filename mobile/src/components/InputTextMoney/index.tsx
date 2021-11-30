import React, { forwardRef, useRef } from 'react';

import { TextInput, TextInputProps } from 'react-native';
import { useTheme } from 'styled-components/native'; 
import {
  Container,
  Writting,
  RowAux,
  IconClean,
  Input,
  Label,
  Error,
} from './styles';
import { colors, fonts } from '../../styles';

import IonIcons from 'react-native-vector-icons/Ionicons';
import IconByString from '../../helpers/gerarIconePelaString';
import { heightPixel, widthPixel } from '../../helpers/responsiveness';
import CurrencyInput from 'react-native-currency-input';

export type IconProps = {
  description?: string;
  icon?: string;
  name?: string;
  hex?: string;
};

const inputRef = useRef<TextInput>(null);
interface IProps {
  label?: string;
  lastOne?: boolean;
  placeholder?: string;
  colorLabel?: string;
  error?: string | null;
  showErrorMessage?: boolean;
  showClearIcon?: boolean;
  icon?: IconProps;
  inputColor?: string;
  onClear?: () => void;
  onPress?: () => void;
  value?: number | null;
  setValue?: number | null;
}

const InputTextMoney: React.ForwardRefRenderFunction<TextInput, IProps> = (
  {
    label,
    lastOne,
    placeholder,
    colorLabel,
    error,
    showErrorMessage,
    showClearIcon,
    icon,
    inputColor,
    onClear,
    onPress,
    value,
    setValue,
    ...rest
  },
  ref: any,
) => {
  const theme: any = useTheme()
  return (
    <>
      <Container
        style={[
          lastOne ? {} : { marginBottom: heightPixel(22) },
          error ? { borderColor: '#f816504c' } : {},
          {
            shadowColor: 'rgba(0, 0, 0, .3)',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.08,
            shadowRadius: 20,
            elevation: 20,
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

                <CurrencyInput
                  style={[
                    icon?.hex != null || icon?.icon != null
                      ? { marginLeft: widthPixel(30) }
                      : {},
                    icon?.hex != null || icon?.icon != null
                      ? { color: icon.hex, opacity: 0.7 }
                      : {},
                    inputColor ? { color: inputColor } : {color: colors.davysGrey},
                    {flex: 1,
                      padding: 0,
                      fontFamily: fonts.familyType.bold,
                      fontSize: fonts.size.big,}
                  ]}
                  delimiter="."
                  separator=","
                  precision={2}
                  placeholder={
                    placeholder != undefined ? placeholder : 'R$ 0,00'
                  }
                  maxValue={999999}
                  placeholderTextColor={'#000'}
                  selectionColor={colors.davysGrey}
                  ref={inputRef}
                  value={value}
                  onChangeValue={setValue}
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
      {error && showErrorMessage && <Error>{error}</Error>}
    </>
  );
};

export default forwardRef(InputTextMoney);

import React, { forwardRef } from 'react';

import { TextInput, TextInputProps, Image, Text, View } from 'react-native';
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

import CurrencyInput, { CurrencyInputProps } from 'react-native-currency-input';
import global from '../../global';

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
  showErrorMessage?: boolean;
  showClearIcon?: boolean;
  icon?: IconProps;
  accountInstitution?: string;
  inputColor?: string;
  isCurrencyInput?: boolean;
  onClear?: () => void;
  onPress?: () => void;
}

const InputText: React.ForwardRefRenderFunction<TextInput, IProps> = (
  {
    label,
    lastOne,
    placeholder,
    colorLabel,
    error,
    showErrorMessage,
    showClearIcon,
    icon,
    accountInstitution,
    inputColor,
    isCurrencyInput,
    onClear,
    onPress,
    ...rest
  },
  ref: any,
) => {
  var instituition = global.DEFAULT_ICONS_CATEGORYACCOUNT.find(
    acc => acc.description == accountInstitution,
  );
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
        underlayColor={theme.colors.white}
        onPress={onPress != undefined ? onPress : () => ref?.current.focus()}>
        <>
          <Writting>
            {accountInstitution ? (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Image
                  source={instituition?.icon}
                  style={{
                    width: widthPixel(120),
                    height: widthPixel(120),
                    borderRadius: widthPixel(120 / 2),
                    borderWidth: 3,
                    borderColor: instituition?.accent,
                  }}
                />
                <Label
                  style={{
                    color: theme.colors.davysGrey,
                    fontSize: fonts.size.medium,
                    marginLeft: widthPixel(40),
                  }}>
                  {accountInstitution}
                </Label>
              </View>
            ) : (
              <>
                <Label
                  style={colorLabel != undefined ? { color: colorLabel } : {}}>
                  {label != undefined ? label : 'Sem label'}
                </Label>
                <RowAux>
                  {(icon?.hex != null ||
                    icon?.icon != null ||
                    icon?.icon != undefined) &&
                    (icon?.icon && icon.icon.indexOf('https://') != -1 ? (
                      <Image
                        source={{ uri: icon.icon, height: 20, width: 20 }}
                      />
                    ) : (
                      <IconByString
                        color={icon.hex ?? theme.colors.davysGrey}
                        stringIcon={icon.icon ?? 'Fontisto:blood-drop'}
                        size={20}
                      />
                    ))}
                  {isCurrencyInput ? (
                    // @ts-ignore
                    <CurrencyInput
                      style={{
                        flex: 1,
                        padding: 0,
                        color: theme.colors.davysGrey,
                        fontFamily: fonts.familyType.bold,
                        fontSize: fonts.size.medium,
                        marginTop: heightPixel(-14),
                      }}
                      allowFontScaling
                      delimiter="."
                      separator=","
                      precision={2}
                      placeholder="0,00"
                      maxValue={999999}
                      placeholderTextColor={theme.colors.platinum}
                      selectionColor={theme.colors.davysGrey}
                      {...rest}
                    />
                  ) : (
                    <Input
                      placeholder={
                        placeholder != undefined
                          ? placeholder
                          : 'Sem placeholder'
                      }
                      placeholderTextColor={theme.colors.platinum}
                      ref={ref}
                      selectionColor={theme.colors.davysGrey}
                      style={[
                        icon?.hex != null || icon?.icon != null
                          ? { marginLeft: widthPixel(30) }
                          : {},
                        icon?.hex != null || icon?.icon != null
                          ? { color: icon.hex, opacity: 0.7 }
                          : {},
                        inputColor ? { color: inputColor } : {},
                      ]}
                      {...rest}
                    />
                  )}
                </RowAux>
              </>
            )}
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

export default forwardRef(InputText);

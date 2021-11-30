import React, { useEffect, useState, useRef } from 'react';

// import { TextInput, ToastAndroid, Image } from 'react-native';

// import { RouteProp, StackActions } from '@react-navigation/native';
//import { useTheme } from 'styled-components/native'; 
// // Styles
// import { Container, Form, ColorsContainer, Color, Icon } from './styles';
// import { colors } from '../../../../../../../styles';

// // Components
// import InputText from '../../../../../../../components/InputText';
// import Button from '../../../../../../../components/Button';
// import Modalize from '../../../../../../../components/Modalize';
// import IconByString from '../../../../../../../helpers/gerarIconePelaString';

// import { Modalize as Modal } from 'react-native-modalize';
// import global from '../../../../../../../global';
// import hexToRGB from '../../../../../../../helpers/hexToRgba';
// import {
//   CategoriaConta,
//   UseCategoriasConta
// } from '../../../../../../../contexts/CategoriesAccountContext';
// import { UseDadosTemp } from '../../../../../../../contexts/TemporaryDataContext';
// import retornarIdDoUsuario from '../../../../../../../helpers/retornarIdDoUsuario';
// import Header from '../../../../../components/Header';

// const NewCategoryAccount = ({ route }: { route: any }) => {
//   const { navigation, showNiceToast } = UseDadosTemp();
//   const { handleAdicionarCategoriaConta } = UseCategoriasConta();

//   type ColorProps = {
//     name: string;
//     hex: string;
//   };

//   type IconProps = {
//     description: string;
//     icon: string;
//   };

//   const [name, setName] = useState<string>('Essa é nova');
//   const [nameError, setNameError] = useState<null | string>(null);
//   const nameRef = useRef<TextInput>(null);

//   const [color, setColor] = useState({} as ColorProps);
//   const [colorError, setColorError] = useState<null | string>();
//   const colorRef = useRef<TextInput>(null);

//   const [icon, setIcon] = useState({} as IconProps);
//   const [iconError, setIconError] = useState<null | string>();
//   const iconRef = useRef<TextInput>(null);

//   const [modalizeColors, setModalizeColors] = useState([{}] as ColorProps[]);
//   const colorModalizeRef = useRef<Modal>(null);

//   const [modalizeIcons, setModalizeIcons] = useState([{}] as IconProps[]);
//   const iconModalizeRef = useRef<Modal>(null);

//   const closeColorModalize = () => colorModalizeRef.current?.close();
//   const openColorModalize = () => colorModalizeRef.current?.open();

//   const closeIconModalize = () => iconModalizeRef.current?.close();
//   const openIconModalize = () => iconModalizeRef.current?.open();

//   useEffect(() => {
//     setModalizeColors(global.DEFAULT_COLORS);
//     setModalizeIcons(global.DEFAULT_ICONS_CATEGORYACCOUNT);
//   }, []);

//   const capitalizeFirstLetter = (str: string) =>
//     str.charAt(0).toUpperCase() + str.slice(1);

//   const add = async () => {
//     const newCreatedCategoryConta = {
//       descricaoCategoryConta: capitalizeFirstLetter(name),
//       iconeCategoryConta: icon.icon,
//       id: -1,
//       userCategoryConta: await retornarIdDoUsuario(),
//       corCategoryConta: color.hex
//     } as CategoriaConta;

//     const response = await handleAdicionarCategoriaConta(newCreatedCategoryConta);

//     if (response == '') {
//       showNiceToast('success', 'Categoria Cadastrada com sucesso');

//       navigation.dispatch(
//         StackActions.replace('StackAccount',
//         {screen: 'CreateAccount'})
//         )
//     } else {
//       showNiceToast('error', response);
//     }
//   };
//   const backAction = () => {
//     navigation.dispatch(
//       StackActions.replace('StackAccount', {screen: 'CreateAccount'}),
//     );
//     return true;
//   };
//const theme: any = useTheme()
//   return (
//     <Container>
//       <Header
//         onBackButton={backAction} title="Adicionar Categoria da Conta" isShort={true} />
//       <Form>
//         <InputText
//           label="Nome"
//           colorLabel={theme.colors.davysGrey}
//           inputColor={hexToRGB(theme.colors.davysGrey, 0.7)}
//           placeholder="Biblioteca"
//           value={name}
//           error={nameError}
//           autoCapitalize="none"
//           textContentType="emailAddress"
//           secureTextEntry={false}
//           returnKeyType="next"
//           blurOnSubmit={false}
//           ref={nameRef}
//           showClearIcon={name != ''}
//           onClear={() => {
//             setNameError(null);
//             setName('');
//           }}
//           onChangeText={txt => {
//             setNameError(null);
//             setName(txt);
//           }}
//           onSubmitEditing={() => colorRef.current?.focus()}
//         />
//         <InputText
//           label="Cor"
//           colorLabel={theme.colors.davysGrey}
//           placeholder="Amarelo"
//           value={color.name}
//           error={colorError}
//           autoCapitalize="none"
//           textContentType="emailAddress"
//           secureTextEntry={false}
//           returnKeyType="next"
//           blurOnSubmit={false}
//           ref={colorRef}
//           onSubmitEditing={() => iconRef.current?.focus()}
//           editable={false}
//           onPress={() => {
//             openColorModalize();
//             setColorError(null);
//           }}
//           icon={color}
//         />
//         <InputText
//           label="Ícone"
//           colorLabel={theme.colors.davysGrey}
//           placeholder="Avião"
//           value={icon.description}
//           error={iconError}
//           autoCapitalize="none"
//           textContentType="emailAddress"
//           secureTextEntry={false}
//           blurOnSubmit={false}
//           ref={iconRef}
//           editable={false}
//           onPress={() => {
//             openIconModalize();
//             setIconError(null);
//           }}
//           icon={icon}
//         />
//         <Button
//           onPress={() => add()}
//           title="Adicionar"
//           backgroundColor={theme.colors.platinum}
//           color={theme.colors.davysGrey}
//         />
//       </Form>

//       <Modalize
//         ref={colorModalizeRef}
//         title="Escolha uma cor 🎨"
//         backgroundColor={theme.colors.cultured}>
//         <ColorsContainer horizontal>
//           {modalizetheme.colors.map((color, index) => (
//             <Color
//               key={index}
//               mr={index + 1 != modalizetheme.colors.length}
//               bg={color.hex}
//               onPress={() => {
//                 setColor(color);
//                 closeColorModalize();
//               }}
//             />
//           ))}
//         </ColorsContainer>
//       </Modalize>

//       <Modalize
//         ref={iconModalizeRef}
//         title="Escolha um ícone ✨"
//         backgroundColor={theme.colors.cultured}>
//         <ColorsContainer horizontal>
//           {modalizeIcons.map((icon, index) => (
//             <Icon
//               key={index}
//               mr={index + 1 != modalizetheme.colors.length}
//               onPress={() => {
//                 setIcon(icon);
//                 closeIconModalize();
//               }}>
//                 {
//                     icon.icon && icon.icon.indexOf("https://") != -1 ?
//                     <Image
//                         source={{uri: icon.icon, width: 24, height: 24}}
//                     /> :
//                     <IconByString
//                         color={theme.colors.jet}
//                         size={24}
//                         stringIcon={icon.icon}
//                     />
//                 }
//             </Icon>
//           ))}
//         </ColorsContainer>
//       </Modalize>
//     </Container>
//   );
// };

// export default NewCategoryAccount;

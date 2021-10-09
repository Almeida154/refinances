import React, { useEffect, useState } from 'react';

// React components
import {
  StyleSheet, Text,
  TouchableHighlight, View,
  TextInput, StatusBar,
  Alert, BackHandler,
  SafeAreaView,Image,
  Button
} from 'react-native';

// Navigation | Auth
import { UseAuth } from '../../../../contexts/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RootStackParamAuth from '../../../../@types/RootStackParamAuth';

// Styles
import {
  Container, Boundaries,
  Header, Title, Content,
  NextButton, TextButton,
  ContainerNextButtonContent,
} from './styles';

import ArrowNextGrey from '../../../../assets/images/svg/arrow-next-grey.svg';
import ArrowBackGrey from '../../../../assets/images/svg/arrow-back-grey.svg';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

  
export type PropsNavigation = {
    navigation: StackNavigationProp<RootStackParamAuth, "InserirImage">,    
    route: RouteProp<RootStackParamAuth, "InserirImage">
}

const InserirImagem = ({route, navigation}: PropsNavigation) => {
  const [path, setPath] = useState('');
  const { user, updateUserProps } = UseAuth();
  
  const backAction = () => {
    navigation.goBack();
    const newUser = user;
    newUser.nomeUsuario = '';
    updateUserProps(newUser);
    return true; 
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

   async function setImagem() {
    /* if (path == '') return;
    
    await AsyncStorage.setItem('pathImage', path)
      */
    navigation.navigate('ConfigConta');
  } 
    const [imageUri, setimageUri] = useState({});

    //funcao da camera
    const openCamara = () => {
    const options: CameraOptions = {
      mediaType: 'photo',
      includeBase64: true,    
    };

    //abrir camera
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('Cancelou safado');
        } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        } else {
        const source = {uri: 'data:image/jpeg;base64,' + response.assets[0].base64};
          //source caminho da imagem
          setimageUri(source);
        }
      });
    };
    //funcao da galeria
    const openGallery = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: true,
    };
    //abrir galeria
    launchImageLibrary(options, response => {    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: 'data:image/jpeg;base64,' + response.assets[0].base64};
        //source caminho da imagem
        setimageUri(source);
      }
      });
    }; 
    
  return (
    <Container>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <Boundaries>
        <Header>
          <ArrowBackGrey
            onPress={() => navigation.navigate('InserirNome')}
            height={26}
            style={{ marginLeft: -16, marginBottom: 20 }} />
          <Title>Foto de Perfil</Title>
        </Header>

        <Content>
          <View
          style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}>
            <Image
              source={imageUri}
              //'https://reactnative.dev/img/tiny_logo.png'
              style={{
                height: 150,
                width: 150,
                borderRadius: 100,
                borderWidth: 2,
                borderColor: 'black',
              }}
            />
            <View style={{margin: 80,}}>
                <Button
                    title={'Camera'}
                    onPress={() => {
                    openCamara();
                  }}
                />
                <Button 
                    title={'Escolher da Galeria'}
                    onPress={() => {
                    openGallery();
                }}
                /> 
            </View>
          </View>
        </Content>

        <NextButton onPress={setImagem}>
          <ContainerNextButtonContent>
            <TextButton>Continuar</TextButton>
            <ArrowNextGrey
              onPress={setImagem}
              height={18}/>
          </ContainerNextButtonContent>
        </NextButton>

      </Boundaries>
    </Container>
  );
}

const styles = StyleSheet.create({
  textInput: {    
    width: '100%',
    color: '#000',
    height: 80,    
    opacity: 0.7,
    fontSize: 20,
    fontFamily: 'Nunito-Bold'
  },
  inputControl: {
    width: '100%',
    marginTop: 80
  },
});

export default InserirImagem;
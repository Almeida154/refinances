import React, { useEffect, useState, useRef } from 'react';

import { BackHandler, Text, View } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { Modalize as Modal } from 'react-native-modalize';

import { UseAuth } from '../../../../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RootStackParamAuth from '../../../../@types/RootStackParamAuth';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

// Styles
import {
  Container,
  Content,
  PhotoContainer,
  Pic,
  CameraDetail,
} from './styles';
import { colors, fonts, metrics } from '../../../../styles';

// Icon
import Feather from 'react-native-vector-icons/Feather';

// Components
import Header from '../../components/Header';
import BottomNavigation from '../../components/BottomNavigation';
import Button from '../../../../components/Button';
import Modalize from '../../../../components/Modalize';
import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

export type PropsNavigation = {
  navigation: StackNavigationProp<RootStackParamAuth, 'Photo'>;
  route: RouteProp<RootStackParamAuth, 'Photo'>;
};

const Photo = ({ navigation }: PropsNavigation) => {
  const { user, updateUserProps } = UseAuth();

  const [uri, setUri] = useState(null);
  const modalizeRef = useRef<Modal>(null);

  // useEffect(() => {
  //   console.debug('Name | SetUser(): ', user);
  //   BackHandler.addEventListener('hardwareBackPress', backAction);
  //   return () =>
  //     BackHandler.removeEventListener('hardwareBackPress', backAction);
  // }, []);

  const backAction = () => {
    navigation.goBack();
    return true;
  };

  async function setUser() {
    const newUser = user;
    newUser.password = password;
    updateUserProps(newUser);
    console.debug('Photo | SetUser(): ', user);
    //navigation.navigate('FixedExpenses');
  }

  const openCamera = () => {
    const options: CameraOptions = {
      mediaType: 'photo',
      includeBase64: true,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.debug('Operação cancelada!');
        return;
      }
      if (response.errorCode) {
        console.debug('OpenCamera Error Code: ' + response.errorCode);
        return;
      }
      const source = {
        uri: `data:image/jpeg;base64,${response!.assets[0]!.base64}`,
      };
      setUri(source);
    });
  };

  const openGalery = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: true,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.debug('Operação cancelada!');
        return;
      }
      if (response.errorCode) {
        console.debug('ImagePicker Error Code: ' + response.errorCode);
        return;
      }
      const source = {
        uri: `data:image/jpeg;base64,${response!.assets[0]!.base64}`,
      };
      setUri(source);
    });
  };

  const openModalize = () => {
    modalizeRef.current?.open();
  };

  const closeModalize = () => {
    modalizeRef.current?.close();
  };

  return (
    <Container>
      <Header
        onBackButton={() => backAction()}
        title="Foto de perfil"
        subtitle="Ela é opcional, você pode trocar mais tarde se quiser."
      />
      <Content>
        <PhotoContainer>
          {uri == null ? (
            <Pic source={require('./picdefault.png')} />
          ) : (
            <Pic source={uri} />
          )}
          <CameraDetail
            onPress={() => openModalize()}
            underlayColor={colors.paradisePink}>
            <Feather name="camera" size={20} color={colors.white} />
          </CameraDetail>
        </PhotoContainer>
        <Button
          backgroundColor={colors.platinum}
          color={colors.silver}
          title="Escolher"
          onPress={() => openModalize()}
        />
      </Content>

      <BottomNavigation
        onPress={() => setUser()}
        description={uri == null ? 'Pular' : 'Próximo'}
      />

      <Modalize
        ref={modalizeRef}
        title="Escolha uma opção"
        backgroundColor={colors.cultured}>
        <Button
          title="Abrir a câmera"
          onPress={() => {
            openCamera();
            closeModalize();
          }}
          backgroundColor={colors.platinum}
          color={colors.silver}
        />
        <Button
          title="Abrir a galeria"
          onPress={() => {
            openGalery();
            closeModalize();
          }}
          backgroundColor={colors.platinum}
          color={colors.silver}
        />
      </Modalize>
    </Container>
  );
};

export default Photo;

import React, { useEffect, useState, useRef } from 'react';

import { BackHandler } from 'react-native';

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

import { Buffer } from 'buffer';

export type PropsNavigation = {
  navigation: StackNavigationProp<RootStackParamAuth, 'Photo'>;
  route: RouteProp<RootStackParamAuth, 'Photo'>;
};

const Photo = ({ navigation }: PropsNavigation) => {
  const { user, updateUserProps, handleRegister } = UseAuth();

  const [avatar, setAvatar] = useState({ uri: '' });
  const [avatarBase64, setAvatarBase64] = useState('');
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
      setAvatar(source);
    });
  };

  const openGallery = () => {
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
      let asset = response.assets[0];
      setAvatar({ uri: `data:${asset.type};base64,${asset.base64}` });
      setAvatarBase64(asset.base64);
    });
  };

  async function setImage() {
    const newUser = user;
    newUser.avatar = avatarBase64;
    updateUserProps(newUser);
    //console.debug('Photo | SetUser(): ', user);

    const response = await handleRegister();
    //console.log(response);
    //navigation.navigate('FixedExpenses');
  }

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
          {avatar.uri == '' ? (
            <Pic source={require('./picdefault.png')} />
          ) : (
            <Pic source={{ uri: avatar.uri }} />
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
        onPress={() => setImage()}
        description={avatar.uri == null ? 'Pular' : 'Próximo'}
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
            openGallery();
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

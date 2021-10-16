import React, { useEffect, useState, useRef } from 'react';

import { BackHandler } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

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

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Modalize as Modal } from 'react-native-modalize';

export type PropsNavigation = {
  navigation: StackNavigationProp<RootStackParamAuth, 'Photo'>;
  route: RouteProp<RootStackParamAuth, 'Photo'>;
};

const Photo = ({ navigation }: PropsNavigation) => {
  const { user, updateUserProps, handleRegister } = UseAuth();

  const [avatar, setAvatar] = useState({ base64: '' });
  const modalizeRef = useRef<Modal>(null);

  const backAction = () => {
    navigation.goBack();
    return true;
  };

  const openCamera = () => {
    launchCamera({ mediaType: 'photo', includeBase64: true }, response => {
      if (response.didCancel) {
        console.debug('Operação cancelada!');
        return;
      }
      if (response.errorCode) {
        console.debug('OpenCamera Error Code: ' + response.errorCode);
        return;
      }
      if (response.assets) {
        let asset = response.assets[0];
        setAvatar({ base64: `data:${asset.type};base64,${asset.base64}` });
      }
    });
  };

  const openGallery = () => {
    launchImageLibrary(
      { mediaType: 'photo', includeBase64: true },
      response => {
        if (response.didCancel) {
          console.debug('Operação cancelada!');
          return;
        }
        if (response.errorCode) {
          console.debug('ImagePicker Error Code: ' + response.errorCode);
          return;
        }
        if (response.assets) {
          let asset = response.assets[0];
          setAvatar({ base64: `data:${asset.type};base64,${asset.base64}` });
        }
      },
    );
  };

  async function setImage() {
    const newUser = user;
    newUser.fotoPerfilUsuario = avatar.base64 == '' ? null : avatar.base64;
    updateUserProps(newUser);

    const response = await handleRegister();
    console.debug('Photo | SetUser(): ', JSON.stringify(user).substr(0, 150));
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
          {avatar.base64 == '' ? (
            <Pic
              source={require('../../../../assets/images/avatarDefault.png')}
            />
          ) : (
            <Pic source={{ uri: avatar.base64 }} />
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
        description={avatar.base64 == null ? 'Pular' : 'Próximo'}
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

import React, { useEffect, useState, useRef } from 'react';

import { BackHandler } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { UseAuth } from '../../../../contexts/AuthContext';

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

import { Modalize as Modal } from 'react-native-modalize';
import ImagePicker from 'react-native-image-crop-picker';

import global from '../../../../global';

export type PropsNavigation = {
  navigation: StackNavigationProp<RootStackParamAuth, 'Photo'>;
  route: RouteProp<RootStackParamAuth, 'Photo'>;
};

const Photo = ({ navigation }: PropsNavigation) => {
  const { user, updateUserProps, handleRegister } = UseAuth();

  const [avatar, setAvatar] = useState({ base64: '' });
  const modalizeRef = useRef<Modal>(null);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const backAction = () => {
    navigation.goBack();
    return true;
  };

  const openCamera = () => {
    ImagePicker.openCamera(global.IMAGE_CROP_PICKER_OPTIONS as {}).then(
      image => {
        console.log(image);
        setAvatar({ base64: `data:${image?.mime};base64,${image?.data}` });
      },
    );
  };

  const openGallery = () => {
    ImagePicker.openPicker(global.IMAGE_CROP_PICKER_OPTIONS as {}).then(
      image => {
        console.log(image);
        setAvatar({ base64: `data:${image.mime};base64,${image?.data}` });
      },
    );
  };

  async function next() {
    const newUser = user;
    newUser.fotoPerfilUsuario = avatar.base64 == '' ? null : avatar.base64;
    updateUserProps(newUser);
    console.debug('Photo | next(): ', JSON.stringify(user).substr(0, 200));
    await handleRegister();
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
        onPress={() => next()}
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

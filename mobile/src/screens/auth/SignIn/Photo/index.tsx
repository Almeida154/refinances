import React, { useEffect, useState, useRef } from 'react';

import { BackHandler, StatusBar } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, StackActions } from '@react-navigation/native';
import { useTheme } from 'styled-components/native'; 
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
import { colors } from '../../../../styles';

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
import { ScrollView } from 'react-native-gesture-handler';
import { widthPixel } from '../../../../helpers/responsiveness';

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
    navigation.dispatch(StackActions.replace('ConfirmPassword'));
    return true;
  };

  async function next() {
    const newUser = user;
    newUser.fotoPerfilUsuario = avatar.base64 == '' ? null : avatar.base64;
    updateUserProps(newUser);
    console.debug('Photo | next(): ', JSON.stringify(user).substr(0, 200));
    navigation.dispatch(StackActions.replace('Account'));
  }

  const openCamera = () => {
    ImagePicker.openCamera(global.IMAGE_CROP_PICKER_OPTIONS as {}).then(
      image => {
        // @ts-ignore
        setAvatar({ base64: `data:${image?.mime};base64,${image?.data}` });
      },
    );
  };

  const openGallery = () => {
    ImagePicker.openPicker(global.IMAGE_CROP_PICKER_OPTIONS as {}).then(
      image => {
        // @ts-ignore
        setAvatar({ base64: `data:${image.mime};base64,${image?.data}` });
      },
    );
  };

  const openModalize = () => modalizeRef.current?.open();
  const closeModalize = () => modalizeRef.current?.close();
  const theme: any = useTheme()

  return (
    <Container>
      <StatusBar translucent={true} backgroundColor="transparent"/>
      <ScrollView>
        <Header
          onBackButton={() => backAction()}
          title="Foto de perfil"
          subtitle="Ela é opcional, você pode trocar mais tarde se quiser."
        />

        <Content>
          <PhotoContainer>
            {avatar.base64 == '' ? (
              <Pic
                style={{
                  borderWidth: widthPixel(14),
                  borderColor: theme.colors.silver,
                }}
                source={require('../../../../assets/images/avatarDefault.png')}
              />
            ) : (
              <Pic
                style={{
                  borderWidth: widthPixel(14),
                  borderColor: theme.colors.platinum,
                }}
                source={{ uri: avatar.base64 }}
              />
            )}
            <CameraDetail
              onPress={() => openModalize()}
              underlayColor={theme.colors.paradisePink}>
              <Feather name="camera" size={20} color={theme.colors.white} />
            </CameraDetail>
          </PhotoContainer>
          <Button
            style={{ marginBottom: 80, backgroundColor: theme.colors.platinum }}
            color={theme.colors.silver}
            title="Escolher"
            onPress={() => openModalize()}
          />
        </Content>
      </ScrollView>

      <BottomNavigation
        onPress={() => next()}
        description={avatar.base64 == null ? 'Pular' : 'Próximo'}
      />

      <Modalize
        ref={modalizeRef}
        title="Escolha uma opção"
        backgroundColor={theme.colors.cultured}
        hasBodyBoundaries>
        <Button
          style={{ backgroundColor: theme.colors.platinum }}
          title="Abrir a câmera"
          onPress={() => {
            openCamera();
            closeModalize();
          }}
          color={theme.colors.silver}
        />
        <Button
          style={{ backgroundColor: theme.colors.platinum }}
          title="Abrir a galeria"
          onPress={() => {
            openGallery();
            closeModalize();
          }}
          color={theme.colors.silver}
          lastOne
        />
      </Modalize>
    </Container>
  );
};

export default Photo;

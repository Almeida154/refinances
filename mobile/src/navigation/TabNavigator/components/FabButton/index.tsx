import React, { useState } from 'react';
import View, {
  Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { colors, fonts, metrics } from '../../../../styles';
import { widthPixel, heightPixel } from '../../../../helpers/responsiveness';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';

import shadowBox from '../../../../helpers/shadowBox';

import { Container, TouchableBtn } from './styles';
import { UseDadosTemp } from '../../../../contexts/TemporaryDataContext';
import { StackActions } from 'react-navigation';

const FabButton = () => {
  const [animation] = useState(new Animated.Value(0));
  const [isOpen, setOpen] = useState(false);

  const { navigation } = UseDadosTemp();

  const toggleMenu = () => {
    const toValue = isOpen ? 0 : 1;

    Animated.spring(animation, {
      toValue,
      friction: 6,
      useNativeDriver: true,
    }).start();

    setOpen(!isOpen);
  };

  const cameraStyle = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, heightPixel(-280)],
        }),
      },
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, widthPixel(0)],
        }),
      },
    ],
  };

  const voiceStyle = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, heightPixel(-180)],
        }),
      },

      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, widthPixel(150)],
        }),
      },
    ],
  };

  const rotation = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '45deg'],
        }),
      },
    ],
  };

  const formStyle = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, heightPixel(-180)],
        }),
      },

      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, widthPixel(-150)],
        }),
      },
    ],
  };

  return (
    <Container style={{ marginHorizontal: widthPixel(130) }}>
        <Animated.View
          style={[
            styles.submenu,
            styles.button,
            formStyle,
            shadowBox(20, 0.5),
            { width: widthPixel(120), height: heightPixel(120) },
          ]}>
            <TouchableBtn onPress={() => console.log('form')}>
          <MaterialCommunity
            name="pencil"
            color={colors.redCrayola}
            size={widthPixel(50)}
            />
            </TouchableBtn>
        </Animated.View>


        <Animated.View
          style={[
            styles.submenu,
            styles.button,
            voiceStyle,
            shadowBox(20, 0.5),
            { width: widthPixel(120), height: heightPixel(120) },
          ]}>
                  <TouchableBtn activeOpacity={0.8} onPress={() => console.log('voice')}>
          <MaterialIcons
            name="keyboard-voice"
            color={colors.redCrayola}
            size={widthPixel(50)}
            />
      </TouchableBtn>
            </Animated.View>

        <Animated.View
          style={[
            styles.submenu,
            styles.button,
            cameraStyle,
            shadowBox(20, 0.5),
            { width: widthPixel(120), height: heightPixel(120) },
          ]}>
            <TouchableBtn onPress={() => console.log('camera')} activeOpacity={0.8}>
          <Entypo
            name="camera"
            color={colors.redCrayola}
            size={widthPixel(50)}
          />
      </TouchableBtn>
        </Animated.View>

      <TouchableBtn
        activeOpacity={0.8}
        onPress={toggleMenu}
        style={[styles.btnPlus]}>
        <Animated.View
          style={[
            styles.button,
            styles.menu,
            rotation,
            shadowBox(14, 0.5),
            {
              backgroundColor: isOpen ? colors.redCrayola : colors.white,
            },
          ]}>
          <Entypo
            name="plus"
            color={isOpen ? colors.white : colors.redCrayola}
            size={widthPixel(80)}
          />
        </Animated.View>
      </TouchableBtn>
    </Container>
  );
};

export default FabButton;

const styles = StyleSheet.create({
  button: {
    width: widthPixel(210),
    height: widthPixel(210),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: widthPixel(210 / 2),
    backgroundColor: colors.white,
    position: 'absolute'
  },

  submenu: {
    width: widthPixel(100),
    height: widthPixel(100),
    borderRadius: widthPixel(100 / 2),
  },

  menu: {
    position: 'absolute',
    backgroundColor: colors.white,
  },

  btnPlus: {
    position: 'absolute',
    elevation: 10,
    width: widthPixel(210),
    height: widthPixel(210),
    borderRadius: widthPixel(210 / 2),
    marginTop: heightPixel(-(210 / 2.6)),
  },
});

import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import { StackActions } from '@react-navigation/native';
import { heightPixel, widthPixel } from '../../helpers/responsiveness';
import { UseDadosTemp } from '../../contexts/TemporaryDataContext';
import { metrics } from '../../styles';

const ViewButtons = () => {
  const { buttonIsEnabled, navigation } = UseDadosTemp();
  return (
    <View
      style={{
        position: 'absolute',
        display: buttonIsEnabled ? 'flex' : 'none',
        bottom: 0,
        width: '100%',
      }}>
      <TouchableOpacity
        onPress={() =>
          navigation.dispatch(
            StackActions.replace('Lancamentos', { screen: 'Main' }),
          )
        }
        style={{
          width: widthPixel(100),
          height: widthPixel(100),
          bottom: heightPixel(60),
          borderRadius: widthPixel(100 / 2),
          marginLeft:
            (metrics.screen.width - widthPixel(100)) / 2 - widthPixel(150),
          position: 'absolute',
          backgroundColor: 'transparent',
        }}
      />

      <TouchableOpacity
        onPress={() => console.log('Camera')}
        style={{
          width: widthPixel(100),
          height: widthPixel(100),
          bottom: heightPixel(160),
          borderRadius: widthPixel(210 / 2),
          marginLeft: (metrics.screen.width - widthPixel(100)) / 2,
          position: 'absolute',
          backgroundColor: 'transparent',
        }}
      />

      <TouchableOpacity
        onPress={() =>
          navigation.dispatch(
            StackActions.replace('Lancamentos', { screen: 'RecognizeVoice' }),
          )
        }
        style={{
          width: widthPixel(100),
          height: widthPixel(100),
          bottom: heightPixel(60),
          borderRadius: widthPixel(100 / 2),
          marginLeft:
            (metrics.screen.width - widthPixel(100)) / 2 + widthPixel(150),
          backgroundColor: 'transparent',
        }}
      />
    </View>
  );
};

export default ViewButtons;

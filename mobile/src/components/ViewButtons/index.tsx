import React from 'react'
import {View, TouchableOpacity} from 'react-native'

import {StackActions} from '@react-navigation/native'
import {heightPixel, widthPixel} from '../../helpers/responsiveness'
import {UseDadosTemp} from '../../contexts/TemporaryDataContext'

const ViewButtons = () => {    
    const {buttonIsEnabled, navigation} = UseDadosTemp()

    return (
        <View style={{display: buttonIsEnabled ? 'flex' : 'none'}}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(StackActions.replace("Lancamentos", {screen: "Main"}))}
          style={{
            width: 40,
            height: 40,
            backgroundColor: 'transparent',
            position: 'absolute',
            bottom: heightPixel(30),
            marginLeft: widthPixel(290),
            borderRadius: widthPixel(210 / 2)
          }}
        />
        <TouchableOpacity
          onPress={() => console.log('Camera')}
          style={{
            width: 40,
            height: 40,
            backgroundColor: 'transparent',
            position: 'absolute',
            bottom: heightPixel(130),
            alignSelf: 'center',            
            borderRadius: widthPixel(210 / 2)
          }}
        />
        <TouchableOpacity
          onPress={() => navigation.dispatch(StackActions.replace("Lancamentos", {screen: "RecognizeVoice"}))}
          style={{
            width: 40,
            height: 40,
            backgroundColor: 'transparent',
            position: 'absolute',
            bottom: heightPixel(30),
            marginLeft: widthPixel(590),
            borderRadius: widthPixel(210 / 2)
          }}
        />
      </View>
    )
}

export default ViewButtons
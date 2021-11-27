import React, { Component } from 'react';
import View, { Animated, StyleSheet, TouchableOpacity } from 'react-native';

import { colors, fonts, metrics } from '../../../../styles';
import { widthPixel, heightPixel } from '../../../../helpers/responsiveness';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';

import shadowBox from '../../../../helpers/shadowBox';

import { Container, TouchableBtn } from './styles'
import { UseDadosTemp } from '../../../../contexts/TemporaryDataContext';

import { StackActions } from '@react-navigation/native';

export default class FabButton extends Component {

    animation = new Animated.Value(0);

    toggleMenu = () => {
        const toValue = this.state ? 0 : 1

        Animated.spring(this.animation, {
            toValue,
            friction: 6,
            useNativeDriver: true
        }).start();

        this.state = !this.state;
    }

    render(){
        //const { navigation } = UseDadosTemp();

        const cameraStyle = {
            transform: [
                { scale: this.animation },
                {
                    translateY: this.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, heightPixel(-400)]
                    })
                },
                {
                    translateX: this.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, widthPixel(0)]
                    })
                }
            ]
        }

        const voiceStyle = {
            transform: [
                { scale: this.animation },
                {
                    translateY: this.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, heightPixel(-220)]
                    })
                },

                {
                    translateX: this.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, widthPixel(150)]
                    })
                }
            ] 
        }

        const formStyle = {
            transform: [
                { scale: this.animation },
                {
                    translateY: this.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, heightPixel(-120)]
                    })
                },

                {
                    translateX: this.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, widthPixel(-150)]
                    })
                }
            ] 
        }

        return (
            <Container>

                <TouchableBtn
                    onPress={() => {navigation.dispatch(
                        StackActions.replace('Lancamentos', { screen: 'Main' }))}}>
                    <Animated.View style={[styles.submenu, styles.button, formStyle, shadowBox(14, 0.5),
                    { width: widthPixel(100), height: heightPixel(100)}]}>
                        <MaterialCommunity name="pencil" color={colors.redCrayola} size={widthPixel(50)}/>
                    </Animated.View>
                </TouchableBtn>

                <TouchableBtn
                    onPress={() => {navigation.dispatch(
                        StackActions.replace('Lancamentos', { screen: 'RecognizeVoice' }))}}>
                    <Animated.View style={[styles.submenu, styles.button, voiceStyle, shadowBox(14, 0.5),
                    { width: widthPixel(100), height: heightPixel(100)}]}>
                        <MaterialIcons name="keyboard-voice" color={colors.redCrayola} size={widthPixel(50)}/>
                    </Animated.View>
                </TouchableBtn>

                <TouchableBtn>
                    <Animated.View style={[styles.submenu, styles.button, cameraStyle, shadowBox(14, 0.5),
                        { width: widthPixel(100), height: heightPixel(100)}]}>
                        <Entypo name="camera" color={colors.redCrayola} size={widthPixel(50)}/>
                    </Animated.View>
                </TouchableBtn>

                <TouchableBtn onPress={this.toggleMenu} style={styles.btnPlus}>
                    <Animated.View style={[styles.button, styles.menu, shadowBox(14, 0.5)]}>
                        <Entypo name="plus" color={colors.redCrayola} size={widthPixel(65)}/>
                    </Animated.View>
                </TouchableBtn>


            </Container>
            
        );
    }
}

const styles = StyleSheet.create({
    button: {
        width: widthPixel(170),
        height: widthPixel(170),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: widthPixel(170 / 2),
        backgroundColor: colors.white,
    },

    submenu: {
        width: widthPixel(70),
        height: widthPixel(70),
        borderRadius: widthPixel(100 / 2),
    },

    menu: {
        position: 'absolute',
        backgroundColor: colors.white
    },

    btnPlus: {
        position: 'absolute',
        width: widthPixel(170),
        height: widthPixel(170),
        borderRadius: widthPixel(170 / 2),
        backgroundColor: colors.white,
        marginTop: heightPixel(-(170 / 3)),
    },
});
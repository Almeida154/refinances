import React, { useState } from "react";
import { Dimensions, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, Por, View } from "react-native";

const { width } = Dimensions.get('screen');

import ProgressBar from 'react-native-progress/Bar'

const App = () => {

    const Item = ({ gasto }) => {
        return (
            <View style={{ marginTop: 20 }}>
                <Text style={{ color: 'white', fontSize: 18 }}>{gasto}</Text>
                <ProgressBar progress={0.3} width={300} />
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text style={{ color: 'white', fontSize: 18 }}>Teto de Gastos</Text>

            <View style={{ height: 1, backgroundColor: 'white', width: 300 }} />
            <Item gasto="Bar e restaurante" />

            <Item gasto="Entretenimento" />

            <Item gasto="Bar e restaurante" />

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 300,
        marginTop: StatusBar.currentHeight || 0,
        width: width - 60,
        alignItems: 'flex-start',
        backgroundColor: '#202731',
        padding: 10,
        borderRadius: 20
    },

});

export default App;
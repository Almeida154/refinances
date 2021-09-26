import React, { useState } from "react";
import { Dimensions, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, Por, View, TextInput, Button } from "react-native";

const { width } = Dimensions.get('screen');

import ProgressBar from 'react-native-progress/Bar'

import { UseWants } from '../../../../contexts/WantsContext'

const ListWants = () => {
    const { wants, setWants } = UseWants()

    const Item = ({ item }) => {
        return (
            <View style={styles.containerItem}>
                <View style={styles.sessionText}>
                    <TextInput style={{ color: 'white', fontSize: 18 }}>{item.descricao}</TextInput>
                    <TextInput style={{ color: 'white', fontSize: 18 }}>{item.quantidade}</TextInput>
                </View>
                <ProgressBar progress={item.quantidade / 100} width={width - 80} />
            </View >
        )
    }

    function handleAdd() {
        let data = wants


        data.push({
            id: wants.length + 1,
            quantidade: 1,
            descricao: "Necessidade Nova"
        })

        setWants(data)

        console.log(`data`)
        wants.map(item => {
            console.log("Item: " + item.toString())
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerWants}>
                <Text style={{ color: 'white', fontSize: 18 }}>Necessidades</Text>

                <TouchableOpacity style={styles.buttonAdicionar} onPress={handleAdd}>
                    <Text style={styles.textButtonAdicionar}>Adicionar</Text>
                </TouchableOpacity>
            </View>

            <View style={{ height: 1, backgroundColor: 'white', width: width - 80 }} />

            <FlatList
                nestedScrollEnabled
                data={wants}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <Item item={item} />}

            />


        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        maxHeight: 300,
        marginTop: StatusBar.currentHeight || 0,
        width: width - 60,
        alignItems: 'flex-start',
        backgroundColor: '#202731',
        padding: 10,
        borderRadius: 20
    },
    sessionText: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    containerItem: {
        marginTop: 20,
    },
    headerWants: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 8
    },
    buttonAdicionar: {
        backgroundColor: 'green',
        borderRadius: 5
    },
    textButtonAdicionar: {
        fontSize: 12,
        color: 'white',
        padding: 5

    }

});

export default ListWants;
import React, { useState } from "react";
import { Dimensions, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, Por, View, TextInput } from "react-native";

import { UseItems } from '../../../contexts/ItemsContext'

const { width } = Dimensions.get('screen');

const useForceUpdate = () => {
    const set = useState(0)[1];
    return () => set((s) => s + 1);
}

const ListItems = () => {
    const { items, setItems } = UseItems()

    const forceupdate = useForceUpdate()

    const Item = ({ data }) => {

        return (
            <View style={styles.containerItem}>
                <View style={styles.sessionText}>
                    <TextInput style={{ color: 'white', fontSize: 18 }}>{data.descricao}</TextInput>
                    <TextInput style={{ color: 'white', fontSize: 18 }}>{data.preco}</TextInput>
                </View>

                <View style={styles.sessionConectaNecessidades}>

                    {

                        data.conectaNecessidades.map(item => {
                            return (
                                <View style={styles.groupLabel}>
                                    <TextInput style={styles.textNecessidade}>{item.necessidade}</TextInput>
                                    <TextInput style={styles.textNecessidade}>{item.valor}</TextInput>
                                </View>
                            )
                        })
                    }

                    <TouchableOpacity style={styles.buttonAssociar}><Text style={{ color: "white" }} onPress={() => handleAddAssociate(data.id)}>Associar Necessidade</Text></TouchableOpacity>
                </View>
            </View >
        )
    }

    function handleAdd() {
        let data = items


        data.push({
            id: data.length + 1,
            descricao: "Item Novo Aí",
            preco: 20,
            conectaNecessidades: [{
                necessidade: "Entretenimento",
                index: 2,
                valor: 40
            }]
        })

        setItems(data)
    }

    function handleAddAssociate(id) {
        let data = items
        let index = -1

        for (var i = 0; i < items.length && index == -1; i++) {
            if (data[i].id == id) {
                index = i
            }
        }

        data[index].conectaNecessidades.push({
            necessidade: "Necessidade Nova",
            index: 1,
            valor: 99
        })


        // setItems([])        
        setItems(data)
        console.log(items[index])

        forceupdate()
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerItems}>
                <Text style={{ color: 'white', fontSize: 18 }}>Itens</Text>
                <TouchableOpacity style={styles.buttonAdicionar} onPress={handleAdd}>
                    <Text style={styles.textButtonAdicionar}>Adicionar</Text>
                </TouchableOpacity>
            </View>
            <View style={{ height: 1, backgroundColor: 'white', width: width - 80 }} />

            <FlatList
                nestedScrollEnabled
                data={items}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <Item data={item} />}
                style={styles.listOtimos}
            />


        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 300,
        marginTop: StatusBar.currentHeight || 0,
        width: width - 60,
        alignItems: 'center',
        backgroundColor: '#202731',
        padding: 10,
        borderRadius: 20,

    },
    sessionText: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    containerItem: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 20,
        backgroundColor: 'gray',
        width: width - 80,
    },
    textNecessidade: {
        color: '#badfaf'
    },
    sessionConectaNecessidades: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10
    },
    groupLabel: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerItems: {
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
    },
    listOtimos: {
        height: 300
    },
    buttonAssociar: {
        backgroundColor: 'green',
        padding: 5,
        borderRadius: 5
    }

});

export default ListItems;
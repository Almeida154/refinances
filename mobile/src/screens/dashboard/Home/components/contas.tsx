import React, { useState } from "react";
import { Dimensions, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";

const { width } = Dimensions.get('screen');

const DATA = [
    {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "First Item",
        categoria: "Conta Corrente",
    },
    {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        title: "Second Item",
        categoria: "Conta Corrente",
    },
    {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        title: "Third Item",
        categoria: "Conta Corrente",
    },
    {
        id: "586924a0f-3da1-471f-bd96-145571e29d72",
        title: "Third Item",
        categoria: "Conta Corrente",
    },
    {
        id: "58694a20f-3da1-471f-bd96-145571e29d72",
        title: "Third Item",
        categoria: "Conta Corrente",
    },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <Text style={[styles.title, textColor]}>{item.title}</Text>
        <Text style={[styles.categoria]}>{item.categoria}</Text>
    </TouchableOpacity>
);

const App = () => {
    const [selectedId, setSelectedId] = useState(null);

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "#202731" : "#202731";
        const color = item.id === selectedId ? 'white' : 'white';

        return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.id)}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            />
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{ color: 'white', fontSize: 18 }}>Suas Contas</Text>
            <FlatList
                nestedScrollEnabled
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={selectedId}
                numColumns={2}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 200,
        marginTop: StatusBar.currentHeight || 0,
        width: width - 44,
        alignItems: 'center'
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 14,
        width: 130,
        height: 80
    },
    title: {
        fontSize: 17,
    },
    categoria: {
        color: '#74b57c'
    }
});

export default App;
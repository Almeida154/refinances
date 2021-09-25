import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ListWants from './components/listWants'
import ListItems from './components/listItems'
import ControlPanel from './components/controlPanel'

import { ItemsProvider } from '../../../contexts/ItemsContext'
import { WantsProvider } from '../../../contexts/WantsContext'

const Variados = () => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <ItemsProvider>
                    <WantsProvider>
                        <View style={styles.header}>

                        </View>
                        <View style={styles.contentContainer}>
                            <View style={styles.containerWants}>
                                <Text style={{ color: 'white' }}>Otimizando as necessidades</Text>
                                <ListWants />
                                <ListItems />
                                <ControlPanel />

                            </View>
                        </View>

                    </WantsProvider>
                </ItemsProvider>
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f0f0f',
    },
    header: {
        backgroundColor: '#bdc7c8',
        height: 60
    },
    contentContainer: {
        marginTop: 50,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 20,
        color: '#fff',
    },
    containerWants: {

    }
});
export default Variados;
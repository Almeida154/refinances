import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Touchable, TouchableHighlight, TextInput, ScrollView } from 'react-native';

import PickerLugar from './components/PickerLugar'
import PickerCategoria from './components/PickerCategoria'


const FormLancamento = () => {

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Registrar Lançamento</Text>

                <View style={styles.containerForm}>
                    <View style={styles.sectionButtons}>
                        <TouchableHighlight style={styles.buttonDespesa}><Text style={styles.textButton}>despesa</Text></TouchableHighlight>
                        <TouchableHighlight style={styles.buttonReceita}><Text style={styles.textButton2}>receita</Text></TouchableHighlight>
                    </View>

                    <View style={styles.inputControl}>
                        <Text style={styles.label}>Descrição</Text>
                        <TextInput style={styles.textInput}
                            placeholder="Mercadinho"></TextInput>
                    </View>

                    <View style={styles.inputControl}>
                        <Text style={styles.label}>Valor(R$) </Text>
                        <TextInput style={styles.textInput}
                            placeholder="R$0,00"></TextInput>
                    </View>

                    <View style={styles.inputControl}>
                        <Text style={styles.label}>Para onde será lançado?</Text>

                        <PickerLugar />
                    </View>

                    <View style={styles.inputControl}>
                        <Text style={styles.label}>Categoria</Text>

                        <PickerCategoria />
                    </View>

                    <View style={styles.inputControl}>
                        <Text style={styles.label}>Parcelas</Text>
                        <TextInput style={styles.textInput}
                            placeholder="1"></TextInput>
                    </View>

                    <View style={styles.inputControl}>
                        <Text style={styles.label}>Vencimento</Text>
                        <TextInput style={styles.textInput}
                            placeholder="21/12/2021"></TextInput>
                    </View>

                    <View>

                    </View>


                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'white',
    },
    title: {
        marginTop: 25,
        marginLeft: 15,
        fontSize: 40,
        color: '#EE4266',
        padding: 20,
        fontWeight: 'bold'
    },
    containerForm: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        width: '95%',
        padding: 5
    },
    label: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    textInput: {
        borderBottomWidth: 2,
        width: '100%',
        color: '#858c87',
        height: 40,
        borderBottomColor: '#858c87',
        opacity: 0.7
    },

    PickerCategoria: {
        borderBottomWidth: 2,
        width: '100%',
        color: 'black',
        height: 40,
        borderBottomColor: 'black',
    },

    inputControl: {
        display: 'flex',
        width: '90%',
        marginTop: 10
    },

    sectionButtons: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },

    buttonDespesa: {
        width: '30%',
        backgroundColor: '#271D87',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,

    },
    buttonReceita: {
        width: '30%',
        backgroundColor: '#fff',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        color: '#EE4266',
        borderColor: '#EE4266',
        borderLeftWidth: 0,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderRightWidth: 2
    },

    textButton: {
        color: 'white'
    },

    textButton2: {
        color: '#EE4266'
    }


});
export default FormLancamento;
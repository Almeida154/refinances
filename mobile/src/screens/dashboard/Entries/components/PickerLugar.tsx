import React, { useState, useRef, SetStateAction } from 'react'

import { Picker } from '@react-native-picker/picker'

import { StyleSheet, View } from 'react-native'

const PickerLugar = () => {
    const [selectedItem, setSelectedItem] = useState(0)

    const pickerRef = useRef();

    /*
    function open() {
        pickerRef.current.focus();
    }

    function close() {
        pickerRef.current.blur();
    }
    */

    const onChangePicker = (selItem: SetStateAction<number>) => {
        setSelectedItem(selItem)
    }

    return (
        <View style={styles.containerPicker}>
            <Picker
                itemStyle={styles.pickerItem}
                style={styles.picker}
                // ref={pickerRef}
                selectedValue={selectedItem}
                onValueChange={onChangePicker}
            >
                <Picker.Item style={{ backgroundColor: 'orange' }} label="Conta principal" value={0} />
                <Picker.Item style={{ backgroundColor: 'orange' }} label="Planejado" value={1} />
                <Picker.Item style={{ backgroundColor: 'orange' }} label="Para a Lista de Otimização" value={2} />

            </Picker>
        </View>
    )
}

const styles = StyleSheet.create({
    containerPicker: {
        width: '100%',
        height: 50,
        borderBottomWidth: 2,
        borderColor: '#858c87',
        opacity: 0.7
    },
    picker: {
        width: '100%',
        height: 50,
        color: '#555',

    },
    pickerItem: {
        backgroundColor: 'white',
        color: 'black',
    }
})

export default PickerLugar
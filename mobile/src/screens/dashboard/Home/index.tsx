import * as React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    ScrollView,
    StatusBar,
    FlatList,
    TouchableHighlight
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign'


const { width } = Dimensions.get('screen');

const ITEM_WIDTH = width * 0.9;
const ITEM_HEIGHT = ITEM_WIDTH * 0.9;

import {UseAuth} from '../../../contexts/AuthContext'

import SectionAccount from './components/SectionAccount'

const Home = () => {
    const { user, handleLogout } = UseAuth()    
        
    return (
        <ScrollView >

            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.containerProfile}>
                        <View style={styles.iconProfile}>
    
                        </View>

                        <View style={styles.textBoasVindas}>
                            <Text style={{ color: '#fff', fontSize: 20 }}>Boa tarde!</Text>

                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{user.nomeUsuario}</Text>
                        </View>
                    </View>

                    <View style={styles.containerSetting}>
                        <Icon name='setting' color='#000000' size={40} style={{marginRight: 20}}/>

                        <TouchableHighlight onPress={handleLogout}><Icon name='logout' color="#000000" size={40} /></TouchableHighlight>
                    </View>
                </View>
                {/* Scrollable Content */}
                <View style={styles.containerBody}>
                    
                    <SectionAccount />
                </View>
            </View>
        </ScrollView>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E0E0E0',
    },
    headerContainer: {
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: '#EE4266',
        height: 140,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    iconProfile: {
        width: 70,
        height: 70,
        backgroundColor: 'yellow',
        borderRadius: 50,
        borderColor: 'black',
        borderWidth: 1,
    },
    containerProfile: {
        display: 'flex',
        flexDirection: 'row',
        width: 170,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textBoasVindas: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    containerSetting: {
        width: 80,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    containerBody: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        top: -15,
    },
    sectionSaldoGeral: {
        width: width - 60,
        backgroundColor: '#202731',
        height: 80,
        padding: 10,
        borderRadius: 20
    }
});
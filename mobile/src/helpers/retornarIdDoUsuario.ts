import AsyncStorage from "@react-native-async-storage/async-storage"


async function retornarIdDoUsuario() {
    const getUser = await AsyncStorage.getItem('user')
    const idUser: number = JSON.parse(getUser == null ? "{id: 0}" : getUser).id

    return idUser
}

export default retornarIdDoUsuario
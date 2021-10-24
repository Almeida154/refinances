import AsyncStorage from "@react-native-async-storage/async-storage"


async function retornarIdDoUsuario() {
    const getUser = await AsyncStorage.getItem('user')
    const idUser: number = getUser == null ? 0 : JSON.parse(getUser).id

    return idUser
}

export default retornarIdDoUsuario
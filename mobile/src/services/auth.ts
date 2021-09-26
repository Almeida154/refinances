import api from './api'

const handleLogin = async (email: string, senha: string) => {
    try {
        const response = await api.post('/user/auth', {
            emailUsuario: email,
            senhaUsuario: senha
        })

        console.log(response.data)
    } catch (error) {
        console.log("Deu erro no Login:", error)
    }
}

export default handleLogin
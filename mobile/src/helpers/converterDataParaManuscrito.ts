export default function converterDataParaManuscrito (data: string) {
    let [dia , mes, ano] = data.split('/')

    let texto = dia + " de "

    switch(mes) {
        case '01':
            return texto + "Janeiro"
        case "02":
            return texto + "Fevereiro"
        case "03":
            return texto + "Março"
        case "04":
            return texto + "Abril"
        case "05":
            return texto + "Maio"
        case "06":
            return texto + "Junho"
        case "07":
            return texto + "Julho"
        case "08":
            return texto + "Agosto"
        case "09":
            return texto + "Setembro"
        case "10":
            return texto + "Outubro"
        case "11":
            return texto + "Novembro"
        case "12":
            return texto + "Dezembro"
    }
}
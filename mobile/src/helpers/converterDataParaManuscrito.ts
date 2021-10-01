export function converterNumeroParaData(mes: string) {
    
    switch(mes) {
        case '01':
        case '1':
            return "Janeiro"
        case "02":
        case "2":
            return "Fevereiro"
        case "03":
        case "3":
            return "Março"
        case "04":
        case "4":
            return "Abril"
        case "05":
        case "5":
            return "Maio"
        case "06":
        case "6":
            return "Junho"
        case "07":
        case "7":
            return "Julho"
        case "08":
        case "8":
            return "Agosto"
        case "09":
        case "9":
            return "Setembro"
        case "10":
            return "Outubro"
        case "11":
            return "Novembro"
        case "12":
            return "Dezembro"
    }
}

export default function converterDataParaManuscrito (data: string) {
    let [dia , mes, ano] = data.split('/')

    let texto = dia + " de "

    return texto + converterNumeroParaData(mes)
}
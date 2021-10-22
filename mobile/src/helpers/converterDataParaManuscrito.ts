export function converterNumeroParaData(data: string, mostrarAno: boolean) {
    const [dia, mes, ano] = data.split('/')

    let texto = ''
    switch(mes) {
        case '01':
        case '1':
            texto += "Janeiro"
            break;
        case "02":
        case "2":
            texto += "Fevereiro"
            break;
        case "03":
        case "3":
            texto += "Março"
            break;
        case "04":
        case "4":
            texto += "Abril"
            break;
        case "05":
        case "5":
            texto += "Maio"
            break;
        case "06":
        case "6":
            texto += "Junho"
            break;
        case "07":
        case "7":
            texto += "Julho"
            break;
        case "08":
        case "8":
            texto += "Agosto"
            break;
        case "09":
        case "9":
            texto += "Setembro"
            break;
        case "10":
            texto += "Outubro"
            break;
        case "11":
            texto += "Novembro"
            break;
        case "12":
            texto += "Dezembro"
            break;
    }

    if(mostrarAno) {
        texto += ` ${ano}`
    }

    return texto
}

export default function converterDataParaManuscrito (data: string) {
    let [dia , mes, ano] = data.split('/')

    let texto = dia + " de "

    return texto + converterNumeroParaData(data, false)
}
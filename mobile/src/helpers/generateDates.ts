import {toDate, addMonths} from './manipularDatas'
import {converterNumeroParaData} from './converterDataParaManuscrito'

export default function generatedates() {
    const nowYear = String(new Date(Date.now()).getFullYear())

    const dates = [converterNumeroParaData('01/01/2000', false)]
    let index = '01/01/2000'

    while(index.split('/')[1] != '12' || index.split('/')[2] != '2030') {
        index = addMonths(toDate(index), 1).toLocaleDateString()

        dates.push(converterNumeroParaData(index, !(index.split('/')[2] == nowYear)))
    }

    return dates.slice()
}
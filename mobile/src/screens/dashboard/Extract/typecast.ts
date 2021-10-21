import {Transferencia} from '../../../contexts/TransferContext'
import {Parcela} from '../../../contexts/InstallmentContext'

export function ConvertToParcela(item: Parcela[] | Transferencia[] ) {
    const readByParcelas = <Parcela[]>item    

    return readByParcelas.slice()
}

export function ConvertToTransferencia(item: Parcela[] | Transferencia[]) {
    const readByTransferencias = <Transferencia[]>item    

    return readByTransferencias.slice()
}
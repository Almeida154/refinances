import {Transferencia} from '../../../contexts/TransferContext'
import {ReadParcela} from '../../../contexts/InstallmentContext'

export function ConvertToParcela(item: ReadParcela[] | Transferencia[] ) {
    const readByParcelas = <ReadParcela[]>item    

    return readByParcelas.slice()
}

export function ConvertToTransferencia(item: ReadParcela[] | Transferencia[]) {
    const readByTransferencias = <Transferencia[]>item    

    return readByTransferencias.slice()
}
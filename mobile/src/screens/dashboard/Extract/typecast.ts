import {Transferencia} from '../../../contexts/TransferContext'
import {Parcela} from '../../../contexts/InstallmentContext'

export function ConvertToParcela(item: (Parcela | Transferencia)[], readByParcelas: Parcela[] ) {
    readByParcelas = <Parcela[]>item
    console.log("ConvertT", readByParcelas)
}

export function ConvertToTransferencia(item: (Parcela | Transferencia)[], readByTransferencias: Transferencia[] ) {
    readByTransferencias = <Transferencia[]>item
    console.log("ConvertT", readByTransferencias)
}
import { getRepository, Repository } from "typeorm";
import { NextFunction, Request, Response } from "express";

import { Transferencia } from "../entities/Transferencia";
import { Conta } from "../entities/Conta";
import { User } from "../entities/User";

class TransferenciaController {       

    async all(request: Request, response: Response, next: NextFunction) {        
        const transferenciaRepository = getRepository(Transferencia);
        const transferencias = await transferenciaRepository.find({
            join: {
                alias: "transferencia",
                leftJoinAndSelect: {
                    user: "transferencia.userTransferencia",
                    conta: "transferencia.contaOrigem",                    
                },
            },
        });
        return response.send({ transferencias });
    }
    
    async showRelations(request: Request, response: Response, next: NextFunction) {        
        const transferenciaRepository = getRepository(Transferencia);

        const transferencias = await transferenciaRepository.createQueryBuilder("transferencia")
            .leftJoinAndSelect("transferencia.contaOrigem", "conta")
            .getMany();

        const transferenciasDestino = await transferenciaRepository.createQueryBuilder("transferencia")
            .leftJoinAndSelect("transferencia.contaDestino", "conta")
            .getMany();

        transferencias.map((item, index) => {
            transferencias[index].contaDestino = transferenciasDestino[index].contaDestino
        });

        return response.send({ transferencias });
    }
    
    async save(request: Request, response: Response, next: NextFunction) {                        
        const transferenciaRepository = getRepository(Transferencia);  
        const contaRepository = getRepository(Conta);

        const { descricaoTransferencia, valorTransferencia, dataTransferencia, contaOrigem, contaDestino } = request.body;

        if (descricaoTransferencia == undefined) return response.send({ error: "Descrição da transferencia não especificado!" });
        if (valorTransferencia == undefined) return response.send({ error: "valor da transferencia não especificado!" });
        if (dataTransferencia == undefined) return response.send({ error: "data da transferência não especificado!" });
        if (contaOrigem == undefined) return response.send({ error: "conta origem não especificado!" });
        if (contaDestino == undefined) return response.send({ error: "conta destino não especificado!" });

        const contaOrigemExists = await contaRepository.findOne({
            where: {id: contaOrigem}, 
            join: {
                alias: 'conta',
                leftJoinAndSelect: {
                    user: 'conta.userConta'
                }
            }
        })        

        const contaDestinoExists = await contaRepository.findOne({where: {id: contaDestino}})        
        if (!contaOrigemExists) return response.send({
            error: "Essa conta origem não existe"
        });
        
        if (!contaDestinoExists) return response.send({
            error: "Essa conta destino não existe"
        });        
        
        if(contaOrigemExists.id == contaDestinoExists.id) return response.send({
            error: "A conta destino não pode ser o mesmo da conta origem"
        });

        const newTransferencia = request.body;
        newTransferencia.contaOrigem = contaOrigemExists;
        newTransferencia.contaDestino = contaDestinoExists;
        newTransferencia.userTransferencia = contaOrigemExists.userConta        
        newTransferencia.id = undefined
        
        contaOrigemExists.saldoConta -= valorTransferencia
        contaDestinoExists.saldoConta += valorTransferencia
        
        const transferencia = transferenciaRepository.create(newTransferencia);
        await transferenciaRepository.save(transferencia);

        await contaRepository.update(contaOrigemExists.id, contaOrigemExists)
        await contaRepository.update(contaDestinoExists.id, contaDestinoExists)

        return response.send({ message: transferencia });
    }
    
    async one(request: Request, response: Response, next: NextFunction) {
        const transferenciaRepository = getRepository(Transferencia);

        const transferencias = await transferenciaRepository.createQueryBuilder("transferencia")
            .leftJoinAndSelect("transferencia.contaOrigem", "conta")
            .where("transferencia.id = :id", { id: request.params.id })
            .getMany();

        const transferenciasDestino = await transferenciaRepository.createQueryBuilder("transferencia")
            .leftJoinAndSelect("transferencia.contaDestino", "conta")
            .where("transferencia.id = :id", { id: request.params.id })
            .getMany();

        transferencias.map((item, index) => {
            transferencias[index].contaDestino = transferenciasDestino[index].contaDestino
        });

        return response.send({ transferencias });
    }   

    
    async FindByUser(request: Request, response: Response, next: NextFunction) {
        const transferenciaRepository = getRepository(Transferencia);
        const userRepository = getRepository(User);

       const idUser = request.params.iduser

       if(!idUser) return response.send({error: "Id do usuário não especificado"})

       const userExists = await userRepository.findOne({where: {id: idUser}})

       if(!userExists) return response.send({error: "Não existe user com esse id"})

       const TransferenciasOrigem = await transferenciaRepository.find({
            where: {userTransferencia: userExists}, 
            join: {
                alias: 'transferencia',
                leftJoinAndSelect: {
                    conta: "transferencia.contaOrigem",                                    
                }
            },
            
            
        })   

        const TransferenciasDestino = await transferenciaRepository.find({
            where: {userTransferencia: userExists}, 
            join: {
                alias: 'transferencia',
                leftJoinAndSelect: {
                    conta: "transferencia.contaDestino",                                    
                }
            },                
        })   


        TransferenciasOrigem.map((item, index) => {
            TransferenciasOrigem[index].contaDestino = TransferenciasDestino[index].contaDestino
        })

        return response.send({ transferencias: TransferenciasOrigem });
    }   


    async edit(request: Request, response: Response, next: NextFunction) {
        const transferenciaRepository = getRepository(Transferencia);
        const contaRepository = getRepository(Conta);

        const { valorTransferencia, dataTransferencia, contaOrigem, contaDestino } = request.body;
        const id = parseInt(request.params.id);

        if (valorTransferencia == undefined) return response.send({ error: "valor da transferencia não especificado!" });
        if (dataTransferencia == undefined) return response.send({ error: "data da transferência não especificado!" });
        if (contaOrigem == undefined) return response.send({ error: "conta origem não especificado!" });
        if (contaDestino == undefined) return response.send({ error: "conta destino não especificado!" });

        const contaOrigemExists = await contaRepository.find({ where: { id: contaOrigem } });
        const contaDestinoExists = await contaRepository.find({ where: { id: contaDestino } });

        if (contaOrigemExists.length == 0) return response.send({
            error: "O id dessa conta origem não existe"
        });

        if (contaDestinoExists.length == 0) return response.send({
            error: "O id dessa conta destino não existe"
        });
        
        const updateTransferencia = request.body;
        updateTransferencia.contaOrigem = contaOrigemExists[0];
        updateTransferencia.contaDestino = contaDestinoExists[0];

        await transferenciaRepository.update(id, updateTransferencia);
        const transferencia = await transferenciaRepository.findOne({ where: { id } });
        
        return response.send({ message: transferencia });
    }
 
    async remove(request: Request, response: Response, next: NextFunction) {
        const transferenciaRepository = getRepository(Transferencia);
        let transferenciaToRemove = await transferenciaRepository.findOne(request.params.id);
        await transferenciaRepository.remove(transferenciaToRemove);
        return response.send({ mes: 'foi' });
    }
    
    async removeAll(request: Request, response: Response, next: NextFunction) {
        const transferenciaRepository = getRepository(Transferencia);
        let transferenciaToRemove = await transferenciaRepository.find();
        await transferenciaRepository.remove(transferenciaToRemove);
        return response.send({mes: 'foi'})
    }        
}

export default new TransferenciaController;
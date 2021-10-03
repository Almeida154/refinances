import { getRepository, Repository,  } from "typeorm";
import { NextFunction, Request, Response } from "express";

import { Parcela } from "../entities/Parcela";
import { Conta } from "../entities/Conta";
import { Lancamento } from "../entities/Lancamento";
import { User } from "../entities/User";

class ParcelaController {       

    async all(request: Request, response: Response, next: NextFunction) {        
        const parcelaRepository = getRepository(Parcela);
        const parcelas = await parcelaRepository.find();
        return response.send({ parcelas });
    }
    
    async showRelations(request: Request, response: Response, next: NextFunction) {        
        const parcelaRepository = getRepository(Parcela);

        const parcelas = await parcelaRepository.createQueryBuilder("parcela")
            .leftJoinAndSelect("parcela.lancamentoParcela", "lancamento")
            .leftJoinAndSelect("parcela.contaParcela", "conta")
            .leftJoinAndSelect("parcela.userParcela", "user")
            .getMany();        


        return response.send({ parcelas });
    }
    
    async save(request: Request, response: Response, next: NextFunction) {                        
        const parcelaRepository = getRepository(Parcela);  
        const contaRepository = getRepository(Conta);
        const lancamentoRepository = getRepository(Lancamento);

        const {dataParcela = '2013-10-21T13:28:06.419Z', valorParcela, contaParcela, lancamentoParcela} = request.body

        if (dataParcela == undefined) return response.send({ error: "data em branco!" });
        if (valorParcela == undefined) return response.send({ error: "valor não especificado" });
        if (contaParcela == undefined) return response.send({ error: "Conta não especificada!" });
        if (lancamentoParcela == undefined) return response.send({ error: "Sem lançamento!" });

        const lancamentoExists = await lancamentoRepository.findOne({ where: { id: lancamentoParcela } });
        const contaExists = await contaRepository.findOne({ 
            where: { id: contaParcela },
            join: {
                alias: 'conta',
                leftJoinAndSelect: {
                    user: 'conta.userConta'
                }
            }
        });

        if (!lancamentoExists) return response.send({
            error: "Não existe um lançamento com esse id"
        });

        if (!contaExists) return response.send({
            error: "Não existe uma conta com esse id"
        });
        console.log(contaExists)
        const newParcela = request.body;

        newParcela.lancamentoParcela = lancamentoExists;
        newParcela.contaParcela = contaExists;
        newParcela.userParcela = contaExists.userConta;

        console.log(newParcela.contaParcela);
        const parcela = parcelaRepository.create(newParcela);
        await parcelaRepository.save(parcela);

        return response.send({ message: parcela });
    }
    
    async GroupByDate(request: Request, response: Response, next: NextFunction) {
        const parcelaRepository = getRepository(Parcela);
        const userRepository = getRepository(User);
        const rawDate = new Date(request.body.rawDate)

        const firstDayOfMonth = new Date(rawDate.getFullYear(), rawDate.getMonth(), 1)
        const lastDayOfMonth = new Date(rawDate.getFullYear(), rawDate.getMonth() + 1, 0)        

        const user = await userRepository.findOne({where: {id: request.params.iduser}})        

        if(!user) {
            return response.send({error: "Não existe um user com esse id"})
        }
        const data = await parcelaRepository.createQueryBuilder("parcela")
            .leftJoinAndSelect("parcela.contaParcela", "conta")
            .leftJoinAndSelect("parcela.lancamentoParcela", "lancamento")
            .leftJoinAndSelect("parcela.userParcela", "user")
            .leftJoinAndSelect("lancamento.categoryLancamento", "category")
            .where("user.id = :id", {id: user.id})
            .where("parcela.dataParcela BETWEEN :firstDayOfMonth AND :lastDayOfMonth", {firstDayOfMonth, lastDayOfMonth})
            .orderBy("parcela.dataParcela", "ASC")            
            .getMany()       

        if(data.length == 0) {
            return response.send({message: []})
        }
        const parcelas = []

        let atual = data[0].dataParcela.toLocaleDateString()        

        let aux = []

        let lancamento = new Map()
        
        data.map((item: any, index) => {
            const parcelaData = item.dataParcela.toLocaleDateString()

            const keyLancamento = lancamento.get(item.lancamentoParcela.id)
            if(!keyLancamento) {
                lancamento.set(item.lancamentoParcela.id, 1)

                item.indexOfLancamento = 1
            } else {
                lancamento.set(item.lancamentoParcela.id, keyLancamento+1)

                item.indexOfLancamento = keyLancamento+1
            }

            if(parcelaData == atual) {
                aux.push(item)
            } else {
                parcelas.push(aux)
                aux = []

                atual = parcelaData
                aux.push(item)
            }

        })

        if(aux.length != 0) {
            parcelas.push(aux)
        }

        return response.send({message: parcelas})
    }
    async one(request: Request, response: Response, next: NextFunction) {
        const parcelaRepository = getRepository(Parcela);

        const parcelas = await parcelaRepository.createQueryBuilder("parcela")
            .leftJoinAndSelect("parcela.lancamentoParcela", "lancamento")
            .where("parcela.id = :id", { id: request.params.id })
            .getMany();

        const parcelasConta = await parcelaRepository.createQueryBuilder("parcela")
            .leftJoinAndSelect("parcela.contaParcela", "conta")
            .where("parcela.id = :id", { id: request.params.id })
            .getMany();

        parcelas.map((item, index) => {
            parcelas[index].contaParcela = parcelasConta[index].contaParcela
        });

        return response.send({ parcelas });
    }   

    async edit(request: Request, response: Response, next: NextFunction) {
        const parcelaRepository = getRepository(Parcela);  
        const contaRepository = getRepository(Conta);
        const lancamentoRepository = getRepository(Lancamento);

        const {dataParcela, valorParcela, contaParcela, lancamentoParcela} = request.body
        const id = parseInt(request.params.id);

        if (dataParcela == undefined) return response.send({ error: "nome em branco!" });
        if (valorParcela == undefined) return response.send({ error: "Não existe esse tipo" });
        if (contaParcela == undefined) return response.send({ error: "Conta não especificada!" });
        if (lancamentoParcela == undefined) return response.send({ error: "Sem lançamento!" });

        const lancamentoExists = await lancamentoRepository.find({ where: { id: lancamentoParcela } });
        const contaExists = await contaRepository.find({ where: { id: contaParcela } });

        if (lancamentoExists.length == 0) return response.send({
            error: "Não existe um lançamento com esse id"
        });

        if (contaExists.length == 0) return response.send({
            error: "Não existe uma conta com esse id"
        });
        
        const updateParcela = request.body;
        updateParcela.lancamentoParcela = lancamentoExists[0];
        updateParcela.contaParcela = contaExists[0];
        updateParcela.dataParcela = new Date(updateParcela.dataParcela);
                
        await parcelaRepository.update(id, updateParcela);

        const parcela = await parcelaRepository.findOne({
            where: { id }
        })

        return response.send({ message: parcela });
    }
    
    async remove(request: Request, response: Response, next: NextFunction) {
        const parcelaRepository = getRepository(Parcela);
        let parcelaToRemove = await parcelaRepository.findOne(request.params.id);
        await parcelaRepository.remove(parcelaToRemove);
        return response.send({ mes: 'foi' });
    }
    
    async removeAll(request: Request, response: Response, next: NextFunction) {
        const parcelaRepository = getRepository(Parcela);
        let parcelaToRemove = await parcelaRepository.find();
        await parcelaRepository.remove(parcelaToRemove);

        return response.send({ mes: 'foi' });
    }    
}

export default new ParcelaController;
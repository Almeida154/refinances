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

        const {dataParcela, valorParcela, statusParcela, contaParcela, lancamentoParcela} = request.body

        if (dataParcela == undefined) return response.send({ error: "data em branco!" });
        if (valorParcela == undefined) return response.send({ error: "valor não especificado" });
        if (contaParcela == undefined) return response.send({ error: "Conta não especificada!" });
        if (lancamentoParcela == undefined) return response.send({ error: "Sem lançamento!" });
        if (statusParcela == undefined) return response.send({ error: "Status da Parcela não especificado" });

        const lancamentoExists = await lancamentoRepository.findOne({ where: { id: lancamentoParcela } });
        
        const contaExists = await contaRepository.findOne({ 
            where: { id: contaParcela },
            join: {
                alias: 'conta',
                leftJoinAndSelect: {
                    user: 'conta.userConta',                   
                }
            }
        });       

        if (!lancamentoExists) return response.send({
            error: "Não existe um lançamento com esse id"
        });

        if (!contaExists) return response.send({
            error: "Não existe uma conta com esse id"
        });

        const newParcela = request.body;

        newParcela.lancamentoParcela = lancamentoExists;
        
        let updateConta
        if(statusParcela) {
            contaExists.saldoConta += lancamentoExists.tipoLancamento == 'despesa' ?  -valorParcela : valorParcela

            await contaRepository.update(contaExists.id, {saldoConta: contaExists.saldoConta})            
            updateConta = await contaRepository.findOne({where: {id: contaExists.id}})
        }

        console.log(updateConta)

        newParcela.userParcela = contaExists.userConta;
        newParcela.contaParcela = updateConta ? updateConta : contaExists

        const parcela = parcelaRepository.create(newParcela);
        await parcelaRepository.save(parcela);

        return response.send({ message: parcela });
    }
    
    async GroupByDate(request: Request, response: Response, next: NextFunction) {
        const parcelaRepository = getRepository(Parcela);
        const userRepository = getRepository(User);
        const lancamentoRepository = getRepository(Lancamento);
        
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

       
        const dataLancamentos = await lancamentoRepository.find({where: {userLancamento: {id: user.id}}, join: {
            alias: 'lancamento',
            leftJoinAndSelect: {
                user: 'lancamento.userLancamento',
                parcela: 'lancamento.parcelasLancamento'
            }
        }})
        
        const dataByUser = []

        data.map(item => {
            if(item.userParcela.id == user.id) {
                item.userParcela = undefined
                dataByUser.push(item)

            }
        })
        

        if(dataByUser.length == 0) {
            return response.send({message: []})
        }

        const parcelas = []

        let atual = dataByUser[0].dataParcela.toLocaleDateString()        

        let aux = []

        
        dataLancamentos.map((item, index) => {
            const auxParcela = item.parcelasLancamento.slice()

            auxParcela.sort((a, b) => a.dataParcela < b.dataParcela ? -1 : a.dataParcela > b.dataParcela ? 1 : 0)

            dataLancamentos[index].parcelasLancamento = auxParcela
        })

        dataByUser.map((item: any, index) => {
            const parcelaData = item.dataParcela.toLocaleDateString()

            
            for(var i = 0;i < dataLancamentos.length;i++) {                
                if(dataLancamentos[i].id == item.lancamentoParcela.id) {                    
                    console.log(dataLancamentos[i].parcelasLancamento)
                    for(var j = 0;j < dataLancamentos[i].parcelasLancamento.length;j++) {
                        if(dataLancamentos[i].parcelasLancamento[j].id == item.id) {
                            item.indexOfLancamento = j+1
                            item.totalParcelas = dataLancamentos[i].parcelasLancamento.length
                            break
                        }
                    }
                    break
                }
            }
        
            console.log(item)

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

        const {dataParcela, valorParcela, statusParcela, contaParcela, lancamentoParcela} = request.body
        const id = parseInt(request.params.id);

        if (dataParcela == undefined) return response.send({ error: "nome em branco!" });
        if (valorParcela == undefined) return response.send({ error: "Não existe esse tipo" });
        if (contaParcela == undefined) return response.send({ error: "Conta não especificada!" });
        if (lancamentoParcela == undefined) return response.send({ error: "Sem lançamento!" });
        if (statusParcela == undefined) return response.send({ error: "Status da Parcela não especificado" });

        const lancamentoExists = await lancamentoRepository.findOne({ where: { id: lancamentoParcela } });
        const contaExists = await contaRepository.findOne({ where: { id: contaParcela } });

        if (!lancamentoExists) return response.send({
            error: "Não existe um lançamento com esse id"
        });

        if (!contaExists) return response.send({
            error: "Não existe uma conta com esse id"
        });
        
        const updateParcela = request.body;

        const valorParcelaAnterior = await (await parcelaRepository.findOne(id)).valorParcela
        const diff = updateParcela.valorParcela - valorParcelaAnterior

        updateParcela.lancamentoParcela = lancamentoExists;
        
        let updateConta
        if(statusParcela) {
            contaExists.saldoConta += lancamentoExists.tipoLancamento == 'despesa' ?  -diff : diff
            updateConta = await contaRepository.update(contaExists.id, {...contaExists})            
        }


        updateParcela.userParcela = contaExists.userConta;
        updateParcela.contaParcela = updateConta ? updateConta : contaExists
        
                
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
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
            .select(["user.id", "parcela"])
            .leftJoinAndSelect("parcela.contaParcela", "conta")
            .leftJoinAndSelect("parcela.lancamentoParcela", "lancamento")
            .leftJoin("parcela.userParcela", "user")
            .leftJoinAndSelect("lancamento.categoryLancamento", "category")
            .where("(parcela.dataParcela BETWEEN :firstDayOfMonth AND :lastDayOfMonth OR lancamento.parcelaBaseada != -1) AND user.id = :id", {firstDayOfMonth, lastDayOfMonth, id: user.id})            
            .getMany()       

       console.log("data", data)
        const dataLancamentos = await lancamentoRepository.find({where: {userLancamento: {id: user.id}}, join: {
            alias: 'lancamento',
            leftJoinAndSelect: {
                user: 'lancamento.userLancamento',
                parcela: 'lancamento.parcelasLancamento'
            }
        }})
        
        const dataByUser = data                        

        if(dataByUser.length == 0) {
            return response.send({message: []})
        }

        
        dataByUser.sort((a, b) => {
            a.dataParcela.setMonth(firstDayOfMonth.getMonth())
            b.dataParcela.setMonth(firstDayOfMonth.getMonth())
            
            return a.dataParcela < b.dataParcela ? -1 : a.dataParcela > b.dataParcela ? 1 : 0
        })

        dataLancamentos.map((item, index) => {
            const auxParcela = item.parcelasLancamento.slice()

            auxParcela.sort((a, b) => a.dataParcela < b.dataParcela ? -1 : a.dataParcela > b.dataParcela ? 1 : 0)

            dataLancamentos[index].parcelasLancamento = auxParcela
        })

        const parcelas = []


        const [dia, mes, ano] = dataByUser[0].dataParcela.toLocaleDateString().split('/')

        let atual = new Date(parseInt(ano), lastDayOfMonth.getMonth(), parseInt(dia)).toLocaleDateString()

        let aux = []

        dataByUser.map((item: Parcela, index) => {
            const [dia, mes, ano] = item.dataParcela.toLocaleDateString().split('/')

            const parcelaData = new Date(parseInt(ano), firstDayOfMonth.getMonth(), parseInt(dia)).toLocaleDateString()
            
            let readParcela

            const indexId = dataLancamentos.findIndex(itemLancamento => itemLancamento.id == item.lancamentoParcela.id)

            const indexParcela = dataLancamentos[indexId].parcelasLancamento.findIndex(itemParcela => itemParcela.id == item.id)
    
            readParcela = item

            readParcela.indexOfLancamento = indexParcela+1
            readParcela.totalParcelas = dataLancamentos[indexId].parcelasLancamento.length                                            

            if(parcelaData == atual) {
                aux.push(readParcela)
            } else {
                parcelas.push(aux)
                aux = []

                atual = parcelaData
                aux.push(readParcela)
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
            .leftJoinAndSelect("parcela.contaParcela", "conta")
            .leftJoinAndSelect("parcela.userParcela", "user")
            .where("parcela.id = :id", { id: request.params.id })          
            .getMany();        
        

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
        const contaExists = await contaRepository.findOne({ where: { id: contaParcela }, join: {
            alias: 'conta',
            leftJoinAndSelect: {
                user: 'conta.userConta'
            }
        } });

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
            await contaRepository.update(contaExists.id, {...contaExists})            
            updateConta = await contaRepository.findOne({where: {id: contaExists.id}})
        }


        updateParcela.userParcela = contaExists.userConta;
        updateParcela.contaParcela = updateConta ? updateConta : contaExists
        
                
        await parcelaRepository.update(id, updateParcela);

        const parcela = await parcelaRepository.findOne({
            where: { id },
            join: {
                alias: "parcela",
                leftJoinAndSelect: {
                    user: "parcela.userParcela",
                    conta: "parcela.contaParcela",
                    lancamento: "parcela.lancamentoParcela"
                }
            }
        })
            console.log("updateParcela", parcela)

        return response.send({ message: parcela });
    }

    async EditByEntry(request: Request, response: Response, next: NextFunction) {
        const parcelaRepository = getRepository(Parcela);  
        const contaRepository = getRepository(Conta);
        const lancamentoRepository = getRepository(Lancamento);
        const userRepository = getRepository(User);

        const parcelasLancamento: Parcela[] = request.body.parcelasLancamento

        const userExists = await userRepository.findOne({where: {id: parcelasLancamento[0].userParcela}})
        const lancamentoExists = await lancamentoRepository.findOne({where: {id: parcelasLancamento[0].lancamentoParcela}})
        const contaExists = await contaRepository.findOne({where: {id: parcelasLancamento[0].contaParcela}})
        
        if(!userExists) {
            return response.send({error: "O user com o id especificado no atributo userParcela da primeira parcela não foi encontrado"})
        }  
        
        if(!lancamentoExists) {
            return response.send({error: "O lançamento com o id especificado no atributo lancamentoParcela da primeira parcela não foi encontrado"})
        }   

        await parcelaRepository.delete({lancamentoParcela: lancamentoExists})

       
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

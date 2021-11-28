import { getRepository, Repository,  } from "typeorm";
import { NextFunction, Request, Response } from "express";

import { Parcela } from "../entities/Parcela";
import { Conta } from "../entities/Conta";
import { Lancamento } from "../entities/Lancamento";
import { User } from "../entities/User";


function addMonths(date: Date, months: number) {    
    var d = date.getDate();
    date.setMonth(date.getMonth() + +months);
    if (date.getDate() != d) {
        date.setDate(0);
    }
    return date;
}

class ParcelaController {       

    async all(request: Request, response: Response, next: NextFunction) {        
        const parcelaRepository = getRepository(Parcela);
        const parcelas = await parcelaRepository.find();
        return response.send({ parcelas });
    }
    
    async showRelations(request: Request, response: Response, next: NextFunction) {        
        const parcelaRepository = getRepository(Parcela);

        const parcelas = await parcelaRepository.createQueryBuilder("parcela")
            .select(["parcela", "user.id"])
            .leftJoinAndSelect("parcela.lancamentoParcela", "lancamento")
            .leftJoinAndSelect("parcela.contaParcela", "conta")
            .leftJoin("parcela.userParcela", "user")
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

        newParcela.userParcela = contaExists.userConta;
        newParcela.contaParcela = contaExists

        if(lancamentoExists.parcelaBaseada != -1) {
            const updateDate = new Date(newParcela.dataParcela)
            let parcela
            for(var i = 0;i < 24;i++) {
                let parcela: any = parcelaRepository.create(newParcela);

                parcela.dataParcela = updateDate                

                await parcelaRepository.save(parcela);    

                addMonths(updateDate, 1)
            }

            return response.send({ message: parcela });
        } else {
            const parcela = parcelaRepository.create(newParcela);
            await parcelaRepository.save(parcela);

            return response.send({ message: parcela });
        }
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
            .where("parcela.dataParcela BETWEEN :firstDayOfMonth AND :lastDayOfMonth AND user.id = :id", {firstDayOfMonth, lastDayOfMonth, id: user.id})            
            .getMany()       
       
        const dataLancamentos: any = await lancamentoRepository.find({where: {userLancamento: {id: user.id}}, join: {
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
            return a.dataParcela < b.dataParcela ? -1 : a.dataParcela > b.dataParcela ? 1 : 0
        })

        dataLancamentos.map((item, index) => {
            const auxParcela = item.parcelasLancamento.slice()

            let valueLancamento = 0
            auxParcela.sort((a, b) => {                
                return a.dataParcela < b.dataParcela ? -1 : a.dataParcela > b.dataParcela ? 1 : 0
            })

            auxParcela.map(item => {
                valueLancamento += item.valorParcela
            })

            dataLancamentos[index].parcelasLancamento = auxParcela
            dataLancamentos[index].valueLancamento = valueLancamento
        })

        const parcelas = []


        const [diaAtual, mesAtual, anoAtual] = dataByUser[0].dataParcela.toLocaleDateString("pt-BR").split('/')

        let atual = new Date(parseInt(anoAtual), parseInt(mesAtual), parseInt(diaAtual)).toLocaleDateString("pt-BR")

        let aux = []
        
        dataByUser.map((item: Parcela, index) => {
            const [dia, mes, ano] = item.dataParcela.toLocaleDateString("pt-BR").split('/')

            const parcelaData = new Date(parseInt(ano), parseInt(mes), parseInt(dia)).toLocaleDateString("pt-BR")
            
            let readParcela

            const indexId = dataLancamentos.findIndex(itemLancamento => itemLancamento.id == item.lancamentoParcela.id)
            

            const indexParcela = dataLancamentos[indexId].parcelasLancamento.findIndex(itemParcela => itemParcela.id == item.id)
    
            readParcela = item

            readParcela.indexOfLancamento = indexParcela+1
            readParcela.totalParcelas = dataLancamentos[indexId].parcelasLancamento.length                                            
            readParcela.lancamentoParcela.valueLancamento = dataLancamentos[indexId].valueLancamento
            
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

        const editParcelas = request.body.editParcelas
        
        let parcelas: Parcela[] = []
        
        const lancamentoExists = await lancamentoRepository.findOne({ where: { id: editParcelas[0].lancamentoParcela } });
        if (!lancamentoExists) return response.send({ error: "Sem lançamento!" });

        await parcelaRepository.delete({lancamentoParcela: lancamentoExists})        

        for(var i = 0;i < editParcelas.length;i++) {
            
            const {id, dataParcela, valorParcela, statusParcela, contaParcela, lancamentoParcela} = editParcelas[i]

            const idParcela = parseInt(id);
    
            if (dataParcela == undefined) return response.send({ error: "Nome em branco!" });
            if (valorParcela == undefined) return response.send({ error: "Não existe esse tipo" });
            if (contaParcela == undefined) return response.send({ error: "Conta não especificada!" });
            if (statusParcela == undefined) return response.send({ error: "Status da Parcela não especificado" });
                
            const contaExists = await contaRepository.findOne({ where: { id: contaParcela.id }, join: {
                alias: 'conta',
                leftJoinAndSelect: {
                    user: 'conta.userConta'
                }
            } });
           
            if (!contaExists) return response.send({
                error: "Não existe uma conta com esse id"
            });
            
            const updateParcela = parcelaRepository.create({
                dataParcela: new Date(dataParcela),
                contaParcela: contaExists,
                statusParcela,
                valorParcela: valorParcela,     
                userParcela: contaExists.userConta,
                lancamentoParcela: lancamentoExists           
            });                                                                    
                    
            await parcelaRepository.save(updateParcela);              

            parcelas.push(updateParcela)
            console.log("updateParcela", updateParcela)
        }

        return response.send({ message: parcelas });
    }

    async ChangeStatus(request: Request, response: Response, next: NextFunction) {
        const parcelaRepository = getRepository(Parcela);  

        const parcela = await parcelaRepository.findOne({where: {id: request.params.id}})

        if(!parcela) {
            return response.send({error: "Não existe uma parcela com esse id"})
        }

        parcela.statusParcela = parcela.statusParcela ? false : true

        await parcelaRepository.update(parcela.id, parcela)

        return response.send({message: parcela})
    }

    async EditOne(request: Request, response: Response, next: NextFunction) {
        const parcelaRepository = getRepository(Parcela);  
        const contaRepository = getRepository(Conta);
        const lancamentoRepository = getRepository(Lancamento);

        const {dataParcela, statusParcela, contaParcela, lancamentoParcela, valorParcela} = request.body

        console.log(statusParcela)
        const id = parseInt(request.params.id)

        if(!dataParcela) {
            return response.send({error: "Data da parcela não especificado"})
        }
        if(statusParcela == undefined) {
            return response.send({error: "Status da parcela não especificado"})
        }
        if(!contaParcela) {
            return response.send({error: "Conta da parcela não especificado"})
        }
        if(!lancamentoParcela) {
            return response.send({error: "Lançamento da parcela não especificado"})
        }
        if(!valorParcela) {
            return response.send({error: "Valor da parcela não especificado"})
        }
        
        const lancamentoExists = await lancamentoRepository.findOne({where: {id: lancamentoParcela}})
        const contaExists = await contaRepository.findOne({where: {id: contaParcela.id}, join: {
            alias: "conta",
            leftJoinAndSelect: {
                user: "conta.userConta"
            }
        }})            
        
        if(!lancamentoExists) {
            return response.send({error: "O lançamento com o id especificado no atributo lancamentoParcela da primeira parcela não foi encontrado"})
        }   

        if(!contaExists) {
            return response.send({error: "A Conta não foi encontrada"})
        }           
       
        const updateParcela: Parcela = {
            id,
            dataParcela: new Date(dataParcela),
            contaParcela: contaExists,
            lancamentoParcela: lancamentoExists,
            statusParcela: statusParcela,
            userParcela: contaExists.userConta,
            valorParcela: valorParcela            
        }

        await parcelaRepository.update(id, updateParcela)

        return response.send({message: updateParcela})
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

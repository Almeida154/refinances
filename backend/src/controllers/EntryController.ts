import { getRepository, In, Repository, SubjectWithoutIdentifierError } from "typeorm";
import {NextFunction, Request, Response } from "express";

import { Lancamento } from "../entities/Lancamento";
import { Category } from "../entities/Category";
import { User } from "../entities/User";

class LancamentoController {       

    async all(request: Request, response: Response, next: NextFunction) {        
        const LancamentoRepository = getRepository(Lancamento);
        const lancamento = await LancamentoRepository.find();
        
        return response.send({ lancamento });
    }
    
    async showRelations(request: Request, response: Response, next: NextFunction) {        
        const lancamentoRepository = getRepository(Lancamento);

        const lancamentos = await lancamentoRepository.createQueryBuilder("lancamento")
            .select(["lancamento", "user.id"])
            .leftJoinAndSelect("lancamento.categoryLancamento", "category")
            .leftJoinAndSelect("lancamento.parcelasLancamento", "parcela")
            .leftJoin("lancamento.userLancamento", "user")
            .getMany();

        return response.send({ message: lancamentos });
    }
    
    async save(request: Request, response: Response, next: NextFunction) {                        
        const lancamentoRepository = getRepository(Lancamento);  
        const categoryRepository = getRepository(Category);

        const { descricaoLancamento, tipoLancamento, lugarLancamento, parcelaBaseada = -1, categoryLancamento } = request.body;

        if (descricaoLancamento == '') return response.send({ error: "nome em branco!" });
        if (tipoLancamento != 'receita' && tipoLancamento != 'despesa') return response.send({ error: "Não existe esse tipo" });
        if (lugarLancamento != 'otimizar' && lugarLancamento != 'extrato') return response.send({ error: "Não existe esse lugar" });
                
        
        const categoryExists = await categoryRepository.createQueryBuilder("category")
            .leftJoinAndSelect("category.userCategory", "user")
            .where("category.id = :id", {id: categoryLancamento})
            .getOne()

        if (!categoryExists) return response.send({
            error: "Não existe essa categoria especificada"
        });
       
        
        const newLancamento = request.body;
        newLancamento.essencial = true
        newLancamento.categoryLancamento = categoryExists;
        newLancamento.parcelaBaseada = parcelaBaseada;

        newLancamento.userLancamento = categoryExists.userCategory
        
        const lancamento = lancamentoRepository.create(newLancamento);
        await lancamentoRepository.save(lancamento);

        return response.send({ message: lancamento });
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const lancamentoRepository = getRepository(Lancamento);
        
        const lancamento: any = await lancamentoRepository.createQueryBuilder("lancamento")
            .leftJoinAndSelect("lancamento.categoryLancamento", "category")
            .leftJoinAndSelect("lancamento.parcelasLancamento", "parcela")
            .leftJoinAndSelect("parcela.contaParcela", "conta")
            .where("lancamento.id = :id", { id: request.params.id })
            .orderBy("parcela.dataParcela", "ASC")
            .getOne();
        
            let totalParcelas = 0

            lancamento.parcelasLancamento.map((item, index) => {
                totalParcelas += item.valorParcela
                lancamento.parcelasLancamento[index].indexOfLancamento = index
            })

            if(lancamento.parcelaBaseada == -1) {
                lancamento.totalParcelas = totalParcelas                 
            }

        return response.send({ message: lancamento });
    }       

    async FindByUser(request: Request, response: Response, next: NextFunction) {
        const lancamentoRepository = getRepository(Lancamento)
        const userRepository = getRepository(User)        

        const user = await userRepository.findOne({where: {id: request.params.iduser}})

        if(!user) {
            return response.send({error: "Usuario não encontrado"})
        }                

        const auxLancamentosUser = await lancamentoRepository.find({
            where: {userLancamento: user}, 
            join: {
                alias: 'lancamento',
                leftJoinAndSelect: {
                    parcela: "lancamento.parcelasLancamento",                    
                    category: "lancamento.categoryLancamento"
                }
            }
            
        })

        const lancamentosUser = []

        auxLancamentosUser.map((item, index) => {
            lancamentosUser[index] = item
            lancamentosUser[index].categoryLancamento = item.categoryLancamento.nomeCategoria
        })
        
        return response.send({message: lancamentosUser})
    }   

    async edit(request: Request, response: Response, next: NextFunction) {
        const lancamentoRepository = getRepository(Lancamento);  
        const categoryRepository = getRepository(Category);
        

        const { descricaoLancamento, tipoLancamento, lugarLancamento, categoryLancamento } = request.body;
        const id = parseInt(request.params.id);

        if (descricaoLancamento == undefined) return response.send({ error: "descricao em branco!" });
        if (tipoLancamento != 'receita' && tipoLancamento != 'despesa') return response.send({ error: "Não existe esse tipo" });
        if (lugarLancamento != 'otimizar' && lugarLancamento != 'extrato') return response.send({ error: "Não existe esse lugar" });
                
        const categoryExists = await categoryRepository.createQueryBuilder("category")
            .leftJoinAndSelect("category.userCategory", "user")
            .where("category.id = :id", {id: categoryLancamento})
            .getOne()

        if (!categoryExists) return response.send({
            error: "Não existe essa categoria especificada"
        });
        
        
        const updateLancamento = request.body;
        updateLancamento.categoryLancamento = categoryExists;
        updateLancamento.userLancamento = categoryExists.userCategory

        await lancamentoRepository.update(id, updateLancamento);
        
        const lancamento = await lancamentoRepository.findOne({
            where: { id }
        });

        console.log("Lancamento editado", lancamento)

        return response.send({ message: lancamento });
    }
    

    async remove(request: Request, response: Response, next: NextFunction) {
        const lancamentoRepository = getRepository(Lancamento);
        let lancamentoToRemove = await lancamentoRepository.findOne(request.params.id);
        await lancamentoRepository.remove(lancamentoToRemove);
        return response.send({ mes: 'foi' });
    }
    
    async removeAll(request: Request, response: Response, next: NextFunction) {
        const lancamentoRepository = getRepository(Lancamento);
        let lancamentoToRemove = await lancamentoRepository.find();
        await lancamentoRepository.remove(lancamentoToRemove);

        return response.send({ mes: 'foi' });
    }
}

export default new LancamentoController;
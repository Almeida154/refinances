import { getRepository, Repository } from "typeorm";
import {NextFunction, Request, Response } from "express";

import { Lancamento } from "../entity/Lancamento";
import { Category } from "../entity/Category";

class LancamentoController {       

    async all(request: Request, response: Response, next: NextFunction) {        
        const LancamentoRepository = getRepository(Lancamento);
        const lancamento = await LancamentoRepository.find();
        
        return response.send({ lancamento });
    }
    
    async showRelations(request: Request, response: Response, next: NextFunction) {        
        const lancamentoRepository = getRepository(Lancamento);

        const lancamentos = await lancamentoRepository.createQueryBuilder("lancamento")
            .leftJoinAndSelect("lancamento.categoryLancamento", "category")
            .getMany();

        return response.send({ message: lancamentos });
    }
    
    async save(request: Request, response: Response, next: NextFunction) {                        
        const lancamentoRepository = getRepository(Lancamento);  
        const categoryRepository = getRepository(Category);

        const { descricaoLancamento, tipoLancamento, lugarLancamento, categoryLancamento } = request.body;

        if (descricaoLancamento == '') return response.send({ error: "nome em branco!" });
        if (tipoLancamento != 'receita' && tipoLancamento != 'despesa') return response.send({ error: "Não existe esse tipo" });
        if (lugarLancamento != 'otimizar' && lugarLancamento != 'extrato') return response.send({ error: "Não existe esse lugar" });
                
        const categoryExists = await categoryRepository.find({ where: { id: categoryLancamento } });

        if (categoryExists == []) return response.send({
            error: "Não exite essa categoria especificada"
        });
        
        const newLancamento = request.body;
        newLancamento.categoryLancamento = categoryExists[0];
        const lancamento = lancamentoRepository.create(newLancamento);
        await lancamentoRepository.save(lancamento);

        return response.send({ message: lancamento });
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const lancamentoRepository = getRepository(Category);
        
        const lancamentos = await lancamentoRepository.createQueryBuilder("lancamento")
            .leftJoinAndSelect("lancamento.categoryLancamento", "category")
            .where("lancamento.id = :id", { id: request.params.id })
            .getMany();
        
        return response.send({ lancamentos });
    }   

    async FindByUser(request: Request, response: Response, next: NextFunction) {
        // Fazer depois
    }   

    async edit(request: Request, response: Response, next: NextFunction) {
        const lancamentoRepository = getRepository(Lancamento);  
        const categoryRepository = getRepository(Category);

        const { descricaoLancamento, tipoLancamento, lugarLancamento, categoryLancamento } = request.body;
        const id = parseInt(request.params.id);

        if (descricaoLancamento == undefined) return response.send({ error: "descricao em branco!" });
        if (tipoLancamento != 'receita' && tipoLancamento != 'despesa') return response.send({ error: "Não existe esse tipo" });
        if (lugarLancamento != 'otimizar' && lugarLancamento != 'extrato') return response.send({ error: "Não existe esse lugar" });
                
        const categoryExists = await categoryRepository.find({
            where: { id: categoryLancamento }
        });

        if (categoryExists == []) return response.send({
            error: "Não exite essa categoria especificada"
        });
        
        const updateLancamento = request.body;
        updateLancamento.categoryLancamento = categoryExists[0];
        await lancamentoRepository.update(id, updateLancamento);

        const lancamento = await lancamentoRepository.findOne({
            where: { id }
        });

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
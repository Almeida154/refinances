import { getRepository, Repository } from "typeorm";
import { NextFunction, Request, Response } from "express";

import { Lancamento } from "../entities/Lancamento";
import { Necessidade } from "../entities/Necessidade";
import { ConectaNecessidade } from "../entities/ConectaNecessidade";

class ConectaNecessidadeController {       

    async all(request: Request, response: Response, next: NextFunction) {        
        const conectaNecessidadeRepository = getRepository(ConectaNecessidade);
        const conectaNecessidade = await conectaNecessidadeRepository.find();
        return response.send({ conectaNecessidade });
    }
    
    async showRelations(request: Request, response: Response, next: NextFunction) {        
        const contaRepository = getRepository(ConectaNecessidade);

        const conectaNecessidades = await contaRepository.createQueryBuilder("conectaNecessidade")
            .leftJoinAndSelect("conectaNecessidade.necessidadeAssociada", "necessidade")
            .getMany();

        const conectaNecessidadesLancamentos = await contaRepository.createQueryBuilder("conectaNecessidade")
            .leftJoinAndSelect("conectaNecessidade.lancamentoAssociado", "lancamento")
            .getMany();

        conectaNecessidades.map((item, index) => {
            conectaNecessidades[index].lancamentoAssociado = conectaNecessidadesLancamentos[index].lancamentoAssociado
        });

        return response.send({ conectaNecessidades });
    }
    
    async save(request: Request, response: Response, next: NextFunction) {                        
        const conectaNecessidadeRepository = getRepository(ConectaNecessidade);  
        const lancamentoRepository = getRepository(Lancamento);
        const necessidadeRepository = getRepository(Necessidade);

        const { valorConectaNecessidade, necessidadeAssociada, lancamentoAssociado } = request.body;

        if (valorConectaNecessidade == '') return response.send({
            error: "nome em branco!"
        });

        const lancamentoExists = await lancamentoRepository.find({
            where: { id: lancamentoAssociado }
        });

        if (lancamentoExists.length == 0)
            return response.send({ error: "Não existe esse Lançamento" });

        const necessidadeExists = await necessidadeRepository.find({where: {id: necessidadeAssociada}})

        if (necessidadeExists.length == 0)
            return response.send({ error: "Não existe essa necessidade" });

        const conectaNecessidadeExists = await conectaNecessidadeRepository.find({
            where: {
                lancamentoAssociado: lancamentoExists[0].id,
                necessidadeAssociada: necessidadeExists[0].id
            }
        })

        if (conectaNecessidadeExists.length > 0) return response.send({
            error: "Já existe uma conecta necessidade com essa mesma necessidade e usuário, tente edita-lá"
        });
        
        const newConectaNecessidade = request.body;

        newConectaNecessidade.necessidadeAssociada = necessidadeExists[0];
        newConectaNecessidade.lancamentoAssociado = lancamentoExists[0];
        const conectaNecessidade = await conectaNecessidadeRepository.create(newConectaNecessidade)
        await conectaNecessidadeRepository.save(conectaNecessidade);

        return response.send({message: conectaNecessidade})
    }
    
    async one(request: Request, response: Response, next: NextFunction) {
        const contaRepository = getRepository(ConectaNecessidade);

        const conectaNecessidades = await contaRepository.createQueryBuilder("conectaNecessidade")
            .leftJoinAndSelect("conectaNecessidade.necessidadeAssociada", "necessidade")
            .where("conectaNecessidades.id", { id: request.params.id })
            .getMany();

        const conectaNecessidadesLancamentos = await contaRepository.createQueryBuilder("conectaNecessidade")
            .leftJoinAndSelect("conectaNecessidade.lancamentoAssociado", "lancamento")
            .where("conectaNecessidades.id", { id: request.params.id })
            .getMany();

        conectaNecessidades[0].lancamentoAssociado = conectaNecessidadesLancamentos[0].lancamentoAssociado;

        return response.send({conectaNecessidades})
    }   

    async edit(request: Request, response: Response, next: NextFunction) {
        const conectaNecessidadeRepository = getRepository(ConectaNecessidade);  
        const lancamentoRepository = getRepository(Lancamento);
        const necessidadeRepository = getRepository(Necessidade);

        const { valorConectaNecessidade, necessidadeAssociada, lancamentoAssociado } = request.body;
        const id = parseInt(request.params.id);

        if (valorConectaNecessidade == '') return response.send({ error: "nome em branco!" });

        const lancamentoExists = await lancamentoRepository.find({
            where: { id: lancamentoAssociado }
        });

        if (lancamentoExists.length == 0) return response.send({
            error: "Não existe esse Lançamento"
        });

        const necessidadeExists = await necessidadeRepository.find({where: {id: necessidadeAssociada}})

        if (necessidadeExists.length == 0) return response.send({
            error: "Não existe essa necessidade"
        });

        const conectaNecessidadeExists = await conectaNecessidadeRepository.find({
            where: {
                lancamentoAssociado: lancamentoExists[0].id,
                necessidadeAssociada: necessidadeExists[0].id
            }
        });

        if (conectaNecessidadeExists.length > 1 && (conectaNecessidadeExists.length != 1 || conectaNecessidadeExists[0].id != id)) {
            return response.send({
                error: "Já existe uma conecta necessidade com essa mesma necessidade e usuário, tente edita-lá"
            });
        }
        
        const updateConectaNecessidade = request.body;

        updateConectaNecessidade.necessidadeAssociada = necessidadeExists[0];
        updateConectaNecessidade.lancamentoAssociado = lancamentoExists[0];
        await conectaNecessidadeRepository.update(id, updateConectaNecessidade);
        const conectaNecessidade = await conectaNecessidadeRepository.findOne({where: {id}});

        return response.send({ message: conectaNecessidade });
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const conectaNecessidadeRepository = getRepository(ConectaNecessidade);
        let conectaNecessidadeToRemove = await conectaNecessidadeRepository.findOne(request.params.id);
        await conectaNecessidadeRepository.remove(conectaNecessidadeToRemove);
        return response.send({ mes: 'foi' });
    }
    
    async removeAll(request: Request, response: Response, next: NextFunction) {
        const conectaNecessidadeRepository = getRepository(ConectaNecessidade);
        let conectaNecessidadeToRemove = await conectaNecessidadeRepository.find();
        await conectaNecessidadeRepository.remove(conectaNecessidadeToRemove);

        return response.send({ mes: 'foi' });
    } 
}

export default new ConectaNecessidadeController;
import { getRepository, Repository } from "typeorm";
import { NextFunction, Request, Response } from "express";

import { Necessidade } from "../entities/Necessidade";
import { User } from "../entities/User";

class NecessidadeController {       

    async all(request: Request, response: Response, next: NextFunction) {        
        const necessidadeRepository = getRepository(Necessidade);
        const necessidades = await necessidadeRepository.find();
        return response.send({ necessidades });
    }
    
    async showRelations(request: Request, response: Response, next: NextFunction) {        
        const necessidadeRepository = getRepository(Necessidade);

        const necessidades = await necessidadeRepository.createQueryBuilder("necessidade")
            .leftJoinAndSelect("necessidade.userNecessidade", "user")
            .getMany();

        return response.send({ necessidades });
    }
    
    async save(request: Request, response: Response, next: NextFunction) {                        
        const necessidadeRepository= getRepository(Necessidade);
        const userRepository = getRepository(User);

        const { descricaoNecessidade, valorNecessidade, userNecessidade } = request.body;

        if (descricaoNecessidade == undefined) return response.send({ error: "descrição não especificado!" });
        if (valorNecessidade == undefined) return response.send({ error: "valor da necessidade não especificado" });
        if (userNecessidade == undefined) return response.send({ error: "Sem user aí!" });

        const necessidadeExists = await necessidadeRepository.find({ where: { descricaoNecessidade } });

        if (necessidadeExists.length > 0) return response.send({
            error: "Já existe uma necessidade com essa descrição"
        });

        const user = await userRepository.findOne({
            where: { id: userNecessidade }
        });

        if (user == undefined) return response.send({
            error: "Não existe user com esse id"
        });

        const newNecessidade = request.body;
        newNecessidade.userNecessidade = user;
        const necessidade = necessidadeRepository.create(newNecessidade);
        await necessidadeRepository.save(necessidade);

        return response.send({ message: necessidade });
    }
    
    async one(request: Request, response: Response, next: NextFunction) {
        const necessidadeRepository = getRepository(Necessidade);

        const necessidade = await necessidadeRepository.createQueryBuilder("necessidade")
            .leftJoinAndSelect("necessidade.userNecessidade", "user")
            .where("necessidade.id = :id", { id: request.params.id })
            .getMany();

        return response.send({ necessidade });
    }   

    async edit(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);
        const necessidadeRepository= getRepository(Necessidade);
        const userRepository = getRepository(User);
    
        const { descricaoNecessidade, valorNecessidade, userNecessidade } = request.body;
    
        if (descricaoNecessidade == undefined) return response.send({ error: "descrição não especificado!" });
        if (valorNecessidade == undefined) return response.send({ error: "valor da necessidade não especificado" });
        if (userNecessidade == undefined) return response.send({ error: "Sem user aí!" });
    
        const necessidadeExists = await necessidadeRepository.find({ where: { descricaoNecessidade } });
    
        if (necessidadeExists.length != 0 && (necessidadeExists.length != 1 || necessidadeExists[0].id != id)) {
            return response.send({ error: "Já existe uma necessidade com essa descrição" });
        }
    
        const user = await userRepository.findOne({ where: { id: userNecessidade } });
    
        if (user == undefined) return response.send({
            error: "Não existe user com esse id"
        });
        
        const updateNecessidade = request.body;
        updateNecessidade.userNecessidade = user;
        await necessidadeRepository.update(id, updateNecessidade);
        const necessidade = await necessidadeRepository.findOne({ where: { id } });
    
        return response.send({ message: necessidade });
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const necessidadeRepository = getRepository(Necessidade);
        let necessidadeToRemove = await necessidadeRepository.findOne(request.params.id);
        await necessidadeRepository.remove(necessidadeToRemove);
        return response.send({ mes: 'foi' });
    }
    
    async removeAll(request: Request, response: Response, next: NextFunction) {
        const necessidadeRepository = getRepository(Necessidade);
        let necessidadeToRemove = await necessidadeRepository.find();
        await necessidadeRepository.remove(necessidadeToRemove);
        return response.send({ mes: 'foi' });
    }
}

export default new NecessidadeController
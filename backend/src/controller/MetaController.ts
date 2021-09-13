import { getRepository, Repository } from "typeorm";
import { NextFunction, Request, Response } from "express";

import { Category } from "../entity/Category";
import { User } from "../entity/User";
import { Meta } from "../entity/Meta";

class MetaController {       

    async all(request: Request, response: Response, next: NextFunction) {        
        const metasRepository = getRepository(Meta);
        const metas = await metasRepository.find();
        
        return response.send({ metas });
    }
    
    async showRelations(request: Request, response: Response, next: NextFunction) {        
        const metaRepository = getRepository(Meta);

        const metas = await metaRepository.createQueryBuilder("meta")
            .leftJoinAndSelect("meta.userMeta", "user")
            .getMany();

        return response.send({ metas });
    }
    
    async save(request: Request, response: Response, next: NextFunction) {                        
        const metaRepository = getRepository(Meta);  
        const userRepository = getRepository(User);

        const {descMeta, saldoAtualMeta, saldoMeta, despesasAtualMeta, previsao, realizacaoMeta, userMeta} = request.body

        if(descMeta == '') return response.send({error: "nome em branco!"})        
        if (saldoAtualMeta == undefined) return response.send({ error: "Saldo atual da meta não inserido" });
        if (saldoMeta == undefined) return response.send({ error: "saldo da meta não inserido!" });
        if (despesasAtualMeta == undefined) return response.send({ error: "despesas atual da meta não inserido!" });
        if (previsao == undefined) return response.send({ error: "previsão não inserido!" });
        if (realizacaoMeta == undefined) return response.send({ error: "realização da meta não inserido!" });
        if (userMeta == undefined) return response.send({ error: "user da meta não inserido!" });

        const userExists = await userRepository.find({where: {id: userMeta}})        

        if (userExists.length == 0) return response.send({
            error: "Não existe esse user aí"
        });
        
        const newMeta = request.body;
        newMeta.userMeta = userExists[0];
        newMeta.previsao = new Date(newMeta.previsao);
        const meta = metaRepository.create(newMeta);
        await metaRepository.save(meta);

        return response.send({ message: meta });
    }
    
    async one(request: Request, response: Response, next: NextFunction) {
        const metaRepository = getRepository(Meta);

        const categories = await metaRepository.createQueryBuilder("meta")
            .leftJoinAndSelect("meta.userMeta", "user")
            .where("meta.id = :id", { id: request.params.id })
            .getMany();

        return response.send({ categories });
    }   
    
    async edit(request: Request, response: Response, next: NextFunction) {
        const metaRepository = getRepository(Meta);  
        const userRepository = getRepository(User);

        const { descMeta, saldoAtualMeta, saldoMeta, despesasAtualMeta, previsao, realizacaoMeta, userMeta } = request.body;
        const id = parseInt(request.params.id);

        if (descMeta == '') return response.send({ error: "nome em branco!" });
        if (saldoAtualMeta == undefined) return response.send({ error: "Saldo atual da meta não inserido" });
        if (saldoMeta == undefined) return response.send({ error: "saldo da meta não inserido!" });
        if (despesasAtualMeta == undefined) return response.send({ error: "despesas atual da meta não inserido!" });
        if (previsao == undefined) return response.send({ error: "previsão não inserido!" });
        if (realizacaoMeta == undefined) return response.send({ error: "realização da meta não inserido!" });
        if (userMeta == undefined) return response.send({ error: "user da meta não inserido!" });

        const userExists = await userRepository.find({
            where: { id: userMeta }
        });

        if (userExists.length == 0) return response.send({
            error: "Não existe esse user aí"
        });
        
        const updateMeta = request.body;
        updateMeta.userMeta = userExists[0];
        updateMeta.previsao = new Date(updateMeta.previsao);
        await metaRepository.update(id, updateMeta);
        const meta = await metaRepository.findOne({where: {id}});

        return response.send({message: meta})
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const metaRepository = getRepository(Meta);
        let metaToRemove = await metaRepository.findOne(request.params.id);
        await metaRepository.remove(metaToRemove);
        return response.send({ mes: 'foi' });
    }
    
    async removeAll(request: Request, response: Response, next: NextFunction) {
        const metaRepository = getRepository(Meta);
        let metaToRemove = await metaRepository.find();
        await metaRepository.remove(metaToRemove);
        
        return response.send({ mes: 'foi' });
    }
}

export default new MetaController;
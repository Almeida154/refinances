import { getRepository, Repository } from "typeorm";
import { NextFunction, Request, Response } from "express";

import { CategoryConta } from "../entity/CategoryConta";
import { User } from "../entity/User";
import { Conta } from "../entity/Conta";

class ContaController {       

    async all(request: Request, response: Response, next: NextFunction) {        
        const contaRepository = getRepository(Conta);
        const conta = await contaRepository.find();
        
        return response.send({ conta });
    }
    
    async showRelations(request: Request, response: Response, next: NextFunction) {        
        const contaRepository = getRepository(Conta);

        const contas = await contaRepository.createQueryBuilder("conta")
            .leftJoinAndSelect("conta.userConta", "user")
            .getMany();

        const contasCategoryConta = await contaRepository.createQueryBuilder("conta")
            .leftJoinAndSelect("conta.categoryConta", "user")
            .getMany();

        contas.map((item, index) => {
            contas[index].categoryConta = contasCategoryConta[index].categoryConta
        });

        return response.send({ contas });
    }
    
    async save(request: Request, response: Response, next: NextFunction) {                        
        const contaRepository = getRepository(Conta);  
        const userRepository = getRepository(User);
        const categoryContaRepository = getRepository(CategoryConta);

        const { descricao, saldoConta, categoryConta, userConta } = request.body;

        if (descricao == '') return response.send({ error: "descrição em branco!" });
        if (saldoConta == undefined) return response.send({ error: "saldo em branco!" });
        if (categoryConta == '') return response.send({ error: "Sem categoria" });
        if (userConta == '') return response.send({ error: "user em branco!" });

        const contaExists = await contaRepository.find({
            where: { descricao, userConta }
        });
        
        if (contaExists.length > 0) return response.send({
            error: "Já existe uma conta com essa descrição"
        });

        const newUser = await userRepository.findOne({
            where: { id: userConta }
        });

        if (newUser == undefined) return response.send({
            error: "Esse user não existe"
        });

        const newCategoryConta = await categoryContaRepository.findOne({where: {id: categoryConta}})
        
        if (newCategoryConta == undefined) return response.send({
            error: "Essa categoria de conta não existe"
        });

        const newConta = request.body;
        newConta.userConta = newUser;
        newConta.categoryConta = newCategoryConta;
        const conta = contaRepository.create(newConta);

        await contaRepository.save(conta);

        return response.send({ message: conta });
    }
    async one(request: Request, response: Response, next: NextFunction) {
        const contaRepository = getRepository(Conta);
        
        const contas = await contaRepository.createQueryBuilder("conta")
            .leftJoinAndSelect("conta.userConta", "user")
            .where("conta.id = :id", { id: request.params.id })
            .getMany();
        
        return response.send({ contas });
    }   

    async FindByUser(request: Request, response: Response, next: NextFunction) {
        const contaRepository = getRepository(Conta);
        const userRepository = getRepository(User);

        const user = await userRepository.findOne({
            where: {
                id: request.params.iduser
            }
        })

        if(!user) {
            return response.send({error: "usuário não encontrado"})
        }

        const contas = (await contaRepository.find({
            where: { userConta: user }
        }));        

        return response.send({ contas });
    }   

    async edit(request: Request, response: Response, next: NextFunction) {
        const contaRepository = getRepository(Conta);  
        const userRepository = getRepository(User);
        const categoryContaRepository = getRepository(CategoryConta);

        const id = parseInt(request.params.id);

        const { descricao, saldoConta, categoryConta, userConta } = request.body;

        if (descricao == '') return response.send({ error: "descrição em branco!" });
        if (saldoConta == '') return response.send({ error: "saldo em branco!" });
        if (categoryConta == '') return response.send({ error: "Sem categoria" });
        if (userConta == '') return response.send({ error: "user em branco!" });

        const contaExists = await contaRepository.find({
            where: { descricao }
        });
        
        if (contaExists.length > 1 || (contaExists.length == 1 && contaExists[0].id != (id))) {
            return response.send({ error: "Já existe uma conta com essa descrição" });
        }

        const newUser = await userRepository.findOne({
            where: { id: userConta }
        });

        if (newUser == undefined) return response.send({
            error: "Esse user não existe"
        });

        const newCategoryConta = await categoryContaRepository.findOne({
            where: { id: categoryConta }
        });
        
        if (newCategoryConta == undefined) {
            return response.send({error: "Essa categoria de conta não existe"})
        }

        const newConta = request.body;
        newConta.userConta = newUser;
        newConta.categoryConta = newCategoryConta;
  
        await contaRepository.update(id, newConta);
        
        const conta = await contaRepository.findOne({
            where: { id }
        });

        return response.send({ message: conta });
    }
    
    
    async remove(request: Request, response: Response, next: NextFunction) {
        const contaRepository = getRepository(Conta);
        let contaToRemove = await contaRepository.findOne(request.params.id);
        await contaRepository.remove(contaToRemove);
        return response.send({ mes: 'foi' });
    }
    
    async removeAll(request: Request, response: Response, next: NextFunction) {
        const contaRepository = getRepository(Conta);
        let contaToRemove = await contaRepository.find();
        await contaRepository.remove(contaToRemove);

        return response.send({ mes: 'foi' });
    }
}

export default new ContaController;